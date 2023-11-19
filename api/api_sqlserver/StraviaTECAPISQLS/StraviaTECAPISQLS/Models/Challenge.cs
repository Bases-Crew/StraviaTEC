namespace StraviaTECAPISQLS.Models
{
    public class Challenge
    {
        public string Cname { get; set; } = null!;
        public string Ctype { get; set; } = null!;
        public int Mileage { get; set; }
        public string StartDate { get; set; } = null!;
        public string FinalDate { get; set; } = null!;
        public int Pid { get; set; }
        public List<string> Patrocinadores { get; set; }
        public List<string> Grupos { get; set; }
        public string SportName { get; set; } = null!;
        
    }
}
