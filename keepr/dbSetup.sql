CREATE TABLE IF NOT EXISTS accounts(
  id VARCHAR(255) NOT NULL primary key COMMENT 'primary key',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Time Created',
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last Update',
  name varchar(255) COMMENT 'User Name',
  email varchar(255) COMMENT 'User Email',
  picture varchar(255) COMMENT 'User Picture'
) default charset utf8 COMMENT '';

CREATE TABLE IF NOT EXISTS keeps(
  id INT AUTO_INCREMENT primary key COMMENT 'primary key',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Time Created',
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last Update',
  creatorId VARCHAR(255) NOT NULL COMMENT 'Account ID for Creator',
  name VARCHAR(255) NOT NULL COMMENT 'keep name',
  description VARCHAR(1023) COMMENT 'keep description',
  imgUrl VARCHAR(511) COMMENT 'keep image URL',
  views INT DEFAULT 0 COMMENT 'number of page views',
  vaults INT DEFAULT 0 COMMENT 'number of vaults containing this keep',
  shares INT DEFAULT 0 COMMENT 'number of times this has had a share link request',
  FOREIGN KEY (creatorId) REFERENCES accounts(id) ON DELETE CASCADE
) default charset utf8 COMMENT '';

CREATE TABLE IF NOT EXISTS vaults(
  id INT AUTO_INCREMENT primary key COMMENT 'primary key',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Time Created',
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last Update',
  creatorId VARCHAR(255) NOT NULL COMMENT 'Account ID for Creator',
  name VARCHAR(255) NOT NULL COMMENT 'Vault Name',
  description VARCHAR(511) COMMENT 'Vault Description',
  isPrivate TINYINT NOT NULL COMMENT 'Privacy Bool',
  FOREIGN KEY (creatorId) REFERENCES accounts(id) ON DELETE CASCADE
) default charset utf8 COMMENT '';

CREATE TABLE IF NOT EXISTS vaultKeeps(
  id INT AUTO_INCREMENT primary key COMMENT 'primary key',
  vaultId int NOT NULL comment 'Vault ID',
  keepId int NOT NULL comment 'Keep ID',
  creatorId VARCHAR(255) NOT NULL COMMENT 'Account ID for Creator',
  FOREIGN KEY (vaultId) REFERENCES vaults(id) ON DELETE CASCADE,
  FOREIGN KEY (keepId) REFERENCES keeps(id) ON DELETE CASCADE,
  FOREIGN KEY (creatorId) REFERENCES accounts(id) ON DELETE CASCADE
) DEFAULT charset utf8 comment '';
