'use strict';

// Config HTTP Error Handling
angular.module('user').run([
    'Menus',
    function (Menus) {
        var userMenu = Menus.genMenu({
            name:'管理',
            subTitle:'管理后台设置',
            icon:'cog',
            route: 'usersManage',
            secured:'hasPermission("user","read")'
        });
        userMenu.setOrder(99);
        Menus.addMenus(userMenu.getMenus());
    }
]).config(['$provide', '$httpProvider', '$stateProvider',
    function ($provide, $httpProvider, $stateProvider) {

        // Users state routing
        $stateProvider
            // 用户管理
            .state('usersManage', {
                url: '/user',
                templateUrl: 'modules/user/views/user-manage.client.view.html',
                controller: 'usersManageCtrl',
                secured:'hasPermission("user","read")'
            })
            .state('usersManage.list', {
                url: '/list?:status',
                templateUrl: 'modules/user/views/user-list.client.view.html',
                secured:"hasPermission('user','write')"
            })
            .state('usersManage.edit', {
                url: '/edit?:username',
                templateUrl: 'modules/user/views/user-profile.client.view.html',
                controller:'UserProfileController',
                secured:"hasPermission('user','write')"
            })
            // 个人信息
            .state('usersManage.profile', {
                url: '/profile',
                templateUrl: 'modules/user/views/user-profile.client.view.html',
                controller:'UserProfileController'
            })
            // 个人信息 -> 修改头像
            .state('usersManage.avatar', {
                url: '/profile',
                templateUrl: 'modules/user/views/user-profile-avatar-edit.client.view.html',
                controller:'SettingsAvatarController'
            })
            // 用户所属角色管理
            .state('usersManage.roles', {
                url: '/roles/edit?:userId',
                templateUrl: 'modules/user/views/user-roles-edit.client.view.html',
                controller:'userRolesEditCtrl',
                secured:"hasPermission('user','write')"
            })

            // 角色管理
            .state('usersManage.rolesManage', {
                url: '/role',
                templateUrl: 'modules/user/views/permission/user-role-list.client.view.html',
                secured:"hasPermission('user','write')"
            })
            .state('usersManage.rolesManage.edit', {
                url: '/edit?:roleId',
                templateUrl: 'modules/user/views/permission/user-role-edit.client.view.html',
                controller:'userRoleEditCtrl',
                secured:"hasPermission('user','write')"
            })
            .state('usersManage.rolesManage.permissions', {
                url: '/permissions/edit?:roleId',
                templateUrl: 'modules/user/views/permission/user-role-permissions-edit.client.view.html',
                controller:'userRolePermissionsEditCtrl',
                secured:"hasPermission('user','write')"
            })
            // 资源管理
            .state('usersManage.resourcesManage', {
                url: '/resources',
                templateUrl: 'modules/user/views/permission/user-resource-list.client.view.html',
                secured:"hasPermission('user','write')"
            })
            .state('usersManage.resourcesManage.edit', {
                url: '/edit?:resourceId',
                templateUrl: 'modules/user/views/permission/user-resource-edit.client.view.html',
                controller:'userResourceEditCtrl',
                secured:"hasPermission('user','write')"
            })
            // 权限管理
            .state('usersManage.permissionsManage', {
                url: '/permissions',
                templateUrl: 'modules/user/views/permission/user-permission-list.client.view.html',
                secured:"hasPermission('user','write')"
            })
            .state('usersManage.permissionsManage.edit', {
                url: '/edit?:permissionId',
                templateUrl: 'modules/user/views/permission/user-permission-edit.client.view.html',
                controller:'userPermissionEditCtrl',
                secured:"hasPermission('user','write')"
            })

            // 重置密码
            .state('usersManage.resetPassword', {
                url: '/password/reset/:token',
                templateUrl: '/modules/user/views/user-reset-password.client.view.html',
                controller:'PasswordController',
                secured:"hasPermission('user','write')"
            })

            //公众页面 重置密码
            .state('resetPassword', {
                url: '/password/reset/:token',
                templateUrl: '/modules/user/views/open/user-reset-password.client.view.html',
                controller:'OpenPasswordController'
            });
    }
]);