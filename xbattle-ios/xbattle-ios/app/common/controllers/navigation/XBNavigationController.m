//
//  XBNavigationController.m
//  xbattle-ios
//
//  Created by 王贤 on 16/3/4.
//  Copyright © 2016年 王贤. All rights reserved.
//

#import "XBNavigationController.h"

@interface XBNavigationController ()

@end

@implementation XBNavigationController

- (void)viewDidLoad {
    [super viewDidLoad];

}

-(UIStatusBarStyle)preferredStatusBarStyle{
    return UIStatusBarStyleLightContent;
}

+ (void)initialize
{
    // 设置UINavigationBarTheme的主题
    [self setupNavigationBarTheme];
    
    // 设置UIBarButtonItem的主题
   // [self setupBarButtonItemTheme];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


+ (void)setupNavigationBarTheme
{
    UINavigationBar *appearance = [UINavigationBar appearance];
    
    // 设置导航栏背景
    [appearance setBarTintColor:XB_DARK_COLOR];
    
    // 设置文字属性
    NSMutableDictionary *textAttrs = [NSMutableDictionary dictionary];
    textAttrs[NSForegroundColorAttributeName] = [UIColor whiteColor];
    // UITextAttributeFont --> NSFontAttributeName(iOS7)
    textAttrs[NSFontAttributeName] = [UIFont systemFontOfSize:17];
    // UIOffsetZero是结构体, 只要包装成NSValue对象, 才能放进字典\数组中
    //    textAttrs[NSShadowAttributeName] = [NSValue valueWithUIOffset:UIOffsetZero];
    [appearance setTitleTextAttributes:textAttrs];
}

/**
 *  能拦截所有push进来的子控制器
 */
- (void)pushViewController:(UIViewController *)viewController animated:(BOOL)animated
{
    if (self.viewControllers.count > 0) { // 如果现在push的不是栈底控制器(最先push进来的那个控制器)
        viewController.hidesBottomBarWhenPushed = YES;
        
        // 设置导航栏按钮
        viewController.navigationItem.leftBarButtonItem = [UIBarButtonItem itemWithImageName:@"navi_back" highImageName:@"navi_back_high" target:self action:@selector(back)];
    }
    
 
    
    [super pushViewController:viewController animated:animated];
}


- (void)back
{
    [self popViewControllerAnimated:YES];
}

@end
