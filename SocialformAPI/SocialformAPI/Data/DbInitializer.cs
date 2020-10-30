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
                    Title="Gerwin Lips",
                    ImgSrc="test1.jpg",
                    Comment="Mooie natuurfoto met waterval",
                },
                new SFPost
                {
                    Title="Joost Bogie",
                    ImgSrc="test2.jpg",
                    Comment="Vandaag een nieuwe gameboy gekocht",
                },
                new SFPost
                {
                    Title="Ken Petit",
                    ImgSrc="test3.jpg",
                    Comment="Mario eindelijk gekocht, van plan om hem meteen uit te spelen",
                },
                new SFPost
                {
                    Title="Vincent Stolwijk",
                    ImgSrc="test4.jpg",
                    Comment="Wie zou de verkiezing gaan winnen?",
                },
            };
            foreach (SFPost sfPost in sfPosts)
            {
                context.SFPosts.Add(sfPost);
            }
            context.SaveChanges();

            if (context.SFComments.Any())
            {
                return;
            }

            var sfCommentss = new SFComments[]
            {
                new SFComments
                {
                    PostId=1,
                    UserId=1,
                    Comment="Mooi man",
                },
                new SFComments
                {
                    PostId=1,
                    UserId=2,
                    Comment="Super mooi !",
                },
                new SFComments
                {
                    PostId=1,
                    UserId=4,
                    Comment="Daar zou ik ook wel eens willen zijn.",
                },
            };
            foreach (SFComments sfComments in sfCommentss)
            {
                context.SFComments.Add(sfComments);
            }
            context.SaveChanges();
        }

    }
}
