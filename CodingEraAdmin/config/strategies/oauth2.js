/**
 * Created by JasonWoo on 16/3/7.
 */
var passport = require('passport'),
    OAuth2Strategy = require('passport-oauth2').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');

module.exports = function() {
    passport.use('oauth2', new OAuth2Strategy({
            // 这里要自定义认证头才能获取token. @see https://dev.fitbit.com/docs/oauth2/#access-token-request
            // Authorization Header:
            // The Authorization header must be set to Basic followed by a space,
            // then the Base64 encoded string of your application's client id and secret concatenated with a colon.
            // For example, the Base64 encoded string, Y2xpZW50X2lkOmNsaWVudCBzZWNyZXQ=,
            // is decoded as [client_id]:[client_secret].
            customHeaders : {
                Authorization: 'Basic '+ new Buffer(config.codingera.clientID + ':' + config.codingera.clientSecret).toString('base64')
            },
            authorizationURL: config.codingera.authorizationURL,
            tokenURL: config.codingera.tokenURL,
            clientID: config.codingera.clientID,
            clientSecret: config.codingera.clientSecret,
            callbackURL: config.codingera.callbackURL,
            passReqToCallback: true
        },
        function (req, accessToken, refreshToken, profile, done) {

            //todo 后台不知如何返回user profile,暂时再查一次
            users.findOrCreate(config.codingera.userInfoURL, accessToken, function(user) {

                user["accessToken"] = accessToken;
                console.log("findOrCreate user", user);

                // Set the provider data and include tokens
                var providerData = profile._json || {};
                providerData.accessToken = accessToken;
                providerData.refreshToken = refreshToken;


                // Create the user OAuth profile
                //var displayName = profile.displayName.trim();
                //var iSpace = displayName.indexOf(' '); // index of the whitespace following the firstName
                //var firstName =  iSpace !== -1 ? displayName.substring(0, iSpace) : displayName;
                //var lastName = iSpace !== -1 ? displayName.substring(iSpace + 1) : '';

                var providerUserProfile = {
                    firstName: null, //firstName,
                    lastName: null, //lastName,
                    displayName: null, //displayName,
                    email: null, //profile.emails[0].value,
                    username: null, //profile.username,
                    provider: 'codingera',
                    providerIdentifierField: 'id',
                    providerData: providerData,
                    user: user
                };

                // Save the user OAuth profile
                users.saveOAuthUserProfile(req, providerUserProfile, done);
            });

        }
    ));
};
