using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using StraviaTECAPISQLS.Models;
using System.Data;

namespace StraviaTECAPISQLS.Controllers
{
    [Route("api/org")]
    [ApiController]
    public class OrgController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public OrgController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("login")]
        public string PostLogin(Login user)
        {
            string query = @"
                EXEC sp_OrganizerLogin @email, @password
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StraviaTEC");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@email", user.Email);
                    myCommand.Parameters.AddWithValue("@password", user.Password);

                    int isValid = (int)myCommand.ExecuteScalar();

                    if (isValid == 1)
                    {
                        return "Sesion Iniciada";
                    }
                    else
                    {
                        return "Credenciales invalidas";
                    }
                }
            }

        }
    }
}
