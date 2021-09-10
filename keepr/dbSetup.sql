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
  shares INT DEFAULT 0 COMMENT 'number of times this has had a share link request'
) default charset utf8 COMMENT '';
