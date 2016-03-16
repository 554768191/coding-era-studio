'use strict';

module.exports = {
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'dev',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			//stream: 'access.log'
		}
	},
	app: {
		title: 'Coding Era - 开发模式'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'eae6a961352846d592b3',
		clientSecret: process.env.GITHUB_SECRET || '0ec7bf264ff8a27b98a37c0915909442ad687c67',
		callbackURL: '/auth/github/callback'
	},
	codingera: {
		authorizationURL: 'http://localhost:8080/oauth/authorize',
		tokenURL: 'http://localhost:8080/oauth/token',
		clientID: 'api-client',
		clientSecret: 'api',
		callbackURL: "http://localhost:3000/auth/provider/callback",
		userInfoURL:"http://localhost:8080/api/me",
		logoutURL:"http://localhost:8080/oauth/logout?next=http://localhost:3000"

		//authorizationURL: 'http://www.codingera.com:8080/oauth/authorize',
		//tokenURL: 'http://www.codingera.com:8080/oauth/token',
		//clientID: 'api-client',
		//clientSecret: 'api',
		//callbackURL: "http://localhost:3000/auth/provider/callback",
		//userInfoURL:"http://www.codingera.com:8080/api/me",
		//logoutURL:"http://www.codingera.com:8080/auth/logout?next=http://localhost:3000"

	}
};
