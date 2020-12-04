using System;
using System.Collections.Generic;
using PostService.Data;
using PostService.Models;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace PostServiceTests
{
    public static class Utilities
    {
        public static void InitializeDbForTests(SFPostContext db)
        {
            db.SFPosts.AddRange(GetSeedingMessages());

            db.SaveChanges();
        }

        public static void ReinitializeDbForTests(SFPostContext db)
        {
            db.SFPosts.RemoveRange(db.SFPosts);
            InitializeDbForTests(db);
        }
        public static List<SFPost> GetSeedingMessages()
        {
            return new List<SFPost>()
            {
             new SFPost(){id = 1, Title = "Title1", ImgSrc="Test1.jpg", Comment = "Comment1"},
             new SFPost(){id = 2, Title = "Title2", ImgSrc="Test2.jpg", Comment = "Comment2"},
             new SFPost(){id = 3, Title = "Title3", ImgSrc="Test3.jpg", Comment = "Comment3"}
            };
        }
    }
}
