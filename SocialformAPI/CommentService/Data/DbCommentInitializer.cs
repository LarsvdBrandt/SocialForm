using CommentService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommentService.Data
{
    public static class DbCommentInitializer
    {
        public static void Initialize(SFCommentContext context)
        {
            context.Database.EnsureCreated();
            
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
