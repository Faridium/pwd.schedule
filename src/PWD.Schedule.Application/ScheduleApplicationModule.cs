using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using PWD.Schedule.Authorization;

namespace PWD.Schedule
{
    [DependsOn(
        typeof(ScheduleCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class ScheduleApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<ScheduleAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(ScheduleApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
