//
//  XBTabBar.m
//  xbattle-ios
//
//  Created by 王贤 on 16/3/4.
//  Copyright © 2016年 王贤. All rights reserved.
//

#import "XBTabBar.h"

@interface XBTabBar()

@property (nonatomic,strong) NSArray *btnArray;

@end

@implementation XBTabBar

- (NSArray *)btnArray{
    if(_btnArray == nil){
        //首页Btn
        UIButton *homeBtn = [self createButtonWithTitle:@"首页" normalImage:@"tab_home_unsel" seltedImage:@"tab_home_sel"];
        //发现btn
        UIButton *discoverBtn = [self createButtonWithTitle:@"发现" normalImage:@"tab_discover_unsel" seltedImage:@"tab_discover_sel"];
        //挑战btn
        UIButton *battleBtn = [self createButtonWithTitle:nil normalImage:@"tab_battle" seltedImage:nil];
        battleBtn.backgroundColor = XB_HIGHLIGHTED_COLOR;
        
        //我btn
        UIButton *meBtn = [self createButtonWithTitle:@"我" normalImage:@"tab_me_unsel" seltedImage:@"tab_me_sel"];
        
        //设置btn
        UIButton *settingBtn = [self createButtonWithTitle:@"设置" normalImage:@"tab_setting_unsel" seltedImage:@"tab_setting_sel"];
        
        _btnArray = @[homeBtn,discoverBtn,battleBtn,meBtn,settingBtn];
    }
    return _btnArray;
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        [self setTabBarButton];
    }
    return self;
}

- (instancetype)initWithCoder:(NSCoder *)coder
{
    self = [super initWithCoder:coder];
    if (self) {
        [self setTabBarButton];
    }
    return self;
}

- (void) setTabBarButton{
    
    for (int i = 0; i < self.btnArray.count ; i++){
        [self addSubview:self.btnArray[i]];
    }
    
    
    
}

#pragma mark - 创建按钮
- (UIButton *) createButtonWithTitle:(NSString *) title normalImage:(NSString *) normalImage seltedImage:(NSString *) seltedImage{
    UIButton *btn = [UIButton buttonWithType:UIButtonTypeCustom];
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
    [btn setBackgroundColor:[UIColor colorWithRed:0.13 green:0.16 blue:0.22 alpha:1]];
    return btn;
}

- (void)layoutSubviews{
    [super layoutSubviews];
    NSUInteger count = self.btnArray.count;
    for( int i = 0 ; i < count ; i++){
        UIButton *btn = self.btnArray[i];
        CGFloat btnW = self.frame.size.width/count;
        CGFloat btnH = self.frame.size.height;
        CGFloat btnX = (i * btnW);
        CGFloat btnY = 0;
        btn.frame = CGRectMake(btnX, btnY, btnW, btnH);
        [btn centerImageAndTitle:5];
    }
}



@end
