
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace CampusofTanks
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args)
                .Run();
        }

        public static IWebHost BuildWebHost(string[] args)
        {
            return new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .ConfigureLogging((hostingContext, logging) => { })
                .UseStartup<Startup>()
                .Build();


        }
    }
}
