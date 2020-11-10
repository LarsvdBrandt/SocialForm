using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SocialformAPI.Models;
using PostService.Models;

namespace SocialformAPI.Data
{
    public class SFContext : DbContext
    {
        public SFContext(DbContextOptions<SFContext> options)
    : base(options)
        {
        }

        public DbSet<SFPost> SFPosts { get; set; }
        public DbSet<SFComments> SFComments { get; set; }
        public DbSet<SFLikes> SFLikes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<SFPost>().ToTable("SFPost");
            modelBuilder.Entity<SFComments>().ToTable("SFComments");
            modelBuilder.Entity<SFLikes>().ToTable("SFLikes");
        }

    }
}
