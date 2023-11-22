using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using StraviaTECAPISQLS.Models;
using System.Data;
using System.Xml.Linq;

namespace StraviaTECAPISQLS.Controllers
{
    [Route("api/race")]
    [ApiController]
    public class RaceController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RaceController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("allinfo")]
        public JsonResult GetRaceInfo()
        {
            string query = @"
        EXEC sp_GetRacesInfo
    ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StraviaTEC");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            // Transformar la tabla en una lista de objetos anónimos
            var racesInfo = table.AsEnumerable()
                .Select(row => new
                {
                    raceID = row.Field<int>("RaceID"),
                    raceName = row.Field<string>("raceName"),
                    price = row.Field<decimal>("Price"),
                    date = ((DateTime)row["date"]).ToString("yyyy-MM-dd"),
                    route = row.Field<string>("route"),
                    privacy = row.Field<int>("Privacy"),
                    sponsors = row.Field<string>("Sponsors").Split(", "),
                    categories = row.Field<string>("Categories").Split(", "),
                    bankAccounts = row.Field<string>("BankAccounts").Split(", ")
                        .Select(account => Convert.ToInt32(account))
                        .ToList(),
                    sportName = row.Field<string>("SportName"),
                    groups = row.Field<string>("Groups").Split(", ")
                })
                .ToList();

            return new JsonResult(racesInfo);
        }

        [HttpPost]
        [Route("new")]
        public async Task<JsonResult> Post(Race user)
        {
            string query = @"
                 EXEC sp_NewRace @Cname, @Price, @Date, @Route, @Pid, @Patrocinadores, @Categorias, @Cuentas, @SportName, @Grupos
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StraviaTEC");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Cname", user.RaceName);
                    myCommand.Parameters.AddWithValue("@Price", user.Price);
                    DateOnly startDate = DateOnly.Parse(user.Date);
                    myCommand.Parameters.AddWithValue("@Date", startDate);
                    if (user.Route != null)
                    {
                        string receivedXmlString = user.Route;
                        XElement receivedXmlData = XElement.Parse(receivedXmlString);
                        myCommand.Parameters.AddWithValue("@Route", receivedXmlData.ToString());
                    }
                    else
                    {
                        myCommand.Parameters.AddWithValue("@Route", DBNull.Value);
                    }
                    myCommand.Parameters.AddWithValue("@Pid", user.Privacy);
                    myCommand.Parameters.AddWithValue("@SportName", user.SportName);
                    string categoriesString = string.Join(",", user.Categories);
                    myCommand.Parameters.AddWithValue("@Categorias", categoriesString);
                    string accsString = string.Join(",", user.BankAccounts);
                    myCommand.Parameters.AddWithValue("@Cuentas", accsString);
                    string patrocinadoresString = string.Join(",", user.Sponsors);
                    myCommand.Parameters.AddWithValue("@Patrocinadores", patrocinadoresString);
                    string gruposString = string.Join(",", user.Groups);
                    myCommand.Parameters.AddWithValue("@Grupos", gruposString);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Carrera añadida");
        }
    }
}
