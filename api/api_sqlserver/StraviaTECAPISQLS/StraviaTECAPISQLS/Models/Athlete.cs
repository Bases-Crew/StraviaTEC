namespace StraviaTECAPISQLS.Models
{
    public class Athlete
    {
        public string Aemail { get; set; } = null!;
        public string Apassword { get; set; } = null!;
        public string Fname { get; set; } = null!;
        public string? Mname { get; set; }
        public string Lname1 { get; set; } = null!;
        public string Lname2 { get; set; } = null!;
        public string? Photo { get; set; }
        public string CountryName { get; set; } = null!;
        public DateOnly Birth_date { get; set; }
    }
}
