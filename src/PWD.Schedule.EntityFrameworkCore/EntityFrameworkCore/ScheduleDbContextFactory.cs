using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using PWD.Schedule.Configuration;
using PWD.Schedule.Web;

namespace PWD.Schedule.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class ScheduleDbContextFactory : IDesignTimeDbContextFactory<ScheduleDbContext>
    {
        public ScheduleDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<ScheduleDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            ScheduleDbContextConfigurer.Configure(builder, configuration.GetConnectionString(ScheduleConsts.ConnectionStringName));

            return new ScheduleDbContext(builder.Options);
        }
    }
}
