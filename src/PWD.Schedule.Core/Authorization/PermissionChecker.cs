using Abp.Authorization;
using PWD.Schedule.Authorization.Roles;
using PWD.Schedule.Authorization.Users;

namespace PWD.Schedule.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
