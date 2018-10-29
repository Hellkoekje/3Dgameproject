namespace CampusofTanks.Server.Communication
{
    public struct GamePacketHeader
    {
        public string type;

        public GamePacketHeader(string type)
        {
            this.type = type; 
        }
    }

    public class GamePacketPayload
    {
        public string payload;

        public GamePacketPayload(string payload)
        {
            this.payload = payload;
        }
    }

    public class GamePacket
    {
        public GamePacketHeader Header;
        public GamePacketPayload Payload;

        public GamePacket()
        {

        }

        //public byte[] Get()
        //{

        //}
    }
}
