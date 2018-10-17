using CampusofTanks.Server.Communication;
using System.Net.WebSockets;
using System.Threading;

namespace CampusofTanks.Server
{
    public class GameServer
    {
        private Thread serverMainThread;
        
        private GameSocketCollection connectedPlayers = new GameSocketCollection();

        private int tickRate = 20;
        private ulong ticks = 0;

        public GameServer(int tickRate = 30)
        {
            this.tickRate = tickRate;

            serverMainThread = new Thread(() =>
            {
                ++ticks;

                Tick();

                Thread.Sleep(1000 / this.tickRate);

            });

            serverMainThread.Start();
        }

        private void Tick()
        {
        }

        public GameSocket AcceptClient(WebSocket websocket)
        {
            GameSocket socket = new GameSocket(websocket);

            lock (connectedPlayers)
            {
                connectedPlayers.Add(socket);
            }

            //socket.BeginReceiving();

            return socket;
        }



    }
}
