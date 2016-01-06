'use strict';

module.exports = {
	app: {
		title: 'Coding Era',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'mongodb, express, angularjs, node.js, mongoose, passport'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	// The secret should be set to a non-guessable string that
	// is used to compute a session hash
	sessionSecret: 'MEAN',
	// The name of the MongoDB collection to store sessions in
	sessionCollection: 'sessions',
	// The session cookie settings
	sessionCookie: {
		path: '/',
		httpOnly: true,
		// If secure is set to true then it will cause the cookie to be set
		// only when SSL-enabled (HTTPS) is used, and otherwise it won't
		// set a cookie. 'true' is recommended yet it requires the above
		// mentioned pre-requisite.
		secure: false,
		// Only set the maxAge to null if the cookie shouldn't be expired
		// at all. The cookie will expunge when the browser is closed.
		maxAge: null,
		// To set the cookie in a specific domain uncomment the following
		// setting:
		// domain: 'yourdomain.com'
	},
	// The session cookie name
	sessionName: 'connect.sid',
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			stream: 'access.log'
		}
	},
	assets: {
		lib: {
			css: [
				'public/components/bootstrap/dist/css/bootstrap.css',
				//'public/components/bootstrap/dist/css/bootstrap-theme.css',
				'public/components/angular-ui-grid/ui-grid.css',
				'public/components/google-code-prettify/src/prettify.css',
				'public/components/animate.css/animate.css'
			],
			js: [
				'public/components/angular/angular.js',
				'public/components/angular-i18n/angular-locale_zh-cn.js',
				'public/components/angular-resource/angular-resource.js',
				'public/components/angular-animate/angular-animate.js',
				'public/components/angular-ui-router/release/angular-ui-router.js',
				'public/components/angular-ui-utils/ui-utils.js',
				'public/components/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/components/angular-translate/angular-translate.js',
				'public/components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
				'public/components/angular-translate-loader-partial/angular-translate-loader-partial.js',
				'public/components/angular-ui-grid/ui-grid.js',
				'public/components/google-code-prettify/src/prettify.js',
				'public/components/ng-file-upload/ng-file-upload.js',
				'public/components/marked/marked.min.js'
				//'public/components/angular-strap/dist/angular-strap.js',
				//'public/components/angular-strap/dist/angular-strap.tpl.js',
				//'public/components/jquery/dist/jquery.js'
			]
		},
		sass:['public/modules/**/scss/*.scss'],
		css: ['public/modules/**/css/*.css'],
		js: [
			'public/modules/config.js',
			'public/modules/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/components/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		],
		server: {
			gulpConfig: 'gulpfile.js',
			allJs: ['server.js', 'config/**/*.js', 'public/modules/*/*.js'],
			views: 'public/modules/**/*.html'
		}
	}
};
