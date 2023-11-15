using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using StraviaTECAPISQLS.Models;
using System.Data;

namespace StraviaTECAPISQLS.Controllers
{
    [Route("api/athlete")]
    [ApiController]
    public class AthleteController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public AthleteController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                EXEC sp_GetAthletes
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

            return new JsonResult(table);
        }

        [HttpPost]
        [Route("signup")]
        public async Task<JsonResult> Post([FromForm]Athlete user)
        {
            string query = @"
                 EXEC sp_NewAthlete @Aemail, @Apassword, @Fname, @Mname, @Lname1, @Lname2, @Photo, @CountryName, @Birth_date
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StraviaTEC");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Aemail", user.Aemail);
                    myCommand.Parameters.AddWithValue("@Apassword", user.Apassword);
                    myCommand.Parameters.AddWithValue("@Fname", user.Fname);
                    myCommand.Parameters.AddWithValue("@Mname", user.Mname ?? (object)DBNull.Value);
                    myCommand.Parameters.AddWithValue("@Lname1", user.Lname1);
                    myCommand.Parameters.AddWithValue("@Lname2", user.Lname2);
                    if (user.Photo != null)
                    {
                        using (MemoryStream ms = new MemoryStream())
                        {
                            await user.Photo.CopyToAsync(ms);
                            myCommand.Parameters.AddWithValue("@Photo", ms.ToArray());
                        }
                    }
                    else
                    {
                        myCommand.Parameters.AddWithValue("@Photo", DBNull.Value);
                    }
                    myCommand.Parameters.AddWithValue("@CountryName", user.CountryName);
                    DateOnly birthDate = DateOnly.Parse(user.Birth_date);
                    myCommand.Parameters.AddWithValue("@Birth_date", birthDate);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Atleta añadido");
        }
    }
}
