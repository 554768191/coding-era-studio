//
//  XBDiscoverViewController.m
//  xbattle-ios
//
//  Created by 王贤 on 16/3/4.
//  Copyright © 2016年 王贤. All rights reserved.
//

#import "XBDiscoverViewController.h"
#import "XBDetailViewController.h"

@interface XBDiscoverViewController ()

@end

@implementation XBDiscoverViewController
- (IBAction)test:(id)sender {
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (IBAction)testClick:(UIButton *)sender {
    
    XBDetailViewController *testCtrl = [XBDetailViewController create];
   // testCtrl.hidesBottomBarWhenPushed = YES;
    [self.navigationController pushViewController:testCtrl animated:YES];
    
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
