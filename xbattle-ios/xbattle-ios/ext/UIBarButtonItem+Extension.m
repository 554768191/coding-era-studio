//
//  UIWindow+Extension.h
//  skyline
//
//  Created by 王贤 on 16/2/22.
//  Copyright © 2016年 王贤. All rights reserved.
//

#import "UIBarButtonItem+Extension.h"

@implementation UIBarButtonItem (Extension)

+ (UIBarButtonItem *)itemWithImageName:(NSString *)imageName highImageName:(NSString *)highImageName target:(id)target action:(SEL)action
{
    UIButton *button = [[UIButton alloc] init];
    UIImage *norImg = [UIImage imageNamed:imageName];
    [button setBackgroundImage:norImg forState:UIControlStateNormal];
    [button setBackgroundImage:[UIImage imageNamed:highImageName] forState:UIControlStateHighlighted];
    
    // 设置按钮的尺寸为背景图片的尺寸
    button.size = button.currentBackgroundImage.size;
    //button.frame = CGRectMake(999, 999, 100, 50);
    //[button sizeThatFits:button.currentBackgroundImage.size];
    
    // 监听按钮点击
    [button addTarget:target action:action forControlEvents:UIControlEventTouchUpInside];
    return [[UIBarButtonItem alloc] initWithCustomView:button];
}

@end
