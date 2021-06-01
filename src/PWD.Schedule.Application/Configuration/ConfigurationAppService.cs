using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using PWD.Schedule.Configuration.Dto;

namespace PWD.Schedule.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : ScheduleAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
