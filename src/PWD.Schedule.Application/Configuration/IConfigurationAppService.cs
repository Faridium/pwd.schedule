using System.Threading.Tasks;
using PWD.Schedule.Configuration.Dto;

namespace PWD.Schedule.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
