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

@interface XBTabBarViewController ()

@end

@implementation XBTabBarViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    
    //首页
    XBHomeTableViewController *homeViewCtrl = [XBHomeTableViewController create];
    XBNavigationController *homeNavigationCtrl = [[XBNavigationController alloc]initWithRootViewController:homeViewCtrl];
    
    [homeNavigationCtrl.tabBarItem setTitle:@"首页"];
    UITabBarItem *homeTabBarItem = [[UITabBarItem alloc] init];

    [self addChildViewController:homeNavigationCtrl];
    
    //发现
    UINavigationController *discoverViewCtrl = [XBDiscoverViewController create];
    XBNavigationController *discoverNavigationCtrl = [[XBNavigationController alloc]initWithRootViewController:discoverViewCtrl];
    [discoverNavigationCtrl.tabBarItem setTitle:@"发现"];
    [self addChildViewController:discoverNavigationCtrl];
    

}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}



@end
