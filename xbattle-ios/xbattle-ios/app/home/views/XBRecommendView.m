//
//  XBRecommendView.m
//  xbattle-ios
//
//  Created by 王贤 on 16/3/7.
//  Copyright © 2016年 王贤. All rights reserved.
//

#import "XBRecommendView.h"
#import "XBRecomendModel.h"
@interface XBRecommendView()<UIScrollViewDelegate>

@property (weak, nonatomic) IBOutlet UIScrollView *scrollView;

@end

@implementation XBRecommendView
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.layer.cornerRadius = 2;
        self.layer.masksToBounds = YES;
        self = [XBRecommendView loadFromNib];
        self.scrollView.pagingEnabled = YES;
        self.scrollView.showsHorizontalScrollIndicator = NO;
        self.scrollView.delegate = self;
        self.scrollView.layer.cornerRadius = 2;
        self.scrollView.layer.masksToBounds = YES;
        
        

    }
    return self;
}



- (void)setRecomendArray:(NSArray *)recomendArray{
    _recomendArray = recomendArray;
    
    [self settingScrollImage];
    
}

- (void) settingScrollImage{
    self.scrollView.frame = self.frame;
    CGFloat viewWidth = self.frame.size.width;
    NSUInteger count = self.recomendArray.count;
    self.scrollView.contentSize = CGSizeMake(viewWidth * count, 0);
    CGFloat imgW = self.scrollView.frame.size.width;
    CGFloat imgH = self.scrollView.frame.size.height;
    CGFloat imgY = 0;
    NSLog(@"imgW=%f",imgW);
    for (int i = 0 ; i < count ; i ++){
        UIImageView *img = [[UIImageView alloc]init];
        XBRecomendModel *recomend = self.recomendArray[i];
        NSString *imgName = recomend.imageUrl;
        [img setImage:[UIImage imageNamed:imgName]];
        img.frame = CGRectMake(imgW * i, imgY, imgW, imgH);
        img.contentMode = UIViewContentModeScaleToFill;
        [self.scrollView addSubview:img];
    }
}

@end
