namespace CampusofTanks.Server.Communication.Interfaces
{
    internal interface IReceivablePacket
    {
        void Receive(byte[] data);
    }
}
