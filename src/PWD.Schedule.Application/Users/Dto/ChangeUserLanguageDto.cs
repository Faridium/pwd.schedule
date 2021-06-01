using System.ComponentModel.DataAnnotations;

namespace PWD.Schedule.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}