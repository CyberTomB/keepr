using System;
using System.Collections.Generic;
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
    public class VaultsController : ControllerBase
    {
        private readonly VaultsService _vservice;
        public VaultsController(VaultsService vservice)
        {
            _vservice = vservice;
        }

        [HttpGet]
        public async Task<ActionResult<List<Vault>>> Get()
        {
            Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
            string userId = "none";
            if(userInfo != null){
                userId = userInfo.Id;
            }
            try
            {
                 List<Vault> vaults = _vservice.Get(userId);
                 return Ok(vaults);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Vault>> Get(int id)
        {
            Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
            try
            {
                 Vault vault = _vservice.Get(id);
                 return Ok(vault);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Vault>> Create([FromBody] Vault newVault)
        {
            try
            {
                 Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
                 newVault.CreatorId = userInfo.Id;
                 Vault vault = _vservice.Create(newVault);
                 return Ok(vault);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Vault>> Edit (int id, [FromBody] Vault editedVault)
        {
            try
            {
                 Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
                 editedVault.CreatorId = userInfo.Id;
                 editedVault.Id = id;
                 Vault vault = _vservice.Edit(editedVault);
                 return Ok(vault);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Vault>> Delete(int id)
        {
            try
            {
                 Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
                 Vault vault = _vservice.Delete(id, userInfo.Id);
                 return Ok(vault);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
    }
}