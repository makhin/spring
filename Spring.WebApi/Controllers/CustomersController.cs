using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Spring.Dto;
using Spring.Services;
using Spring.WebApi.Helpers;

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

        [HttpGet("{id}/cases")]
        public async Task<IActionResult> GetByCustomerId(int id)
        {
            var value = await _service.GetInsuranceCasesByCustomerId(id);
            if (value == null)
            {
                return NoContent();
            }

            return Ok(value);
        }

        [HttpGet("{id}/short")]
        public async Task<IActionResult> GetShortDetails(int id)
        {
            var value = await _service.GetShortDetails(id);
            if (value == null)
            {
                return NoContent();
            }

            return Ok(value);
        }

        [HttpGet("{id}/full")]
        public async Task<IActionResult> GetById(int id)
        {
            var value = await _service.Get(id);
            if (value == null)
            {
                return NoContent();
            }

            return Ok(value);
        }

        [HttpGet("departments")]
        public async Task<IActionResult> GetDepartmentsByContract(int id, string s)
        {
            var value = await _service.GetDepartmentsByContract(id, s);
            if (value == null)
            {
                return NoContent();
            }

            return Ok(value);
        }

        // POST api/sampleData
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]CustomerDto value)
        {
            ICollection<ValidationResult> results;

            if (!value.IsModelValid(out results))
            {
                return BadRequest(results);
            }

            try
            {
                await _service.Insert(value);
                return Ok(value);
            }
            catch (Exception)
            {
                return NotFound("An error occurred; new record not saved");
            }
        }

        // PUT api/sampleData/5
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CustomerDto value)
        {
            ICollection<ValidationResult> results;

            if (!value.IsModelValid(out results))
            {
                return BadRequest(results);
            }

            try
            {
                await _service.Update(value);
                return Ok();
            }
            catch (Exception)
            {
                return NotFound("An error occurred; record not updated");
            }
        }

        // DELETE api/sampleData/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _service.Delete(id);
                return Ok();
            }
            catch (Exception)
            {
                return NotFound("An error occurred; not deleted");
            }
        }
    }
}
