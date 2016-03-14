/**

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

delete ce_user_role;
delete ce_user;

-- initial user test data
INSERT INTO `ce_user` 
    (`id`, `account_non_expired`, `account_non_locked`, `avatar`, `credentials_non_expired`, `enabled`, `intro`, `password`, `sex`, `user_name`)
VALUES
    (3, 10000000, 10000000, NULL, 10000000, 10000000, NULL, '$2a$10$Xm39I7RZMegatwaetQ0dsO5Ggj8z.DGDO86iG9Tj3HoxeLQX99P4m', NULL, 'admin');
    
-- initial role test data
INSERT INTO `ce_user_role` 
    (`id`, `role`, `user_id`)
VALUES
    (1, 'ROLE_ADMIN', 3),
    (2, 'ROLE_USER', 3),
    (4, 'ROLE_MOBILE', 3);
    
 */
