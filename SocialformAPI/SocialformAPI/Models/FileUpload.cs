﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialformAPI.Models
{
    public class FileUpload
    {
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }

    }
}