using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using PWD.Schedule.Configuration;

namespace PWD.Schedule.Web.Host.Startup
{
    [DependsOn(
       typeof(ScheduleWebCoreModule))]
    public class ScheduleWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public ScheduleWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ScheduleWebHostModule).GetAssembly());
        }
    }
}
