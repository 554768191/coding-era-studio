-- Initial database  data

-- initial user test data
INSERT INTO `ce_user` 
	(`id`, `account_non_expired`, `account_non_locked`, `avatar`, `credentials_non_expired`, `enabled`, `intro`, `password`, `sex`, `user_name`)
VALUES
	(3, 10000000, 10000000, NULL, 10000000, 10000000, NULL, '21232f297a57a5a743894a0e4a801fc3', NULL, 'admin');
	
-- initial role test data
INSERT INTO `ce_user_role` 
	(`id`, `role`, `user_id`)
VALUES
	(1, X'524F4C455F41444D494E', 3),
	(2, X'524F4C455F554E495459', 3),
	(4, X'524F4C455F4D4F42494C45', 3);

-- initial oauth client details test data
-- 'unity-client'   support browser, js(flash) visit
-- 'mobile-client'  only support mobile-device visit
truncate  oauth_client_details;
insert into oauth_client_details
(client_id, resource_ids, client_secret, scope, authorized_grant_types,
web_server_redirect_uri,authorities, access_token_validity,
refresh_token_validity, additional_information, create_time, archived, trusted)
values
('unity-client','unity-resource', 'unity', 'read,write','authorization_code,refresh_token,implicit',null,'ROLE_CLIENT',null,null,null, now(), 0, 0),
('mobile-client','mobile-resource', 'mobile', 'read,write','password,refresh_token',null,'ROLE_CLIENT',null,null,null, now(), 0, 0),
('api-client','api-resource', 'api', 'read,write','password,refresh_token',null,'ROLE_CLIENT',null,null,null, now(), 0, 0);