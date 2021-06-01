using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace PWD.Schedule.Controllers
{
    public abstract class ScheduleControllerBase: AbpController
    {
        protected ScheduleControllerBase()
        {
            LocalizationSourceName = ScheduleConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
