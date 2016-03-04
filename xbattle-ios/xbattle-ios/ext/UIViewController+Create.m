//
//  UIWindow+Extension.h
//  skyline
//
//  Created by 王贤 on 16/2/22.
//  Copyright © 2016年 王贤. All rights reserved.
//

#import "UIViewController+Create.h"
#import "UIStoryboard+Addition.h"

@implementation UIViewController(Create)

+ (id)create
{
    NSString *className = NSStringFromClass([self class]);
    id newObj = [[UIStoryboard fromName:className] instantiateInitialViewController];
    return newObj;
}

+ (id)createFromStoryboardName:(NSString *)name withIdentifier:(NSString *)identifier;
{
    if (name && identifier) {
        UIStoryboard *storyboard = [UIStoryboard fromName:name];
        
        return [storyboard instantiateViewControllerWithIdentifier:identifier];
        
    }
    return nil;
}

@end
