﻿using Microsoft.OpenApi.Models;

namespace AureliaCrud.Web
{
    internal class Info : OpenApiInfo
    {
        public string Title { get; set; }
        public string Version { get; set; }
    }
}