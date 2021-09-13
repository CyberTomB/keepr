using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using keepr.Interfaces;
using keepr.Models;

namespace keepr.Repositories
{
  public class KeepsRepository : IRepo<Keep, int>
  {
      private readonly IDbConnection _db;
      public KeepsRepository(IDbConnection db)
      {
          _db = db;
      }
    public List<Keep> GetAll()
    {
      string sql = @"
      SELECT
      k.*, 
      a.* 
      FROM keeps k
      JOIN accounts a ON k.creatorId = a.id;";
      return _db.Query<Keep, Profile, Keep>(sql, (keep, prof) =>
      {
        keep.Creator = prof;
        return keep;
      }, splitOn: "id").ToList();
    }

      internal List<Keep> GetAll(string id)
    {
       string sql = @"
      SELECT
      k.*, 
      a.* 
      FROM keeps k
      JOIN accounts a ON k.creatorId = a.id
      WHERE k.creatorId = @id;";
      return _db.Query<Keep, Profile, Keep>(sql, (keep, prof) =>
      {
        keep.Creator = prof;
        return keep;
      }, new { id }, splitOn: "id").ToList<Keep>();
    }

    public Keep GetById(int id)
    {
      string sql = @"
      SELECT
      a.*,
      k.*
      FROM keeps k
      JOIN accounts a ON a.id = k.creatorId
      WHERE k.id = @id;
      UPDATE keeps
      SET views = views + 1
      WHERE id = @id;
      ";
      return _db.Query<Profile, Keep, Keep>(sql, (prof, keep) =>
      {
          keep.Creator = prof;
          return keep;
      }, new {id}, splitOn: "id").FirstOrDefault();
    }
    public Keep Create(Keep newData)
    {
      string sql = @"
      INSERT INTO keeps
      (name, description, img, creatorId)
      VALUES
      (@Name, @Description, @Img, @CreatorId);
      SELECT LAST_INSERT_ID();
      ";
      int id = _db.ExecuteScalar<int>(sql, newData);
      return GetById(id);
    }

        public Keep Edit(Keep updatedData)
    {
      string sql = @"
      UPDATE keeps
      SET
        name = @Name,
        description = @Description,
        img = @Img
      WHERE id = @Id
      ;";
      _db.Execute(sql, updatedData);
      return updatedData;
    }

    public void Delete(int id)
    {
      string sql = "DELETE FROM keeps WHERE id = @id LIMIT 1;";
      _db.Execute(sql, new { id });
    }

    internal List<VaultKeepsViewModel> GetKeepsByVaultId(int id)
    {
      string sql = @"
      SELECT
      a.*,
      k.*,
      vk.id AS vaultKeepId
      FROM vaultKeeps vk
      JOIN accounts a ON vk.creatorId = a.id
      JOIN keeps k ON vk.keepId = k.id
      WHERE vk.vaultId = @id;
      ";
      return _db.Query<Profile, VaultKeepsViewModel, VaultKeepsViewModel>(sql, (prof, keep) =>
      {
        keep.Creator = prof;
        return keep;
      }, new { id }, splitOn: "id").ToList<VaultKeepsViewModel>();
    }


  }
}