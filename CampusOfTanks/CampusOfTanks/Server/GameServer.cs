using CampusofTanks.Server.Communication;
using System.Net.WebSockets;

namespace CampusofTanks.Server
{
    public class GameServer
    {
        private GameSocketCollection connectedPlayers = new GameSocketCollection();


        public void AcceptClient(WebSocket websocket)
        {
            //connectedPlayers
        }

    }
}
