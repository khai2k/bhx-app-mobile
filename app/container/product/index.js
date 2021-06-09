import React, { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, ActivityIndicator, SafeAreaView, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { Header, LoadingCart } from '@app/components';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as homeCreator from '@app/redux/actions/homeAction';
import ListCategoriesView from './ListCategories';
import ListLineTitle from './ListLineTitle';
import RenderLine from './RenderLine';
import styles from './style';

const Product = () => {
    const scrollList = createRef();
    const dispatch = useDispatch();
    const actionHome = bindActionCreators(homeCreator, dispatch);

    const [isLoadingAPI, setIsLoadingAPI] = useState(false);
    const [firstLoading, setFirstLoading] = useState(true);
    const [cateIndexSelected, setCateIndexSelected] = useState(0);
    const [isShowCatelines, setIsShowCatelines] = useState(false);

    const homeData = useSelector((state) => state.homeReducer);
    const {
        IsNextGroup,
        PageIndexLine,
        ListCategories,
        CateLines,
        ListLineProducts
    } = homeData;

    const locationInfo = useSelector(
        (state) => state.locationReducer.Location.LocationInfo
    );

    useEffect(async () => {
        setFirstLoading(true);
        setCateIndexSelected(0);
        setIsShowCatelines(false);
        await actionHome.fetchAll();
        setFirstLoading(false);
    }, [locationInfo]);

    const handleScroll = (event) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        // Show list cate thường mua khi scroll top
        if (scrollY === 0) {
            setIsShowCatelines(false);
        } else if (!isShowCatelines) {
            setIsShowCatelines(true);
        }

        // Lúc scroll thì lấy tiếp các line sau
        if (IsNextGroup && !isLoadingAPI) {
            setIsLoadingAPI(true);
            actionHome
                .loadMoreHomeData(PageIndexLine)
                .then((response) => {
                    setIsLoadingAPI(false);
                })
                .catch((error) => {
                    setIsLoadingAPI(false);
                    console.log(error);
                });
        }
    };

    const scrollToLine = (lineIndex) => {
        scrollList.current.scrollToIndex({
            animated: true,
            index: lineIndex
        });
        setCateIndexSelected(lineIndex);
    };

    const onViewRef = React.useRef((viewableItems) => {
        setCateIndexSelected(viewableItems.changed[0].index);
    });
    const viewConfigRef = React.useRef({
        viewAreaCoveragePercentThreshold: 90
    });

    if (firstLoading) {
        return (
            <View
                style={{
                    backgroundColor: Colors.WHITE
                }}>
                <Header />
                <LoadingCart />
                <LoadingCart />
                <LoadingCart />
                <LoadingCart />
            </View>
        );
    } else {
        return (
            <View>
                <Header />
                {!isShowCatelines && (
                    <ListCategoriesView listCate={ListCategories} />
                )}
                {isShowCatelines && (
                    <ListLineTitle
                        listCate={CateLines}
                        scrollToLine={scrollToLine}
                        selectedIndex={cateIndexSelected}
                    />
                )}
                <FlatList
                        ref={scrollList}
                        style={styles.body}
                        onScroll={handleScroll}
                        data={ListLineProducts}
                        keyExtractor={(item) => item.CategoryId}
                        onViewableItemsChanged={onViewRef.current}
                        viewabilityConfig={viewConfigRef.current}
                        renderItem={({ item, index }) => (
                            <RenderLine
                                key={`line_${item.CategoryId}`}
                                lineItem={item}
                            />
                        )}>
                        <ActivityIndicator animating size="large" color="#008848" />
                    </FlatList>
                <SafeAreaView edges={['bottom']}>
                    
                </SafeAreaView>
            </View>
        );
    }
};
export default React.memo(Product);
