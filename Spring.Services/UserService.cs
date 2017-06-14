using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Spring.DbContext.Models;
using Spring.Dto;

namespace Spring.Services
{
    public interface IUserService
    {
        Task<IList<ApplicationUserDto>> GetAll();
        Task<IdentityResult> Create(ApplicationUserDto dto);
        Task<IdentityResult> Delete(string username);
    }

    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ISmsSender _smsSender;
        private readonly IMapper _mapper;
        private readonly ILogger<UserService> _logger;

        public UserService(UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            SignInManager<ApplicationUser> signInManager,
            IEmailSender emailSender,
            ISmsSender smsSender,
            IMapper mapper, ILogger<UserService> logger)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _emailSender = emailSender;
            _smsSender = smsSender;
            _mapper = mapper;
            _logger = logger;
            _signInManager = signInManager;
        }

        public async Task<IList<ApplicationUserDto>> GetAll()
        {
            IdentityRole role = await _roleManager.FindByNameAsync("user");
            IList<ApplicationUser> users = await _userManager.GetUsersInRoleAsync(role.Name);
            return _mapper.Map<IList<ApplicationUser>, IList<ApplicationUserDto>>(users);
        }

        public async Task<IdentityResult> Create(ApplicationUserDto dto)
        {
            var user = new ApplicationUser
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                AccessFailedCount = 0,
                Email = dto.Email,
                EmailConfirmed = false,
                LockoutEnabled = true,
                NormalizedEmail = dto.Email.ToUpper(),
                NormalizedUserName = dto.Email.ToUpper(),
                TwoFactorEnabled = false,
                UserName = dto.Email
            };

            IdentityResult result = await _userManager.CreateAsync(user, dto.Password);

            if (result.Succeeded)
            {
                await addToRole(dto.Email, "user");

                var claims = new List<Claim> {
                    new Claim(type: JwtClaimTypes.GivenName, value: user.FirstName),
                    new Claim(type: JwtClaimTypes.FamilyName, value: user.LastName),
                    new Claim(type: JwtClaimTypes.Email, value: user.Email),
                };

                await _userManager.AddClaimsAsync(user, claims);
            }

            return result;
        }

        public async Task<IdentityResult> Delete(string username)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(username);
            IdentityResult result = await _userManager.DeleteAsync(user);
            return result;
        }

        private async Task addToRole(string userName, string roleName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            await _userManager.AddToRoleAsync(user, roleName);
        }

        private async Task addClaims(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            var claims = new List<Claim> {
                new Claim(type: JwtClaimTypes.GivenName, value: user.FirstName),
                new Claim(type: JwtClaimTypes.FamilyName, value: user.LastName),
            };
            await _userManager.AddClaimsAsync(user, claims);
        }
    }
}
