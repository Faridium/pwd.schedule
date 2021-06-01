using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace PWD.Schedule.EntityFrameworkCore
{
    public static class ScheduleDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<ScheduleDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<ScheduleDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
