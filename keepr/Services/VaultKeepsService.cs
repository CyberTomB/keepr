using System;
using System.Collections.Generic;
using keepr.Models;
using keepr.Repositories;

namespace keepr.Services
{
  public class VaultKeepsService
  {
      private readonly VaultKeepsRepository _vkr;
      public VaultKeepsService(VaultKeepsRepository vkr)
      {
          _vkr = vkr;
      }
    internal VaultKeep Create(VaultKeep newVK)
    {
      return _vkr.Create(newVK);
    }

    internal List<VaultKeep> Get()
    {
      return _vkr.GetAll();
    }

    internal string Delete(int id, string accountId)
    {
      VaultKeep vk = GetById(id);
      if(vk.CreatorId == accountId)
      {
        _vkr.Delete(id);
        return "Successfully Deleted";
      }
      throw new Exception("Invalid Access");
    }

    private VaultKeep GetById(int id)
    {
      VaultKeep found = _vkr.GetById(id);
      if(found == null)
      {
        throw new Exception("Invalid Vault-Keep ID");
      }
      return found;
    }
  }
}