//
//  XBTabBar.h
//  xbattle-ios
//
//  Created by 王贤 on 16/3/4.
//  Copyright © 2016年 王贤. All rights reserved.
//

#import <UIKit/UIKit.h>
@class XBTabBar;

@protocol XBTabBarDelegate <NSObject>

- (void)XBTabbar:(XBTabBar *) tabBar clickButton:(UIButton *) button;

@end

@interface XBTabBar : UITabBar

@property (nonatomic,weak) id<XBTabBarDelegate> xbTabbardelegate;

@end
