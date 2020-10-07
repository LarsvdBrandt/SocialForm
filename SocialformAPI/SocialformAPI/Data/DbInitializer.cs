using SocialformAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialformAPI.Data
{
    public static class DbInitializer
    {
        public static void Initialize(SFContext context)
        {
            context.Database.EnsureCreated();
            if (context.SFPosts.Any())
            {
                return;
            }

            var sfPosts = new SFPost[]
            {
                new SFPost
                {
                    Title="title 1",
                    ImgSrc="Img 1",
                    Comment="Comment 1",
                },
                new SFPost
                {
                    Title="title 2",
                    ImgSrc="Img 2",
                    Comment="Comment 2",
                },
                new SFPost
                {
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
