using CampusofTanks.Server;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Net.WebSockets;
using System.Threading.Tasks;

namespace CampusofTanks
{
    public class Startup
    {
        public static GameServer server = new GameServer();

        public void ConfigureServices(IServiceCollection services) { }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        { 
            //NOTE: Use default, so we don't have to redirect to "/index.html."
            app.UseDefaultFiles();
            
          

            var provider = new FileExtensionContentTypeProvider();
            provider.Mappings[".mtl"] = "text/plain";
            provider.Mappings[".obj"] = "text/plain";

            app.UseStaticFiles(new StaticFileOptions
            {
                ContentTypeProvider = provider
            });

            WebSocketOptions options = new WebSocketOptions
            {
                
            };
            app.UseWebSockets();
            app.Use(HandleRequests);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
        }

        private async Task HandleRequests(HttpContext context, Func<Task> next)
        {
            if (context.Request.Path == "/connect_client")
            {
                if (context.WebSockets.IsWebSocketRequest)
                {
                    WebSocket socket = await context.WebSockets.AcceptWebSocketAsync();

                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine("A new client connected! :o");
                    Console.ForegroundColor = ConsoleColor.White;

                    // await networkView.Receive();
                }
                else
                {
                    context.Response.StatusCode = 400;
                }
            }
            else
            {
                await next();
            }
        }


    }
}
