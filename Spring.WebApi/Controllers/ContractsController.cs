using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Spring.Dto;
using Spring.Services;
using Spring.WebUI.Helpers;

namespace Spring.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
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
                return Json(NoContent());
            }

            return Json(Ok(value));
        }

        // GET: api/sampleData
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var data = await _service.GetAll();

            if (!data.Any())
            {
                return Json(NoContent());
            }

            return Json(Ok(data));
        }

        // POST api/sampleData
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]ContractDto value)
        {
            ICollection<ValidationResult> results;

            if (!value.IsModelValid(out results))
            {
                return Json(BadRequest(results));
            }

            try
            {
                await _service.Insert(value);
                return Json(Ok(value));
            }
            catch (Exception)
            {
                return Json(NotFound("An error occurred; new record not saved"));
            }
        }

        // PUT api/sampleData/5
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]ContractDto value)
        {
            ICollection<ValidationResult> results;

            if (!value.IsModelValid(out results))
            {
                return Json(BadRequest(results));
            }

            try
            {
                await _service.Update(value);
                return Json(Ok(value));
            }
            catch (DbUpdateException exception)
            {
                Debug.WriteLine("An exception occurred: {0}, {1}", exception.InnerException, exception.Message);
                return Json(NotFound("An error occurred; record not updated"));
            }
        }

        // DELETE api/sampleData/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _service.Delete(id);
                return Json(Ok(id));
            }
            catch (Exception)
            {
               return Json(NotFound("An error occurred; not deleted"));
            }
        }
    }
}
