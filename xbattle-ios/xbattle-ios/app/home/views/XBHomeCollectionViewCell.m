//
//  XBHomeCollectionViewCell.m
//  xbattle-ios
//
//  Created by 王贤 on 16/3/6.
//  Copyright © 2016年 王贤. All rights reserved.
//

#import "XBHomeCollectionViewCell.h"

@interface XBHomeCollectionViewCell()

@property (weak, nonatomic) IBOutlet UIButton *likedsBtn;
@property (weak, nonatomic) IBOutlet UIButton *palysBtn;
@property (weak, nonatomic) IBOutlet UILabel *titleLbl;


@end

@implementation XBHomeCollectionViewCell

- (void)awakeFromNib {
    // Initialization code
}

- (void)setVideo:(XBVideoModel *)video{
    _video = video;
    
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        self = [XBHomeCollectionViewCell loadFromNib];
        self.layer.cornerRadius = 2;
        self.layer.masksToBounds = YES;
        
    }
    return self;
}

- (void)layoutSubviews{
    [super layoutSubviews];
    
    //self.layer.masksToBounds = YES;
  
}


@end
