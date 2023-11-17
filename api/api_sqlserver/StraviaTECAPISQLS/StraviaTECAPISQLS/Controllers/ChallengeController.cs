using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using StraviaTECAPISQLS.Models;
using System.Data;

namespace StraviaTECAPISQLS.Controllers
{
    [Route("api/challenge")]
    [ApiController]
    public class ChallengeController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ChallengeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("all")]
        public JsonResult Get()
        {
            string query = @"
                EXEC sp_GetChallenges
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

        [HttpGet]
        [Route("available")]
        public JsonResult GetNotExpired()
        {
            string query = @"
                EXEC sp_GetNotExpiredChallenges
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

        [HttpGet]
        [Route("athlete/unaccepted")]
        public JsonResult GetUnacceptedChallenges(string aemail)
        {
            string query = @"
                EXEC sp_GetUnsubscribedChallenges @Aemail
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StraviaTEC");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Aemail", aemail);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet]
        [Route("athlete/info")]
        public JsonResult GetCompletion(string aemail)
        {
            string query = @"
                EXEC sp_GetAthleteChallengeInfo @Aemail
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StraviaTEC");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Aemail", aemail);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        [Route("new")]
        public async Task<JsonResult> Post(Challenge user)
        {
            string query = @"
                 EXEC sp_NewChallenge @Cname, @Ctype, @StartDate, @FinalDate, @Pid, @SportName, @Mileage
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StraviaTEC");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Cname", user.Cname);
                    myCommand.Parameters.AddWithValue("@Ctype", user.Ctype);
                    DateOnly startDate = DateOnly.Parse(user.StartDate);
                    myCommand.Parameters.AddWithValue("@StartDate", startDate);
                    DateOnly finalDate = DateOnly.Parse(user.FinalDate);
                    myCommand.Parameters.AddWithValue("@FinalDate", finalDate);
                    myCommand.Parameters.AddWithValue("@Pid", user.Pid);
                    myCommand.Parameters.AddWithValue("@SportName", user.SportName);
                    myCommand.Parameters.AddWithValue("@Mileage", user.Mileage);   
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Reto añadido");
        }

        [HttpPost]
        [Route("join")]
        public string PostLogin(Athlete_challenge user)
        {
            string query = @"
                EXEC sp_AcceptChallenge @aemail, @challenge_id
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StraviaTEC");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@aemail", user.aemail);
                    myCommand.Parameters.AddWithValue("@challenge_id", user.challenge_id);

                    int joined = (int)myCommand.ExecuteScalar();

                    if (joined == 1)
                    {
                        return "Reto aceptado!";
                    }
                    else
                    {
                        return "Atleta ya habia aceptado el reto";
                    }
                }
            }

        }

    }
}
