using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using PWD.Schedule.EntityFrameworkCore;
using PWD.Schedule.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace PWD.Schedule.Web.Tests
{
    [DependsOn(
        typeof(ScheduleWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class ScheduleWebTestModule : AbpModule
    {
        public ScheduleWebTestModule(ScheduleEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ScheduleWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(ScheduleWebMvcModule).Assembly);
        }
    }
}