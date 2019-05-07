using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Spring.Dto;
using Spring.Services;
using Spring.WebApi.Helpers;

namespace Spring.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [ApiConventionType(typeof(DefaultApiConventions))]
    //[Authorize(Policy = "Access Resources")] // Authorization policy for this API.
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _service;

        public CustomersController(ICustomerService service)
        {
            _service = service;
        }

        [HttpGet("{contract}")]
        [ProducesResponseType(typeof(IEnumerable<CustomerDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<CustomerDto>>> GetByContractId(int id, int page = 1, int pageSize = 10, string globalFilter = null)
        {
            var value = await _service.GetByContractId(id, page, pageSize, globalFilter);
            if (value == null)
            {
                return NoContent();
            }

            return Ok(value);
        }

        [HttpGet("{id}/cases")]
        [ProducesResponseType(typeof(IEnumerable<CustomerInsuranceCasesDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<CustomerInsuranceCasesDto>>> GetByCustomerId(int id)
        {
            var value = await _service.GetInsuranceCasesByCustomerId(id);
            if (value == null)
            {
                return NoContent();
            }

            return Ok(value);
        }

        [HttpGet("{id}/short")]
        [ProducesResponseType(typeof(CustomerShortDetailsDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<CustomerShortDetailsDto>> GetShortDetails(int id)
        {
            var value = await _service.GetShortDetails(id);
            if (value == null)
            {
                return NoContent();
            }

            return Ok(value);
        }

        [HttpGet("{id}/full")]
        [ProducesResponseType(typeof(CustomerDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<CustomerDto>> GetById(int id)
        {
            var value = await _service.Get(id);
            if (value == null)
            {
                return NoContent();
            }

            return Ok(value);
        }

        [HttpGet("departments")]
        [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<string>>> GetDepartmentsByContract(int id, string s)
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
        [ProducesResponseType(typeof(CustomerDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<CustomerDto>> Put([FromBody]CustomerDto value)
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
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Post([FromBody]CustomerDto value)
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
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Delete(int id)
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
