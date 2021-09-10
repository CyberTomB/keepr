using System;
using System.ComponentModel.DataAnnotations;

namespace keepr.Models
{
    public class Keep
    {
        public int Id {get; set;}
        public DateTime CreatedAt {get; set;}
        public DateTime UpdatedAt {get; set;}
        [Required]
        public string Name {get; set;}
        public string Description {get; set;}
        public string ImgUrl {get; set;}
        public int Views {get; set;}
        public int Shares {get; set;}
        public int Keeps {get; set;}
        [Required]
        public string CreatorId {get; set;}
        public Profile Creator { get; set;}

    }
}