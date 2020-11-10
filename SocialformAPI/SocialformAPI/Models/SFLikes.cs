using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PostService.Models
{
    public class SFLikes
    {
        [Key]
        public long LikeId { get; set; }
        public long PostId { get; set; }
        public long UserId { get; set; }
        public bool Like { get; set; }
    }
}
