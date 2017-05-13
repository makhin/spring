using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Spring.Services;

namespace Spring.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CustomersController : Controller
    {
        private readonly ICustomerService _service;

        public CustomersController(ICustomerService service)
        {
            _service = service;
        }

        [HttpGet("{contractid:int}")]
        public async Task<IActionResult> GetByContractId(int contractid)
        {
            var value = await _service.GetByContractId(contractid);
            if (value == null)
            {
                return NoContent();
            }

            return Ok(value);
        }
    }
}
