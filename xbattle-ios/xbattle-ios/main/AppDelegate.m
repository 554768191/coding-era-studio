//
//  AppDelegate.m
//  xbattle-ios
//
//  Created by 王贤 on 16/3/4.
//  Copyright © 2016年 王贤. All rights reserved.
//

#import "AppDelegate.h"
#import "XBTabBarViewController.h"

@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    
    XBTabBarViewController *tabCtrl = [[XBTabBarViewController alloc] init];
    
    
    
    self.window.rootViewController = tabCtrl;
    
    [self.window makeKeyAndVisible];
    
    return YES;
}


@end
