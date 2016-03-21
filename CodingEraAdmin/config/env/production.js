'use strict';

module.exports = {
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
				'public/components/bootstrap/dist/css/bootstrap.min.css',
				'public/components/angular-ui-grid/ui-grid.min.css',
				'public/components/google-code-prettify/bin/prettify.min.css',
				'public/components/animate.css/animate.min.css',
				'public/components/bootstrap-wysiwyg/index.min.css',
				'public/components/codemirror/lib/codemirror.css'
			],
			js: [
				'public/components/angular/angular.min.js',
				'public/components/angular-i18n/angular-locale_zh-cn.js',
				'public/components/angular-resource/angular-resource.min.js',
				'public/components/angular-animate/angular-animate.min.js',
				'public/components/angular-ui-router/release/angular-ui-router.min.js',
				'public/components/angular-ui-utils/ui-utils.min.js',
				'public/components/angular-bootstrap/ui-bootstrap-tpls.min.js',
				'public/components/angular-translate/angular-translate.min.js',
				'public/components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
				'public/components/angular-translate-loader-partial/angular-translate-loader-partial.min.js',
				'public/components/angular-ui-grid/ui-grid.min.js',
				'public/components/google-code-prettify/bin/prettify.min.js',
				'public/components/ng-file-upload/ng-file-upload.min.js',
				'public/components/marked/marked.min.js',
				'public/components/codemirror/lib/codemirror.js',
				'public/components/lodash/dist/lodash.min.js'
			]
		},
		css: ['public/dist/css/all.min.css'],
		js: ['public/dist/js/all.js'],
		tests: [
			'public/components/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		],
		server: {
			gulpConfig: 'gulpfile.js',
			allJs: ['server.js', 'config/**/*.js', 'public/modules/*/*.js'],
			views: 'public/modules/**/*.html'
		}
	},
	app: {
		title: 'Coding Era 编码时代'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'eae6a961352846d592b3',
		clientSecret: process.env.GITHUB_SECRET || '0ec7bf264ff8a27b98a37c0915909442ad687c67',
		callbackURL: '/auth/github/callback'
	},
	codingera: {
		apiURL: 'http://www.codingera.com:8080/api',
		authorizationURL: 'http://www.codingera.com:8080/oauth/authorize',
		tokenURL: 'http://www.codingera.com:8080/oauth/token',
		clientID: 'api-client',
		clientSecret: 'api',
		callbackURL: "http://localhost:3000/auth/provider/callback",
		userInfoURL:"http://www.codingera.com:8080/api/me",
		logoutURL:"http://www.codingera.com:8080/auth/logout?next=www.codingera.com:3000"
	},
	mailer: {
		from: process.env.MAILER_FROM || '1132075350@qq.com',
		options: {
			host: "smtp.qq.com", // 主机
			secureConnection: true, // 使用 SSL
			port: 465, // SMTP 端口
			//service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || '1132075350@qq.com',
				pass: process.env.MAILER_PASSWORD || 'bhfyixrydoodgfee'
			}
		}
	}
};
