using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SocialformAPI.Models;

namespace CommentService.Data
{
    public class SFCommentContext : DbContext
    {
        public SFCommentContext(DbContextOptions<SFCommentContext> options)
    : base(options)
        {
        }

        public DbSet<SFComments> SFComments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<SFComments>().ToTable("SFComments");
        }

    }
}
