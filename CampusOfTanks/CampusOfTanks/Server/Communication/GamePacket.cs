using System;
using System.Text;

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

        public void SetString(string message)
        {
            buffer = Encoding.UTF8.GetBytes(message);
        }
    }
}
