//
//  XBTabBarViewController.m
//  xbattle-ios
//
//  Created by 王贤 on 16/3/4.
//  Copyright © 2016年 王贤. All rights reserved.
//

#import "XBTabBarViewController.h"
#import "XBHomeCollectionViewController.h"
#import "XBDiscoverViewController.h"
#import "XBNavigationController.h"
#import "XBBattleViewController.h"
#import "XBMeTableViewController.h"
#import "XBSettingTableViewController.h"
#import "XBTabBar.h"

@interface XBTabBarViewController ()<XBTabBarDelegate>

@end

@implementation XBTabBarViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    //设置自定义tabbar
    [self setTabBar];
    
    
    [self setTabBarChildView];

}

- (void) viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];
    for(UIView *view in self.tabBar.subviews){
        if(![view isKindOfClass:[XBTabBar class]]){
            [view removeFromSuperview];
        }
    }
}

- (void)setTabBar{
    XBTabBar *tabBar = [[XBTabBar alloc]init];
    tabBar.frame = self.tabBar.bounds;
    tabBar.xbTabbardelegate = self;
    //self.tabBar = tabBar;
    [self.tabBar addSubview:tabBar];
    
    
    //删除?
    //[self.tabBar removeFromSuperview];
}

- (void)XBTabbar:(XBTabBar *)tabBar clickButton:(UIButton *)button{
    self.selectedIndex = button.tag;
}


#pragma mark - 设置tabBarButton
- (void) setTabBarChildView{

    
    //首页
    XBHomeCollectionViewController *homeViewCtrl = [XBHomeCollectionViewController create];
    XBNavigationController *homeNavigationCtrl = [[XBNavigationController alloc]initWithRootViewController:homeViewCtrl];
    homeViewCtrl.title=@"推荐";
    [self addChildViewController:homeNavigationCtrl];
    
    //发现
    XBDiscoverViewController *discoverViewCtrl = [XBDiscoverViewController create];
    XBNavigationController *discoverNavigationCtrl = [[XBNavigationController alloc]initWithRootViewController:discoverViewCtrl];
    discoverViewCtrl.title = @"发现";
    [self addChildViewController:discoverNavigationCtrl];
    
    
    //挑战
    XBBattleViewController *battleViewCtrl = [XBBattleViewController create];
    [self addChildViewController:battleViewCtrl];

    
    //我
    XBMeTableViewController *meViewCtrl = [XBMeTableViewController create];
    XBNavigationController *meNavigationCtrl = [[XBNavigationController alloc]initWithRootViewController:meViewCtrl];
    meViewCtrl.title = @"我";
    [self addChildViewController:meNavigationCtrl];
    
    
    //设置
    XBSettingTableViewController *settingViewCtrl = [XBSettingTableViewController create];
    XBNavigationController *settingNavigationCtrl = [[XBNavigationController alloc]initWithRootViewController:settingViewCtrl];
    settingViewCtrl.title = @"设置";
    [self addChildViewController:settingNavigationCtrl];
    
    
}



@end
