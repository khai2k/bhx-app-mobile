import React, { Component, createRef } from 'react'
import {
    Dimensions,
    View,
    Text,
    Image,
    UIManager,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Modal,
    StatusBar,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
// import Carousel from 'react-native-snap-carousel'

const THUMB_SIZE = 50;
const { width, height } = Dimensions.get('window');
const IMG_HEIGHT = width * 0.75;
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
export default class ProductGallery extends Component {
    silderRef = createRef();

    galleryRef = createRef();

    thumbRef = createRef();

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    uri:
                        'https://cdn.tgdd.vn/Products/Images/2282/88223/bhx/thung-24-chai-budweiser-330ml-202103162327047901.jpg'
                },
                {
                    uri:
                        'https://cdn.tgdd.vn/Products/Images/2282/88223/bhx/thung-24-chai-budweiser-330ml-201905281438314972.jpg'
                },
                {
                    uri:
                        'https://cdn.tgdd.vn/Products/Images/2282/88223/bhx/thung-24-chai-budweiser-330ml-201905281439182449.jpg'
                },
                {
                    uri:
                        'https://cdn.tgdd.vn/Products/Images/2282/88223/bhx/thung-24-chai-budweiser-330ml-201905281439185091.jpg'
                },
                {
                    uri:
                        'https://cdn.tgdd.vn/Products/Images/2282/193600/bhx/thung-24-lon-strongbow-dau-den-330ml-202103162237023532.jpg'
                },
                {
                    uri:
                        'https://cdn.tgdd.vn/Products/Images/2282/193600/bhx/nuoc-ep-len-men-strongbow-dark-fruit-thung-24-lon-1511201815836.jpg'
                },
                {
                    uri:
                        'https://cdn.tgdd.vn/Products/Images/2282/193600/bhx/nuoc-ep-len-men-strongbow-dark-fruit-thung-24-lon-1511201815843.jpg'
                },
                {
                    uri:
                        'https://cdn.tgdd.vn/Products/Images/2282/193600/bhx/thung-24-lon-strongbow-dau-den-330ml-201905221021440177.jpg'
                }
            ],
            crrImgIdx: 0,
            isShowModal: false,
            crrThumb: 0,
            isShowFromSlider: false
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    render() {
        const { data, crrImgIdx, isShowModal } = this.state;
        const DATA_IMAGES_LENGTH = data.length;

        return (
            <ScrollView style={{ width: width, marginTop: STATUSBAR_HEIGHT }}>
                <View>
                    <View>
                        <FlatList
                            ref={this.silderRef}
                            style={{ width: width, height: IMG_HEIGHT }}
                            snapToInterval={width}
                            bounces={false}
                            decelerationRate='fast'
                            viewAbilityConfig={{
                                viewAreaCoveragePercentThreshold: 50
                            }}
                            data={data}
                            keyExtractor={item => item.uri}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onViewableItemsChanged={this.onViewableItemsChangedSlider}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={0.85}
                                        onPress={() =>
                                            this.setModalVisible(true)
                                        }
                                        style={{
                                            width: width,
                                            height: height
                                        }}>
                                        <Image
                                            style={{
                                                width: width,
                                                height: IMG_HEIGHT
                                            }}
                                            source={{ uri: item.uri }}
                                        />
                                    </TouchableOpacity>
                                )
                            }}
                        />
                        <View
                            style={[
                                styles.btnArrowContainer,
                                styles.btnPreviousContainer
                            ]}>
                            <TouchableOpacity
                                style={[
                                    styles.btnChangeSlider,
                                    styles.btnChangeSliderPrevious
                                ]}
                                activeOpacity={0.7}
                                onPress={() => {
                                    const tmpcrridx =
                                        crrImgIdx - 1 < 0
                                            ? DATA_IMAGES_LENGTH - 1
                                            : crrImgIdx - 1
                                    this.changeOffsetSlider(tmpcrridx)
                                }}>
                                <Icon
                                    name='angle-left'
                                    size={26}
                                    color='#fff'
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[
                                styles.btnArrowContainer,
                                styles.btnNextContainer
                            ]}>
                            <TouchableOpacity
                                style={[
                                    styles.btnChangeSlider,
                                    styles.btnChangeSliderNext
                                ]}
                                activeOpacity={0.7}
                                onPress={() => {
                                    const tmpcrridx =
                                        crrImgIdx + 1 >= DATA_IMAGES_LENGTH
                                            ? 0
                                            : crrImgIdx + 1
                                    this.changeOffsetSlider(tmpcrridx)
                                }}>
                                <Icon
                                    name='angle-right'
                                    size={26}
                                    color='#fff'
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'flex-end'
                            }}>
                            <View
                                style={{
                                    width: 40
                                }}>
                                <Text style={[styles.totalNumber]}>
                                    {crrImgIdx + 1}/{DATA_IMAGES_LENGTH}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <SafeAreaView>
                        <Modal
                            visible={isShowModal}
                            onRequestClose={() => this.setModalVisible(false)}
                            onShow={() => this.onModalChangingShow()}
                            swipeDirection='bottom'
                            swipeThreshold={50}
                            animationType='slide'
                            onSwipeComplete={() => this.setModalVisible(false)}
                            style={{ width: width, height: height }}>
                            <View style={{ width: width, height: height }}>
                                <FlatList
                                    keyboardShouldPersistTaps='always'
                                    style={{ height: IMG_HEIGHT }}
                                    contentContainerStyle={{
                                        flexGrow: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#333'
                                    }}
                                    snapToInterval={width}
                                    bounces={false}
                                    decelerationRate='fast'
                                    viewAbilityConfig={{
                                        viewAreaCoveragePercentThreshold: 50
                                    }}
                                    data={data}
                                    ref={this.galleryRef}
                                    keyExtractor={item => item.uri}
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    onViewableItemsChanged={this.onViewableItemsChangedGallery}
                                    renderItem={({ item }) => {
                                        return (
                                            <Image
                                                style={{
                                                    width: width,
                                                    height: IMG_HEIGHT
                                                }}
                                                source={{ uri: item.uri }}
                                            />
                                        )
                                    }}
                                />
                            </View>

                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 25,
                                    left: 10,
                                    right: 10,
                                    width: width,
                                    height: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <FlatList
                                    ref={this.thumbRef}
                                    contentContainerStyle={{
                                        padding: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        minWidth: width
                                    }}
                                    snapToInterval={width}
                                    bounces={false}
                                    decelerationRate='fast'
                                    viewAbilityConfig={{
                                        viewAreaCoveragePercentThreshold: 50
                                    }}
                                    data={data}
                                    keyExtractor={item => `thumbRef_${item.uri}`}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    onMomentumScrollBegin={() => {
                                        this.onEndReachedCalledDuringMomentum = false;
                                    }}
                                    onMomentumScrollEnd={ev => {
                                        if (!this.onEndReachedCalledDuringMomentum) {
                                            this.onEndReachedCalledDuringMomentum = true;
                                        }
                                    }}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({ crrThumb: index })
                                                    this.changeOffsetGallery(index)
                                                }}
                                                activeOpacity={0.85}
                                                style={{
                                                    width: THUMB_SIZE,
                                                    height: THUMB_SIZE,
                                                    marginRight: 10
                                                }}>
                                                <Image
                                                    style={{
                                                        width: THUMB_SIZE,
                                                        height: THUMB_SIZE,
                                                        borderRadius: 4,
                                                        opacity: index === this.state.crrThumb ? 1 : .5
                                                    }}
                                                    source={{ uri: item.uri }}
                                                />
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            </View>
                        </Modal>
                    </SafeAreaView>
                </View>
            </ScrollView>
        )
    }

    setActiveIndex = index => {
        this.setState({ crrImgIdx: index })
    }

    setModalVisible = isshow => {
        this.setState({ isShowModal: isshow })
        if (!isshow) {
            this.changeOffsetSlider(this.state.crrImgIdx)
        }
    }

    onModalChangingShow = () => {
        this.setState({ isShowFromSlider: true });
        this.changeOffsetGallery(this.state.crrImgIdx)
    }

    changeOffsetSlider = index => {
        this.silderRef?.current?.scrollToIndex({
            index: index,
            animation: false
        })
    }

    changeOffsetGallery = index => {
        this.galleryRef?.current?.scrollToIndex({
            index: index,
            animation: false
        })
    }

    changeOffsetThumb = index => {
        let mnus = 30
        if (THUMB_SIZE * index < width / 2) mnus = -30

        this.thumbRef?.current?.scrollToOffset({
            offset: THUMB_SIZE * index + mnus,
            viewPosition: 0
        })
    }

    onViewableItemsChangedSlider = ({ viewableItems }) => {
        let idxCheck = 0;
        if (viewableItems.length === 1) {
            idxCheck++;
            if (idxCheck === 1) {
                idxCheck = 0;
                this.setActiveIndex(viewableItems[0].index)
                this.setState({ crrThumb: viewableItems[0].index });
            }
        }
    }

    onViewableItemsChangedGallery = ({ viewableItems }) => {
        if (viewableItems.length === 2)
            return;
        if (this.state.isShowFromSlider) {
            this.setState({ isShowFromSlider: false });
            return;
        }


        if (viewableItems.length === 1) {
            const index = viewableItems[0].index;
            this.setState({ crrThumb: index });
            this.changeOffsetThumb(index);
            this.setActiveIndex(index);
        }
    }
}

const styles = StyleSheet.create({
    // eslint-disable-next-line react-native/sort-styles
    btnArrowContainer: {
        alignItems: 'center',
        bottom: 22,
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 29
    },
    btnPreviousContainer: {
        left: 0
    },
    btnNextContainer: {
        right: 0
    },
    // eslint-disable-next-line react-native/no-color-literals
    btnChangeSlider: {
        backgroundColor: 'rgba(34, 43, 69, 0.5)',
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    btnChangeSliderPrevious: {
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5
    },
    btnChangeSliderNext: {
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5
    },
    totalNumber: {
        backgroundColor: '#d6e0f5',
        color: '#fff',
        fontSize: 12,
        lineHeight: 16,
        textAlign: 'center',
        borderRadius: 16,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5
    }
})
