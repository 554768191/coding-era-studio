//
//  XBTabBarViewController.m
//  xbattle-ios
//
//  Created by 王贤 on 16/3/4.
//  Copyright © 2016年 王贤. All rights reserved.
//

#import "XBTabBarViewController.h"
#import "XBHomeTableViewController.h"
#import "XBDiscoverViewController.h"
#import "XBNavigationController.h"
#import "XBBattleViewController.h"
#import "XBMeTableViewController.h"
#import "XBSettingTableViewController.h"
#import "XBTabBar.h"

@interface XBTabBarViewController ()

@end

@implementation XBTabBarViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    //设置自定义tabbar
    [self setTabBar];
    
    //这是tabbar上的按钮
   // [self setTabBarButton];

}

- (void)setTabBar{
    XBTabBar *tabBar = [[XBTabBar alloc]init];
    tabBar.frame = self.tabBar.frame;
    
    //self.tabBar = tabBar;
    [self.view addSubview:tabBar];
    
    //删除?
    [self.tabBar removeFromSuperview];
}


#pragma mark - 设置tabBarButton
- (void) setTabBarButton{

//    UITabBar *tabar = self.tabBar;
//    
//    [tabar setTintColor:[UIColor colorWithRed:0.93 green:0.3 blue:0.35 alpha:1]];
//    // 两个同时设置，去除黑线
//    tabar.backgroundColor = [UIColor colorWithRed:0.13 green:0.16 blue:0.22 alpha:1];
//    tabar.backgroundImage = [UIImage new];
//    tabar.shadowImage = [UIImage new];
    
    //首页
    XBHomeTableViewController *homeViewCtrl = [XBHomeTableViewController create];
    XBNavigationController *homeNavigationCtrl = [[XBNavigationController alloc]initWithRootViewController:homeViewCtrl];
    [self addChildViewController:homeNavigationCtrl];
    
    //发现
    XBDiscoverViewController *discoverViewCtrl = [XBDiscoverViewController create];
    XBNavigationController *discoverNavigationCtrl = [[XBNavigationController alloc]initWithRootViewController:discoverViewCtrl];
    [self addChildViewController:discoverNavigationCtrl];
    
    
    //挑战
    XBBattleViewController *battleViewCtrl = [XBBattleViewController create];
    [self addChildViewController:battleViewCtrl];

    
    //我
    XBMeTableViewController *meViewCtrl = [XBMeTableViewController create];
    XBNavigationController *meNavigationCtrl = [[XBNavigationController alloc]initWithRootViewController:meViewCtrl];
    [self addChildViewController:meNavigationCtrl];
    
    
    //设置
    XBSettingTableViewController *settingViewCtrl = [XBSettingTableViewController create];
    XBNavigationController *settingNavigationCtrl = [[XBNavigationController alloc]initWithRootViewController:settingViewCtrl];
    [self addChildViewController:settingNavigationCtrl];
    
    
}



@end
