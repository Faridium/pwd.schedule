using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using PWD.Schedule.Authorization.Roles;
using PWD.Schedule.Authorization.Users;
using PWD.Schedule.MultiTenancy;
using PWD.Schedule.Models;

namespace PWD.Schedule.EntityFrameworkCore
{
    public class ScheduleDbContext : AbpZeroDbContext<Tenant, Role, User, ScheduleDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Chapter> Chapters { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<XTopic> XTopics { get; set; }
        public DbSet<XItem> XItems { get; set; }
        public DbSet<XCategory> XCategories { get; set; }

        public ScheduleDbContext(DbContextOptions<ScheduleDbContext> options)
            : base(options)
        {
        }
    }
}
