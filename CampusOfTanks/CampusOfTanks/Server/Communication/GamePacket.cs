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
        }

        public GamePacket(string message)
        {
            //Encode and copy the bytes 
            buffer =  Encoding.UTF8.GetBytes(message);
        }
    }
}
