using System;
using System.Collections.Generic;

namespace CampusofTanks.Server.Communication
{
    public class GameSocketCollection : List<GameSocket>
    {
        const int MAX_PLAYERS = 32;

        /// <summary>
        ///     Constructor with default amount of slots.
        /// </summary>
        public GameSocketCollection()
        {
            Capacity = MAX_PLAYERS;
        }

        /// <summary>
        ///     Constructor with the max amount of players.
        ///     Minimum is always MAX_PLAYERS (32).
        /// </summary>
        /// <param name="maxPlayers">How many players are allowed to join this server.</param>
        public GameSocketCollection(int maxPlayers)
        {
            Capacity = Math.Max(MAX_PLAYERS, maxPlayers);
        }

    }
}
