using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using keepr.Interfaces;
using keepr.Models;

namespace keepr.Repositories
{
  public class VaultsRepository : IRepo<Vault, int>
  {
      private readonly IDbConnection _db;
      public VaultsRepository(IDbConnection db)
      {
          _db = db;
      }
      public List<Vault> GetAll()
    {
      string sql = "SELECT * FROM vaults;";
      return _db.Query<Vault>(sql).ToList();
    }

    public Vault GetById(int id)
    {
      string sql = @"
      SELECT
      a.*,
      v.*
      FROM vaults v
      JOIN accounts a ON a.id = v.creatorId
      WHERE v.id = @id;
      ";
      return _db.Query<Profile, Vault, Vault>(sql, (prof, vault) =>
      {
          vault.Creator = prof;
          return vault;
      }, new {id}, splitOn: "id").FirstOrDefault();
    }
    public Vault Create(Vault newData)
    {
      string sql = @"
      INSERT INTO vaults
      (name, description, creatorId, isPrivate)
      VALUES
      (@Name, @Description, @CreatorId, @IsPrivate);
      SELECT LAST_INSERT_ID();
      ";
      int id = _db.ExecuteScalar<int>(sql, newData);
      return GetById(id);
    }

    public void Delete(int id)
    {
      throw new System.NotImplementedException();
    }

    public Vault Edit(Vault updatedData)
    {
      throw new System.NotImplementedException();
    }

    
  }
}