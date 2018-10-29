using CampusofTanks.Server.Communication;
using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

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
                while (true)
                {
                    ++ticks;
                    Tick();
                    Thread.Sleep(1000 / this.tickRate);
                }

            });

            serverMainThread.Start();
        }

        private void Tick()
        {
            for (int i = 0; i < connectedPlayers.Count; i++)
            {
                GameSocket sock = connectedPlayers[i];

                if (sock != null)
                {
                    //GamePacket packet = new GamePacket();
                    //packet.SetString("HELLO THERE CLIENT!");

                    //Task send = new Task(async () =>
                    //{
                    //    await sock.Send(packet);
                    //});

                    //send.Start();
                }
            }
        }

        public GameSocket AcceptClient(WebSocket websocket)
        {
            GameSocket socket = new GameSocket(websocket);

            lock (connectedPlayers)
            {
                connectedPlayers.Add(socket);
            }

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("A challenger #" + connectedPlayers.Count + " arrived!");
            Console.ForegroundColor = ConsoleColor.White;

            return socket;
        }



    }
}
