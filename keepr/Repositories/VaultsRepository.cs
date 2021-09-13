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
      string sql = @"
      SELECT
      v.*, 
      a.* 
      FROM vaults v
      JOIN accounts a ON v.creatorId = a.id
      WHERE v.isPrivate = 0;";
      return _db.Query<Vault, Profile, Vault>(sql, (vault, prof) =>
      {
        vault.Creator = prof;
        return vault;
      }, splitOn: "id").ToList();
    }

    public List<Vault> GetAll(string id)
    {
      string sql = @"
      SELECT
      v.*, 
      a.* 
      FROM vaults v
      JOIN accounts a ON v.creatorId = a.id
      WHERE v.creatorId = @id;
      ";
      return _db.Query<Vault, Profile, Vault>(sql, (vault, prof) =>
      {
        vault.Creator = prof;
        return vault;
      }, new { id }, splitOn: "id").ToList<Vault>();
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


    public Vault Edit(Vault updatedData)
    {
      string sql = @"
      UPDATE vaults
      SET
        name = @Name,
        description = @Description,
        isPrivate = @IsPrivate
      WHERE id = @Id
      ;";
      _db.Execute(sql, updatedData);
      return updatedData;
    }
    public void Delete(int id)
    {
      string sql = "DELETE FROM vaults WHERE id = @id LIMIT 1;";
        _db.Execute(sql, new { id });
    }
    
  }
}