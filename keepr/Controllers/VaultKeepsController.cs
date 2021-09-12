using System;
using System.Threading.Tasks;
using CodeWorks.Auth0Provider;
using keepr.Models;
using keepr.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [Authorize]
    public class VaultKeepsController : ControllerBase
    {
        private readonly VaultKeepsService _vks;
        public VaultKeepsController(VaultKeepsService vks)
        {
            _vks = vks;
        }

        [HttpPost]
        public async Task<ActionResult<VaultKeep>> Create ([FromBody] VaultKeep newVK)
        {
            try
            {
                 Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
                 newVK.CreatorId = userInfo.Id;
                 VaultKeep vk = _vks.Create(newVK);
                 return Ok(vk);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
    }
}