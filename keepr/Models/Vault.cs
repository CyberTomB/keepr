using System;
using System.ComponentModel.DataAnnotations;

namespace keepr.Models
{
    public class Vault
    {
        public int Id {get; set;}
        public DateTime CreatedAt {get; set;}
        public DateTime UpdatedAt {get; set;}
        [Required]
        public string Name {get; set;}
        public string Description {get; set;}
        public bool IsPrivate {get; set;} = false;
        public string CreatorId {get; set;}
        public Profile Creator { get; set;}
    }
}