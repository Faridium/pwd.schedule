using System.Threading.Tasks;
using Abp.Application.Services;
using PWD.Schedule.Sessions.Dto;

namespace PWD.Schedule.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
