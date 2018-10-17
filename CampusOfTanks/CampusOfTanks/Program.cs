
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
            // <rant>
            //  Build a custom webhost, to make it shut the fuck up
            //  about files being transfered, why do you even do this ASP/Microshit?
            //  Who the hell cares about files being transfered, UNLESS you have some issue with it...
            //  Why is it on by default in the DefaultWebHost!?
            // </rant>
            return new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .ConfigureLogging((hostingContext, logging) => { })
                .UseStartup<Startup>()
                .Build();


        }
    }
}
