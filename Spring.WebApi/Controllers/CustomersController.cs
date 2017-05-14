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

        [HttpGet("{contract}")]
        public async Task<IActionResult> GetByContractId(int id, int page = 1, int pageSize = 10, string globalFilter = null)
        {
            var value = await _service.GetByContractId(id, page, pageSize, globalFilter);
            if (value == null)
            {
                return NoContent();
            }

            return Ok(value);
        }
    }
}
