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
    internal List<Vault> Get(string userId)
    {
      List<Vault> vaults = _repo.GetAll();
      if(userId == "none")
      {
        return vaults.Where(x => x.IsPrivate == false).ToList();
      }
      else
      {
          return vaults.Where(x => x.IsPrivate == false || x.CreatorId == userId).ToList();
      }
    }

    internal Vault Get(int id, string userId)
    {
        Vault vault = _repo.GetById(id);
        if(vault == null)
        {
            throw new Exception("Invalid ID");
        }
        if(vault.IsPrivate == false || vault.CreatorId == userId)
        {
            return vault;
        }
        throw new Exception("Invalid Access");
    }

    internal Vault Create(Vault newVault)
    {
      return _repo.Create(newVault);
    }

    internal List<Vault> GetVaultsByCreator(string id, bool allowPrivate = false)
    {
      List<Vault> vaults = _repo.GetAll(id);
      if(allowPrivate)
      {
        return vaults;
      }
      return vaults.Where(v => v.IsPrivate == false).ToList();
    }

    internal Vault Edit(Vault editedVault)
    {
      Vault original = Get(editedVault.Id, editedVault.CreatorId);
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
      Vault vaultToDelete = Get(vaultId, creatorId);
      if(vaultToDelete.CreatorId != creatorId)
      {
        throw new Exception("Invalid Access");
      }
      _repo.Delete(vaultId);
      return vaultToDelete;
    }
  }
}