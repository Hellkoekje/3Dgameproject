using System;

namespace CampusofTanks.Server.Communication
{
    public class GamePacket
    {
        private byte[] buffer;
        public byte[] Buffer
        {
            get
            {
                return buffer;
            }

            protected set
            {
                buffer = value;
            }
        }

        public GamePacket()
        {
           // Console.WriteLine("I've received something");
        }
    }
}
