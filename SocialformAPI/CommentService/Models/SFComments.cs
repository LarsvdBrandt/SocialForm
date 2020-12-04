using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CommentService.Models
{
    public class SFComments
    {
        [Key]
        public long CommentId { get; set; }
        public long PostId { get; set; }
        public long UserId { get; set; }
        public string Comment { get; set; }
    }
}
