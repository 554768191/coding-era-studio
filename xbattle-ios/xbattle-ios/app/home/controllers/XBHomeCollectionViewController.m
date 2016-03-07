//
//  XBHomeCollectionViewController.m
//  xbattle-ios
//
//  Created by 王贤 on 16/3/6.
//  Copyright © 2016年 王贤. All rights reserved.
//

#import "XBHomeCollectionViewController.h"
#import "XBHomeCollectionViewCell.h"
#import "XBRecommendView.h"
#import "XBRecomendModel.h"

@interface XBHomeCollectionViewController ()

@property (nonatomic,strong) XBRecommendView *recommendView;

@end

@implementation XBHomeCollectionViewController

static NSString * const reuseIdentifier = @"homeCell";

static CGFloat const commendHeight = 150;

- (void)viewDidLoad {
    [super viewDidLoad];
    
    //初始化头部推荐
    [self initRecomendView];
    
    //初始化collectionView
    [self initCollectionView];
  
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    
}


- (void) initRecomendView{
   // self.recommendView = [XBRecommendView loadFromNib];
    self.recommendView = [[XBRecommendView alloc]init];
    self.recommendView.frame = CGRectMake(10, 10, XB_DeviceWidth-20, commendHeight);
    NSMutableArray *images = [NSMutableArray array];
    for(int i = 0; i < 5 ; i++){
        XBRecomendModel *recomend = [[XBRecomendModel alloc] init];
        recomend.imageUrl = @"dali";
        [images addObject:recomend];
    }
    self.recommendView.recomendArray = images;
}

#pragma mark - initCollectionView
- (void) initCollectionView{
    
    UICollectionViewFlowLayout *flowLayout=[[UICollectionViewFlowLayout alloc] init];
    [flowLayout setScrollDirection:UICollectionViewScrollDirectionVertical];
    flowLayout.headerReferenceSize = CGSizeMake(XB_DeviceWidth-20, commendHeight+20);//头部
    [self.collectionView setCollectionViewLayout:flowLayout];
    
    
    [self.collectionView registerClass:[XBHomeCollectionViewCell class] forCellWithReuseIdentifier:reuseIdentifier];
    
    [self.collectionView registerClass:[UICollectionReusableView class] forSupplementaryViewOfKind:UICollectionElementKindSectionHeader withReuseIdentifier:@"ReusableView"];
}





- (NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView {

    return 1;
}


- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section {

    return 6;
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    XBHomeCollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:reuseIdentifier forIndexPath:indexPath];
    
    return cell;
}

#pragma mark - 头部显示的内容
- (UICollectionReusableView *)collectionView:(UICollectionView *)collectionView viewForSupplementaryElementOfKind:(NSString *)kind atIndexPath:(NSIndexPath *)indexPath {
    
    UICollectionReusableView *headerView = [collectionView dequeueReusableSupplementaryViewOfKind:
                                            UICollectionElementKindSectionHeader withReuseIdentifier:@"ReusableView" forIndexPath:indexPath];
    
    [headerView addSubview:self.recommendView];//头部广告栏
    return headerView;
}

#pragma mark - 定义每个collectionView大小
- (CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout*)collectionViewLayout sizeForItemAtIndexPath:(NSIndexPath *)indexPath
{
    
    return CGSizeMake((XB_DeviceWidth)/2 - 15, 150);
}

#pragma mark - 定义每个UICollectionView 的间距
-(UIEdgeInsets)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout insetForSectionAtIndex:(NSInteger)section
{
    NSLog(@"%ld",section);
    
    return UIEdgeInsetsMake(0, 10, 10, 10);
}

//UICollectionView被选中时调用的方法
-(void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath
{
    //    UICollectionViewCell * cell = (UICollectionViewCell *)[collectionView cellForItemAtIndexPath:indexPath];
    //    cell.backgroundColor = [UIColor redColor];
    NSLog(@"选择%ld",indexPath.row);
}

//collectionView是否可以被选中
-(BOOL)collectionView:(UICollectionView *)collectionView shouldSelectItemAtIndexPath:(NSIndexPath *)indexPath
{
    return YES;
}


#pragma mark <UICollectionViewDelegate>

/*
// Uncomment this method to specify if the specified item should be highlighted during tracking
- (BOOL)collectionView:(UICollectionView *)collectionView shouldHighlightItemAtIndexPath:(NSIndexPath *)indexPath {
	return YES;
}
*/

/*
// Uncomment this method to specify if the specified item should be selected
- (BOOL)collectionView:(UICollectionView *)collectionView shouldSelectItemAtIndexPath:(NSIndexPath *)indexPath {
    return YES;
}
*/

/*
// Uncomment these methods to specify if an action menu should be displayed for the specified item, and react to actions performed on the item
- (BOOL)collectionView:(UICollectionView *)collectionView shouldShowMenuForItemAtIndexPath:(NSIndexPath *)indexPath {
	return NO;
}

- (BOOL)collectionView:(UICollectionView *)collectionView canPerformAction:(SEL)action forItemAtIndexPath:(NSIndexPath *)indexPath withSender:(id)sender {
	return NO;
}

- (void)collectionView:(UICollectionView *)collectionView performAction:(SEL)action forItemAtIndexPath:(NSIndexPath *)indexPath withSender:(id)sender {
	
}
*/

@end
