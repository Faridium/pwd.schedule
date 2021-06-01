using Abp.Application.Services.Dto;

namespace PWD.Schedule.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

