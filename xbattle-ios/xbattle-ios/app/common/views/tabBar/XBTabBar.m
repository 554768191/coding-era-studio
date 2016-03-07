//
//  XBTabBar.m
//  xbattle-ios
//
//  Created by 王贤 on 16/3/4.
//  Copyright © 2016年 王贤. All rights reserved.
//

#import "XBTabBar.h"
#import "XBTabBarButton.h"

@interface XBTabBar()

@property (nonatomic,strong) NSArray *btnArray;

@end

@implementation XBTabBar

- (NSArray *)btnArray{
    if(_btnArray == nil){
        //首页Btn
        XBTabBarButton *homeBtn = [XBTabBarButton createButtonWithTitle:@"推荐" normalImage:@"tab_home_unsel" seltedImage:@"tab_home_sel"];
        //发现btn
        XBTabBarButton *discoverBtn = [XBTabBarButton createButtonWithTitle:@"发现" normalImage:@"tab_discover_unsel" seltedImage:@"tab_discover_sel"];
        //挑战btn
        XBTabBarButton *battleBtn = [XBTabBarButton createButtonWithTitle:nil normalImage:@"tab_battle" seltedImage:nil];
        battleBtn.backgroundColor = XB_HIGHLIGHTED_COLOR;
        
        //我btn
        XBTabBarButton *meBtn = [XBTabBarButton createButtonWithTitle:@"我" normalImage:@"tab_me_unsel" seltedImage:@"tab_me_sel"];
        
        //设置btn
        XBTabBarButton *settingBtn = [XBTabBarButton createButtonWithTitle:@"设置" normalImage:@"tab_setting_unsel" seltedImage:@"tab_setting_sel"];
        
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
        XBTabBarButton *btn = self.btnArray[i];
        btn.tag = i;
        [btn addTarget:self action:@selector(onButtonClick:) forControlEvents:UIControlEventTouchUpInside];
        if(i == 0){
            [self onButtonClick:btn];
        }
        [self addSubview:btn];
    }
    
}


- (void) onButtonClick:(UIButton *) currentButton{
    
    if( [self.xbTabbardelegate respondsToSelector:@selector(XBTabbar:clickButton:)] ){
        [self.xbTabbardelegate XBTabbar:self clickButton:currentButton];
    }
    
    for (UIButton *btn in self.btnArray){
        btn.selected = NO;
    }
    currentButton.selected = YES;
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
