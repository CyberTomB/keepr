using System;
using System.Collections.Generic;
using System.Data;
using Dapper;
using keepr.Interfaces;
using keepr.Models;

namespace keepr.Repositories
{
  public class VaultKeepsRepository : IRepo<VaultKeep, int>
  {
      private readonly IDbConnection _db;

      public VaultKeepsRepository(IDbConnection db)
      {
          _db = db;
      }

    public List<VaultKeep> GetAll()
    {
      throw new NotImplementedException();
    }

    public VaultKeep GetById(int id)
    {
      string sql = @"
        SELECT * FROM vaultKeeps
        WHERE id = @id;
        ";
        return _db.QueryFirstOrDefault<VaultKeep>(sql, new { id });
    }
    public VaultKeep Create(VaultKeep newData)
    {
      string sql = @"
      UPDATE keeps
      SET keeps = keeps + 1
      WHERE id = @KeepId;
      INSERT INTO vaultKeeps 
      (creatorId, vaultId, keepId) 
      VALUES (@CreatorId, @VaultId, @KeepId); 
      SELECT LAST_INSERT_ID();
      ";
      int id = _db.ExecuteScalar<int>(sql, newData);
      return GetById(id);
    }

    public void Delete(int id, int keepId)
    {
      string sql = @"
      UPDATE keeps SET keeps = keeps -1
      WHERE id = @keepId;
      DELETE FROM vaultKeeps WHERE id = @id;";
      _db.Execute(sql, new { id, keepId });
    }

    public VaultKeep Edit(VaultKeep updatedData)
    {
      throw new NotImplementedException();
    }

    public void Delete(int id)
    {
      throw new NotImplementedException();
    }
  }
}