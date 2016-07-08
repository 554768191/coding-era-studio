# Coding Era编码时代(WEB)

*首先看这个*
[git完美教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)
## Remark部分网址
### angular1.48文档
[https://code.angularjs.org/1.4.8/docs/guide](https://code.angularjs.org/1.4.8/docs/guide)
### angular-bootstarp api
[http://angular-ui.github.io/bootstrap/](http://angular-ui.github.io/bootstrap/)
### angular-ui
[http://angular-ui.github.io/](http://angular-ui.github.io/)
### ui-grid
[http://ui-grid.info/](http://ui-grid.info/)
#### ui-grid-api
[http://ui-grid.info/docs/#/api](http://ui-grid.info/docs/#/api)
### ui-router
[http://angular-ui.github.io/ui-router/site/#/api/ui.router](http://angular-ui.github.io/ui-router/site/#/api/ui.router)
### angular-translate(国际化API)
[https://angular-translate.github.io/docs/#/api/pascalprecht.translate.filter:translate](https://angular-translate.github.io/docs/#/api/pascalprecht.translate.filter:translate)
### lodash
[https://lodash.com/docs#replace](https://lodash.com/docs#replace)

## 初始化项目
## 1.安装NPM
    ```
    Mac
    nodejs版本管理器
    >brew install -g nvm
    >nvm ls-remote
    >nvm install [nodejs version]
    切换npm下载源
    >npm install -g nrm
    >nrm list
    >nrm use taobao
    ```

## 2.安装NPM所需的包
    ```
    $ cd /your/fucking/project
    $ npm install
    ```

## 3.运行项目
    ```
    $ cd /your/fucking/project
    $ gulp
    //如果执行gulp时sass报错:npm rebuild node-sass
    ```

## 4.生产
    执行命令 gulp prod 生成dist文件

    app目录:
    上传CodingEraAdmin/app所有
    config目录:
    不要CodingEraAdmin/config/env下的development.js和test.js
    不要CodingEraAdmin/config/gulp
    public目录:
    上传CodingEraAdmin/public/dist所有
    创建空文件夹modules,将dist/html下全部文件移到modules下
    其他:
    不要test目录
    不要gulpfile.js

    $ npm install --production
    $ bower install -allow-root

    $ NODE_ENV=production node server.js &
    注意:
    当api服务器使用的是未认证的https时,可能会获取不到token,这时候要加上参数:
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
    // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

## 调试
    基于webstorm调试nodejs
    点击右上角倒三角标识 > edit configuration > 点击+号新增一个nodejs server > 接下来各种配置:
    Node interperter:选择合适的nodejs版本,如/Users/JasonWoo/.nvm/versions/node/v5.7.1/bin/node
    working directory:当前项目的目录
    JavaScript file:package.json配置的启动文件,如server.js
    environment variables:NODE_ENV=development;NODE_TLS_REJECT_UNAUTHORIZED=0

    前端使用chrome调试
    不解释

## npm脚本
    ### npm scripts
    "scripts": {
        "start": "NODE_ENV=production node index.js &",
        "intall-prod":"echo \"npm install --production\"",
        "test": "echo \"Error: no test specified\" && exit 1"
      }
   使用npm scripts可以自定义简单指令:
   如上面的"intall-prod"就是自定义的,使用自定义指令方法:# npm run intall-prod
   "start"是node默认就有的指令,当然也可以像上面一样覆盖,使用的时候简单的:# npm start 就行.

   ### npm install
   生产上执行需要带上参数--production,如# npm install --production
   这样就下载package.json的全部依赖,只会下载dependencies的依赖

## ceAdmin权限指令
    ### 1.UI控件显示控制
    #### 1.1 指令控制
        <li ce-secured="hasPermission('article','read')">1111</li>
        <li ce-secured="!hasPermission('article','read')">2222</li>

    #### 1.2目录显示控制
        angular.module('demo')
        .run(['Menus',
        function(Menus) {
        //DEMO
        var demoMenu=Menus.genMenu({name:'DEMO',subTitle:'Coding Era Studio 各种指令展示',icon:'sunglasses',
        roles:'JASON',
        //secured:"hasPermission('article','read')",
        //secured:"hasRole('JASON')",
        route:'demoManage'});
        demoMenu.setOrder(9999);
        Menus.addMenus(demoMenu.getMenus());
        }
        ])；

    ### 2. 路由上的权限访问控制
        $stateProvider
        .state('usersManage', {
        url: '/user',
        templateUrl: 'modules/user/views/user-manage.client.view.html',
        controller: 'usersManageCtrl',
        secured:"hasPermission('article','read')"
        })

>参看：http://www.open-open.com/lib/view/open1408084201582.html

    ### 3.代码判断
        var hasPermission = Authentication.checkPermission(expression);
        if(hasPermission){
            element.show();
        }else{
            element.remove();
        }
        权限判断的代码都统一在core-authentication.client.service.js管理

## 指令
    ### 返回按钮指令
    如果是弹窗的会就会关闭弹窗
    如果是ui-view的话就是返回上一页
    用法:<button class="btn btn-default" type="button" ce-on-cancel-click>确定</button>

## 参考

>END
