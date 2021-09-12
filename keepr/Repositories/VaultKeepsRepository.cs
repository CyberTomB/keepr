using System.Data;
using Dapper;
using keepr.Models;

namespace keepr.Repositories
{
  public class VaultKeepsRepository
  {
      private readonly IDbConnection _db;

      public VaultKeepsRepository(IDbConnection db)
      {
          _db = db;
      }
    internal VaultKeep Create(VaultKeep newVK)
    {
      string sql = @"
      INSERT INTO vaultKeeps 
      (creatorId, vaultId, keepId) 
      VALUES (@CreatorId, @VaultId, @KeepId); 
      SELECT LAST_INSERT_ID();
      ";
      int id = _db.ExecuteScalar<int>(sql, newVK);
      return GetById(id);
    }

    private VaultKeep GetById(int id)
    {
        string sql = @"
        SELECT * FROM vaultKeeps
        WHERE id = @id;
        ";
        return _db.QueryFirstOrDefault<VaultKeep>(sql, new { id });
    }
  }
}