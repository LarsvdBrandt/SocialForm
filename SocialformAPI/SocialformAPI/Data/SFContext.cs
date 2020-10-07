using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SocialformAPI.Models;

namespace SocialformAPI.Data
{
    public class SFContext : DbContext
    {
        public SFContext(DbContextOptions<SFContext> options)
    : base(options)
        {
        }

        public DbSet<SFPost> SFPosts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<SFPost>().ToTable("SFPost");
        }
    }
}
