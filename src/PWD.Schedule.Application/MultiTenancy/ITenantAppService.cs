using Abp.Application.Services;
using PWD.Schedule.MultiTenancy.Dto;

namespace PWD.Schedule.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

