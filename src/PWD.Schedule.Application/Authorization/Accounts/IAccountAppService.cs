using System.Threading.Tasks;
using Abp.Application.Services;
using PWD.Schedule.Authorization.Accounts.Dto;

namespace PWD.Schedule.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
