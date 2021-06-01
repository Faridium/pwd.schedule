using System.Threading.Tasks;
using PWD.Schedule.Models.TokenAuth;
using PWD.Schedule.Web.Controllers;
using Shouldly;
using Xunit;

namespace PWD.Schedule.Web.Tests.Controllers
{
    public class HomeController_Tests: ScheduleWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}