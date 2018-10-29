namespace CampusofTanks.Server.Communication
{
    public static class GamePacketFactory
    {

        public static T Construct<T>(string packet)
        {
            return default(T);
        }
    }
}
