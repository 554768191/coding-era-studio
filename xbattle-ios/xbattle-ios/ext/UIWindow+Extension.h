//
//  UIWindow+Extension.h
//  skyline
//
//  Created by 王贤 on 16/2/22.
//  Copyright © 2016年 王贤. All rights reserved.
//

#import <UIKit/UIKit.h>
#include "RESideMenu.h"
@interface UIWindow (Extension)<RESideMenuDelegate>

- (void) chooseRootViewController;
@end
