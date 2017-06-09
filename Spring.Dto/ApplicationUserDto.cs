namespace Spring.Dto
{
    /// <summary>
    /// Class required to create a new user.
    /// </summary>
    public class ApplicationUserDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
