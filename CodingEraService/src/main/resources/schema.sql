/**
 * 
 */
--
--  Oauth sql  -- MYSQL
--
Drop table  if exists oauth_client_details;
create table oauth_client_details (
  client_id VARCHAR(255) PRIMARY KEY,
  resource_ids VARCHAR(255),
  client_secret VARCHAR(255),
  scope VARCHAR(255),
  authorized_grant_types VARCHAR(255),
  web_server_redirect_uri VARCHAR(255),
  authorities VARCHAR(255),
  access_token_validity INTEGER,
  refresh_token_validity INTEGER,
  additional_information TEXT,
  create_time timestamp default now(),
  archived tinyint(1) default '0',
  trusted tinyint(1) default '0',
  autoapprove VARCHAR (255) default 'true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

Drop table  if exists oauth_access_token;
create table oauth_access_token (
  create_time timestamp default now(),
  token_id VARCHAR(255),
  token BLOB,
  authentication_id VARCHAR(255),
  user_name VARCHAR(255),
  client_id VARCHAR(255),
  authentication BLOB,
  refresh_token VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

Drop table  if exists oauth_refresh_token;
create table oauth_refresh_token (
  create_time timestamp default now(),
  token_id VARCHAR(255),
  token BLOB,
  authentication BLOB
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

Drop table  if exists oauth_code;
create table oauth_code (
  create_time timestamp default now(),
  code VARCHAR(255),
  authentication BLOB
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Add indexes
create index token_id_index on oauth_access_token (token_id);
create index authentication_id_index on oauth_access_token (authentication_id);
create index user_name_index on oauth_access_token (user_name);
create index client_id_index on oauth_access_token (client_id);
create index refresh_token_index on oauth_access_token (refresh_token);
create index code_index on oauth_code (code);







--
-- init data
--

-- initial oauth test data
delete oauth_client_details;
insert into oauth_client_details
(client_id, resource_ids, client_secret, scope, authorized_grant_types,
web_server_redirect_uri,authorities, access_token_validity,
refresh_token_validity, additional_information, create_time, archived, trusted)
values
('unity-client','unity-resource', 'unity', 'read,write','authorization_code,refresh_token,implicit',null,'ROLE_CLIENT',null,null,null, now(), 0, 0),
('mobile-client','mobile-resource', 'mobile', 'read,write','client_credentials,password,refresh_token',null,'ROLE_CLIENT',null,null,null, now(), 0, 0),
('api-client','api-resource', 'api', 'read,write','authorization_code,client_credentials,password,refresh_token',null,'ROLE_CLIENT',null,null,null, now(), 0, 0);

-- initial user test data
--INSERT INTO `ce_user` 
--    (`id`, `account_non_expired`, `account_non_locked`, `avatar`, `credentials_non_expired`, `enabled`, `intro`, `password`, `sex`, `user_name`)
--VALUES
--    (3, 10000000, 10000000, NULL, 10000000, 10000000, NULL, '$2a$10$Xm39I7RZMegatwaetQ0dsO5Ggj8z.DGDO86iG9Tj3HoxeLQX99P4m', NULL, 'admin');
--    
---- initial role test data
--INSERT INTO `ce_user_role` 
--    (`id`, `role`, `user_id`)
--VALUES
--    (1, 'ROLE_ADMIN', 3),
--    (2, 'ROLE_USER', 3),
--    (4, 'ROLE_MOBILE', 3);
