using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Spring.Dto;
using Spring.Services;
using Spring.WebApi.Helpers;

namespace Spring.WebApi.Controllers
{
    /// <summary>
    /// Identity Web API controller.
    /// </summary>
    [Route("api/[controller]")]
    [Authorize(Policy = "Manage Accounts")] // Authorization policy for this API.
    public class IdentityController : Controller
    {
        private readonly IUserService _userService;

        public IdentityController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Gets all the users.
        /// </summary>
        /// <returns>Returns all the users</returns>
        // GET api/identity/GetAll
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {            
            return Ok(await _userService.GetAll());
        }

        /// <summary>
        /// Registers a new user.
        /// </summary>
        /// <returns>IdentityResult</returns>
        // POST: api/identity/Create
        [HttpPut]
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody]ApplicationUserDto dto)
        {
            ICollection<ValidationResult> results;
            if (!dto.IsModelValid(out results))
            {
                return BadRequest(results);
            }

            try
            {                
                return Ok(await _userService.Create(dto));
            }
            catch (Exception)
            {
                return NotFound("An error occurred; new record not saved");
            }
        }

        /// <summary>
        /// Deletes a user.
        /// </summary>
        /// <returns>IdentityResult</returns>
        // POST: api/identity/Delete
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody]string username)
        {
            try
            {
                return Ok(await _userService.Delete(username));
            }
            catch (Exception)
            {
                return NotFound("An error occurred; not deleted");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Update([FromBody]ApplicationUserDto dto)
        {
            ICollection<ValidationResult> results;
            if (!dto.IsModelValid(out results))
            {
                return BadRequest(results);
            }

            try
            {
                await _userService.Update(dto);
                return Ok(dto);
            }
            catch (Exception)
            {
                return NotFound("An error occurred; new record not saved");
            }
        }
    }
}