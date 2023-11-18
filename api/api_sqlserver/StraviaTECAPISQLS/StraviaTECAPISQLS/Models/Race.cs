namespace StraviaTECAPISQLS.Models
{
    public class Race
    {
        public string RaceName { get; set; }
        public decimal Price { get; set; }
        public string Date { get; set; }
        public string Route { get; set; }
        public int Privacy { get; set; }
        public List<string> Sponsors { get; set; }
        public List<string> Categories { get; set; }
        public List<int> BankAccounts { get; set; }
        public string SportName { get; set; }
        public List<string> Groups { get; set; }
    }
}
