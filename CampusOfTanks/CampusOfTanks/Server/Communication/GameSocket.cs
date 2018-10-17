using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CampusofTanks.Server.Communication
{
    public class GameSocket
    {
        /// <summary>
        ///     Socket of the client.
        /// </summary>
        private WebSocket socket;
        private Task receiveTask;

        public GameSocket(WebSocket socket)
        {
            this.socket = socket;
        }

        public void BeginReceiving()
        {
            if (receiveTask != null) return;

            receiveTask = new Task(async () =>
            {
                while (true)
                {
                    Console.WriteLine(socket.State);

                    Monitor.Enter(socket);

                    try
                    {
                        byte[] buffer = new byte[4096];
                        WebSocketReceiveResult result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                        while (!result.CloseStatus.HasValue)
                        {
                            result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                            Console.WriteLine(result);
                        }

                        await socket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);

                        //return new GamePacket();
                    }
                    finally
                    {
                        Monitor.Exit(socket);
                    }
                }
            }, TaskCreationOptions.LongRunning);

            receiveTask.Start();
        }

        /// <summary>
        ///     Receive data from the client.
        /// </summary>
        /// <returns>A GamePacket from the clients.</returns>
        public async Task<GamePacket> Receive()
        {
            Monitor.Enter(socket);

            try
            {
                byte[] buffer = new byte[4096];
                WebSocketReceiveResult result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                while (!result.CloseStatus.HasValue)
                {
                    result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                    string resultString = Encoding.UTF8.GetString(buffer).Trim().Remove(' ');

                    if(!string.IsNullOrEmpty(resultString))
                    {
                        Console.WriteLine(resultString);
                    }

                }

                await socket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);

                return new GamePacket();
            }
            finally
            {
                Monitor.Exit(socket);
            }
        }

        /// <summary>
        ///     Send a message to this client.
        /// </summary>
        /// <param name="packet">The message we want to send.</param>
        public async void Send(GamePacket packet)
        {
            ArraySegment<byte> messageSegment = new ArraySegment<byte>(packet.Buffer);

            //NOTE: Do not remove, without, the socket will not be able to send data 
            //      when receiving multiple packets per frame.
            Monitor.Enter(socket);

            try
            {
                try
                {
                    await socket.SendAsync(messageSegment, WebSocketMessageType.Text, true, CancellationToken.None);
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error while sending information to client:" + e.Message);
                }
            }
            finally
            {
                //NOTE: Always assure we tell the socket should be released from the mutex.
                //      i.e. when sending fails we want to assure we don't go into a deadlock.
                Monitor.Exit(socket);
            }
        }


    }
}
