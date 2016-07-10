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
	assets: {
		lib: {
			css: [
				'public/components/bootstrap/dist/css/bootstrap.css',
				'public/components/angular-ui-grid/ui-grid.css',
				'public/components/google-code-prettify/src/prettify.css',
				'public/components/animate.css/animate.css',
				'public/components/bootstrap-wysiwyg/index.css',
				'public/components/codemirror/lib/codemirror.css',
				'public/components/ui-select/dist/select.min.css',
				'public/components/ng-img-crop/compile/minified/ng-img-crop.css',
				'public/components/slickgrid/slick.grid.css'
			],
			js: [
				'public/components/angular/angular.js',
				'public/components/angular-i18n/angular-locale_zh-cn.js',
				'public/components/angular-resource/angular-resource.js',
				'public/components/angular-animate/angular-animate.js',
				'public/components/angular-ui-router/release/angular-ui-router.js',
				'public/components/angular-ui-utils/ui-utils.js',
				'public/components/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/components/angular-sanitize/angular-sanitize.min.js',
				'public/components/angular-cookies/angular-cookies.min.js',

				'public/components/lodash/dist/lodash.min.js',

				// ngGileUpload 强大的文件上传工具
				'public/components/ng-file-upload/ng-file-upload.js',
				// ngImgCrop 图片截图工具
				'public/components/ng-img-crop/compile/unminified/ng-img-crop.js',

				// ui-select 下拉多选,可自定义 , 解决 bootstrap 不能下拉自定义录入
				'public/components/ui-select/dist/select.js',

				// moment 第三方是日期处理类库,用于解析、检验、操作、以及显示日期等 ( 炒鸡强大)
				'public/components/moment/min/moment.min.js',

				// markdown 指令依赖包
				'public/components/marked/lib/marked.js',
				'public/components/codemirror/lib/codemirror.js',
				'public/components/angular-marked/dist/angular-marked.min.js',

				// 这里使用 slickgrid 考虑是否不使用 bower 库引用,因为github中并没有压缩包的 (还是脚本也能解决?)
				// 依赖 Jquery , 必须放 slickgrid 包前 (引用后 angular 的 jQLite 不能使用 )
				'public/components/jquery/dist/jquery.min.js',
				'public/components/slickgrid/lib/jquery.event.drag-2.2.js',
				'public/components/slickgrid/slick.core.js',
				'public/components/slickgrid/slick.grid.js',

				//第三方校验框架 angular-validation
				'public/components/angular-validation/dist/angular-validation.js',
				'public/components/angular-validation/dist/angular-validation-rule.js',

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
		open:{
			css: [
				'public/modules/core/css/*.css',
				'public/modules/user/css/*.css'
			],
			js: [
				'public/modules/config.js',
				'public/modules/application.js',
				'public/modules/core/*.js',
				'public/modules/user/*.js',
				'public/modules/core/*[!tests]*/*.js',
				'public/modules/user/*[!tests]*/*.js'
			]
		},
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
		title: 'Coding Era Studio Admin - 开发模式'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'eae6a961352846d592b3',
		clientSecret: process.env.GITHUB_SECRET || '0ec7bf264ff8a27b98a37c0915909442ad687c67',
		callbackURL: '/auth/github/callback'
	},
	codingera: {

		//apiURL: 'http://192.168.31.139:8080/api',
		//authorizationURL: 'http://192.168.31.139:8080/oauth/authorize',
		//tokenURL: 'http://192.168.31.139:8080/oauth/token',
		//clientID: 'api-client',
		//clientSecret: 'api',
		//callbackURL: "http://192.168.31.139:3000/auth/provider/callback",
		//userInfoURL:"http://192.168.31.139:8080/api/me",
		//logoutURL:"http://192.168.31.139:8080/oauth/logout?next=http://192.168.31.139:3000"

		apiURL: 'http://ws.codingera.com/api',
		authorizationURL: 'http://ws.codingera.com/oauth/authorize',
		tokenURL: 'http://ws.codingera.com/oauth/token',
		clientID: 'api-client',
		clientSecret: 'api',
		callbackURL: "http://192.168.31.139:3000/auth/provider/callback",
		userInfoURL:"http://ws.codingera.com/api/me",
		logoutURL:"http://ws.codingera.com/oauth/logout?next=http://192.168.31.139:3000"

		//test remote api
		//apiURL: 'http://www.codingera.com:8080/api',
		//authorizationURL: 'http://www.codingera.com:8080/oauth/authorize',
		//tokenURL: 'http://www.codingera.com:8080/oauth/token',
		//clientID: 'api-client',
		//clientSecret: 'api',
		//callbackURL: "http://192.168.31.139:3000/auth/provider/callback",
		//userInfoURL:"http://www.codingera.com:8080/api/me",
		//logoutURL:"http://www.codingera.com:8080/oauth/logout?next=http://192.168.31.139:3000"

		//test SSL
		//apiURL: 'https://127.0.0.1:8443/api',
		//authorizationURL: 'https://127.0.0.1:8443/oauth/authorize',
		//tokenURL: 'https://127.0.0.1:8443/oauth/token',
		//clientID: 'api-client',
		//clientSecret: 'api',
		//callbackURL: "http://192.168.31.139:3000/auth/provider/callback",
		//userInfoURL:"https://127.0.0.1:8443/api/me",
		//logoutURL:"https://127.0.0.1:8443/oauth/logout?next=http://192.168.31.139:3000"
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
