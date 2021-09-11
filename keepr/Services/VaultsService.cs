using System;
using System.Collections.Generic;
using System.Linq;
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
      List<Vault> vaults = _repo.GetAll();
      List<Vault> publicVaults = vaults.Where(x => x.IsPrivate == false).ToList();
      return publicVaults;
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

    internal Vault Edit(Vault editedVault)
    {
      Vault original = Get(editedVault.Id);
      if(original.CreatorId != null && original.CreatorId != editedVault.CreatorId)
      {
          throw new Exception("Invalid Access");
      }
        // REVIEW: May need to fix the logic for the IsPrivate bool
      original.Name = editedVault.Name.Length > 0 ? editedVault.Name : original.Name;
      original.Description = editedVault.Description != null && editedVault.Description.Length > 0 ? editedVault.Description : original.Description;
      original.IsPrivate = editedVault.IsPrivate != original.IsPrivate ? editedVault.IsPrivate : original.IsPrivate;
      return _repo.Edit(original);
    }

    internal Vault Delete(int vaultId, string creatorId)
    {
      Vault vaultToDelete = Get(vaultId);
      if(vaultToDelete.CreatorId != creatorId)
      {
        throw new Exception("Invalid Access");
      }
      _repo.Delete(vaultId);
      return vaultToDelete;
    }
  }
}