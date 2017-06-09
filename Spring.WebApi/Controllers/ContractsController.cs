using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Spring.Dto;
using Spring.Services;
using Spring.WebApi.Helpers;

namespace Spring.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize(Policy = "Access Resources")] // Authorization policy for this API.
    public class ContractsController : Controller
    {
        private readonly IContractService _service;

        public ContractsController(IContractService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var value = await _service.Get(id);
            if (value == null)
            {
                return NoContent();
            }

            return Ok(value);
        }

        // GET: api/sampleData
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var data = await _service.GetAll();

            if (!data.Any())
            {
                return NoContent();
            }

            return Ok(data);
        }

        // POST api/sampleData
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]ContractDto value)
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
        public async Task<IActionResult> Post([FromBody]ContractDto value)
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
