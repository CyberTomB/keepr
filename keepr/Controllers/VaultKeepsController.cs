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
    public class VaultKeepsController : ControllerBase
    {
        private readonly VaultKeepsService _vks;
        private readonly VaultsService _vservice;
        public VaultKeepsController(VaultKeepsService vks, VaultsService vservice)
        {
            _vks = vks;
            _vservice = vservice;
        }

        [HttpGet]
        public ActionResult<List<VaultKeep>> Get()
        {
            try
            {
                List<VaultKeep> vaultKeeps = _vks.Get();
                return Ok(vaultKeeps);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }


        [HttpPost]
        [Authorize]
        public async Task<ActionResult<VaultKeep>> Create ([FromBody] VaultKeep newVK)
        {
            try
            {
                 Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
                 newVK.CreatorId = userInfo.Id;
                 Vault vault = _vservice.Get(newVK.VaultId, userInfo.Id);
                if(vault.CreatorId == userInfo.Id)
                {
                 VaultKeep vk = _vks.Create(newVK);
                 return Ok(vk);
                }
                return BadRequest("Invalid Authorization");
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<String>> Delete(int id)
        {
            try
            {
                 Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
                 string resultsStr = _vks.Delete(id, userInfo.Id);
                 return Ok(resultsStr);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
    }
}