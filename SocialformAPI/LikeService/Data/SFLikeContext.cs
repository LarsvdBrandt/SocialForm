using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LikeService.Models;
using Microsoft.EntityFrameworkCore;

namespace LikeService.Data
{
    public class SFLikeContext : DbContext
    {
        public SFLikeContext(DbContextOptions<SFLikeContext> options)
    : base(options)
        {
        }
        public DbSet<SFLikes> SFLikes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<SFLikes>().ToTable("SFLikes");
        }

    }
}
