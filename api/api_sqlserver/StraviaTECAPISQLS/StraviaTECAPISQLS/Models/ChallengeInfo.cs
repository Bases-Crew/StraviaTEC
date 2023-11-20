namespace StraviaTECAPISQLS.Models
{
    public class ChallengeInfo
    {
        public int ChallengeID { get; set; }
        public string Cname { get; set; } = null!;
        public string Ctype { get; set; } = null!;
        public int Mileage { get; set; }
        public DateTime StartDate { get; set; } 
        public DateTime FinalDate { get; set; } 
        public int Pid { get; set; }
        public List<string> Patrocinadores { get; set; }
        public List<string> Grupos { get; set; }
        public string SportName { get; set; } = null!;
    }
}
