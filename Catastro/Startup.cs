using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(GFK.Startup))]
namespace GFK
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
