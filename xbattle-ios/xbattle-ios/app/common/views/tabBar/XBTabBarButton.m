//
//  XBTabBarButton.m
//  xbattle-ios
//
//  Created by 王贤 on 16/3/6.
//  Copyright © 2016年 王贤. All rights reserved.
//

#import "XBTabBarButton.h"

@implementation XBTabBarButton

- (void)setHighlighted:(BOOL)highlighted{
    //[self setHighlighted:highlighted];
}


+ (instancetype) createButtonWithTitle:(NSString *) title normalImage:(NSString *) normalImage seltedImage:(NSString *) seltedImage{
    XBTabBarButton *btn = [XBTabBarButton buttonWithType:UIButtonTypeCustom];
    [btn setTitle:title forState:UIControlStateNormal];
    if (normalImage != nil){
        UIImage *normalImg = [UIImage imageNamed:normalImage];
        [btn setImage:normalImg forState:UIControlStateNormal];
    }
    
    if(seltedImage != nil){
        UIImage *seltedImg = [UIImage imageNamed:seltedImage];
        [btn setImage:seltedImg forState:UIControlStateSelected];
    }
    btn.titleLabel.font = [UIFont systemFontOfSize: 12.0];
    [btn setTitleColor:XB_HIGHLIGHTED_COLOR forState:UIControlStateSelected];
    UIColor *normalColor = [UIColor colorWithRed:0.66 green:0.68 blue:0.69 alpha:1];
    [btn setTitleColor:normalColor forState:UIControlStateNormal];
    [btn setBackgroundColor:XB_DARK_COLOR];
    return btn;
}

@end
