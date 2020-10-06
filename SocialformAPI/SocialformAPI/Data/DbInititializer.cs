using SocialformAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialformAPI.Data
{
    public static class DbInititializer
    {
        public static void Initialize(SFContext context)
        {
            context.Database.EnsureCreated();

            var sfPosts = new SFPost[]
            {
                new SFPost
                {
                    Id=1,
                    Title="title 1",
                    ImgSrc="Img 1",
                    Comment="Comment 1",
                },
                new SFPost
                {
                    Id=2,
                    Title="title 2",
                    ImgSrc="Img 2",
                    Comment="Comment 2",
                },
                new SFPost
                {
                    Id=3,
                    Title="title 3",
                    ImgSrc="Img 3",
                    Comment="Comment 3",
                },
            };
            foreach (SFPost sfPost in sfPosts)
            {
                context.SFPosts.Add(sfPost);
            }
            context.SaveChanges();
        }

    }
}
