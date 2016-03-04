//
//  UIWindow+Extension.h
//  skyline
//
//  Created by 王贤 on 16/2/22.
//  Copyright © 2016年 王贤. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface UIViewController(Create)

+ (id)create;

+ (id)createFromStoryboardName:(NSString *)name withIdentifier:(NSString *)identifier;

@end
