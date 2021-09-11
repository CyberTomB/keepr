using System;
using System.Collections.Generic;
using keepr.Models;
using keepr.Repositories;

namespace keepr.Services
{
  public class VaultsService
  {
      private readonly VaultsRepository _repo;
      public VaultsService(VaultsRepository repo)
      {
          _repo = repo;
      }
    internal List<Vault> Get()
    {
      return _repo.GetAll();
    }

    internal Vault Get(int id)
    {
        Vault vault = _repo.GetById(id);
        if(vault == null)
        {
            throw new Exception("Invalid ID");
        }
        return vault;
    }

    internal Vault Create(Vault newVault)
    {
      return _repo.Create(newVault);
    }
  }
}