
using LikeService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LikeService.Data
{
    public static class DbLikeInitializer
    {
        public static void Initialize(SFLikeContext context)
        {
            context.Database.EnsureCreated();
            if (context.SFLikes.Any())
            {
                return;
            }

            var sfLikess = new SFLikes[]
            {
                new SFLikes
                {
                    PostId=1,
                    UserId=1,
                    Like=true,
                },
                new SFLikes
                {
                    PostId=1,
                    UserId=1,
                    Like=true,
                },                
                new SFLikes
                {
                    PostId=1,
                    UserId=1,
                    Like=true,
                },
            };
            foreach (SFLikes sfLikes in sfLikess)
            {
                context.SFLikes.Add(sfLikes);
            }
            context.SaveChanges();
        }

    }
}
