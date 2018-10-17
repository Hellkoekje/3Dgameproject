using System;
using System.Net.WebSockets;
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

        public GameSocket(WebSocket socket)
        {
            this.socket = socket;
        }

        /// <summary>
        ///     Receive data from the client.
        /// </summary>
        /// <returns>A GamePacket from the clients.</returns>
        public async Task<GamePacket> Receive()
        {
            byte[] buffer = new byte[4096];

            WebSocketReceiveResult result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

            while (!result.CloseStatus.HasValue)
            {
                result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                return new GamePacket("houston, we have a received message!");
            }

            await socket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
            return new GamePacket("houston, we have no message!.");
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
