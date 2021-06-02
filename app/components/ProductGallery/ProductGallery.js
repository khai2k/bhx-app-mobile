import React, { Component, createRef } from 'react';
import {
    Dimensions,
    View,
    Text,
    Image,
    UIManager,
    TouchableOpacity,
    StyleSheet,
    Modal,
    StatusBar,
    Platform,
    ScrollView,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import ImageViewer from 'react-native-image-zoom-viewer';
import * as COLOR from '@app/styles/colors';
import ImageViewer from './ImageViewer';

const THUMB_SIZE = 50;
const { width } = Dimensions.get('window');
const IMG_HEIGHT = width * 0.75;
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export default class ProductGallery extends Component {
    _sliderRef = createRef();

    _carousel = createRef();

    _thumbRef = createRef();

    constructor(props) {
        super(props);
        this.state = {
            crrImgIdx: 0,
            showModal: false
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    change(nativeEvent) {
        if (nativeEvent) {
            const slide = Math.round(
                nativeEvent.contentOffset.x /
                    nativeEvent.layoutMeasurement.width
            );
            if (slide !== this.state.crrImgIdx) {
                this.setState({
                    crrImgIdx: slide
                });
            }
        }
    }

    render() {
        const data = this.props.Gallery_product;
        const { crrImgIdx } = this.state;
        const DATA_IMAGES_LENGTH = data.length;
        const images = data.map((s) => ({
            url: s.ImageLarge,
            LinkVideo: s.LinkVideo
        }));

        return (
            <View
                style={{
                    width,
                    marginTop: STATUSBAR_HEIGHT
                }}>
                <View
                    style={{
                        height: IMG_HEIGHT + 28
                    }}>
                    <ScrollView
                        onScroll={({ nativeEvent }) => this.change(nativeEvent)}
                        ref={(snapScroll) => {
                            this._sliderRef = snapScroll;
                        }}
                        horizontal
                        style={{
                            height: IMG_HEIGHT
                        }}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}>
                        {data.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    onPress={() => this.openModal(index)}
                                    style={{
                                        width,
                                        height: IMG_HEIGHT,
                                        position: 'relative'
                                    }}>
                                    {item.LinkVideo !== null && (
                                        <View
                                            style={{
                                                alignItems: 'center',
                                                bottom: 0,
                                                justifyContent: 'center',
                                                left: 0,
                                                position: 'absolute',
                                                right: 0,
                                                top: 0,
                                                zIndex: 13,
                                                opacity: 0.5
                                            }}>
                                            <View>
                                                <Icon
                                                    name="play-circle"
                                                    size={100}
                                                    color="black"
                                                />
                                            </View>
                                        </View>
                                    )}
                                    <Image
                                        style={{
                                            width,
                                            height: IMG_HEIGHT
                                        }}
                                        resizeMode="cover"
                                        source={{ uri: item.ImageThumb }}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>

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
                                        : crrImgIdx - 1;
                                this._sliderRef.scrollTo({
                                    x: tmpcrridx * width,
                                    y: 0,
                                    animated: true
                                });
                            }}>
                            <Icon
                                name="angle-left"
                                size={26}
                                color={COLOR.WHITE}
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
                                        : crrImgIdx + 1;
                                this._sliderRef.scrollTo({
                                    x: tmpcrridx * width,
                                    y: 0,
                                    animated: true
                                });
                            }}>
                            <Icon
                                name="angle-right"
                                size={26}
                                color={COLOR.WHITE}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        // eslint-disable-next-line react-native/no-color-literals
                        style={{
                            height: 28,
                            alignItems: 'flex-end',
                            backgroundColor: COLOR.WHITE
                        }}>
                        <View
                            style={{
                                width: 40
                            }}>
                            <Text style={styles.totalNumber}>
                                {crrImgIdx + 1}/{DATA_IMAGES_LENGTH}
                            </Text>
                        </View>
                    </View>

                    <Modal
                        visible={this.state.showModal}
                        animationType="slide"
                        transparent
                        onShow={() => {
                            this.changeOffsetThumb(this.state.crrImgIdx);
                        }}
                        onRequestClose={() => this.closeModal()}>
                        <TouchableOpacity
                            onPress={() => this.closeModal()}
                            style={{
                                position: 'absolute',
                                top: 20,
                                right: 20,
                                zIndex: 111
                            }}>
                            <Text style={{ fontSize: 20 }}>X</Text>
                        </TouchableOpacity>
                        <ImageViewer
                            imageUrls={images}
                            index={crrImgIdx}
                            enableSwipeDown
                            swipeDownThreshold={25}
                            onSwipeDown={() => this.closeModal()}
                            // eslint-disable-next-line no-unused-vars
                            onMove={(position) => {
                                // const _crrY = position.positionY;
                                // const _opacity = (100 - _crrY * 2) / 100;
                                // const finalOPa = _opacity < 0 ? 0 : _opacity;
                                // this.setState({
                                //     modalOpacity: finalOPa
                                // });
                                // console.log(_opacity);
                            }}
                            onChange={(index) => {
                                this.changeOffsetThumb(index);
                                this.setState({ crrImgIdx: index });
                            }}
                            backgroundColor="white"
                            footerContainerStyle={[styles.modalFooterStyle]}
                            renderArrowLeft={() => (
                                <Icon
                                    name="angle-left"
                                    size={26}
                                    color={COLOR.BLACK}
                                />
                            )}
                            renderArrowRight={() => (
                                <Icon
                                    name="angle-right"
                                    size={26}
                                    color={COLOR.BLACK}
                                />
                            )}
                            renderFooter={() =>
                                this._renderFooterModalItems(data)
                            }
                        />
                    </Modal>
                </View>
            </View>
        );
    }

    _renderFooterModalItems = (data) => (
        <View
            style={{
                width,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <FlatList
                ref={this._thumbRef}
                contentContainerStyle={{
                    padding: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: width
                }}
                data={data}
                keyExtractor={(item) => `thumbRef_${item.ImageThumb}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    crrImgIdx: index
                                });
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
                                    opacity:
                                        index === this.state.crrImgIdx ? 1 : 0.5
                                }}
                                source={{
                                    uri: item.ImageThumb
                                }}
                            />
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );

    openModal(index) {
        this.setState({ showModal: true, crrImgIdx: index });
    }

    closeModal() {
        this.setState({ showModal: false });
        this._sliderRef.scrollTo({
            x: this.state.crrImgIdx * width,
            y: 0,
            animated: true
        });
    }

    changeOffsetThumb = (index) => {
        let mnus = 30;
        if (THUMB_SIZE * index < width / 2) {
            mnus = -30;
        }
        this._thumbRef?.current?.scrollToOffset({
            offset: THUMB_SIZE * index + mnus,
            viewPosition: 0
        });
    };
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
    // eslint-disable-next-line react-native/no-color-literals
    btnChangeSlider: {
        backgroundColor: COLOR.GRAY_DARK,
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    btnChangeSliderNext: {
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5
    },
    btnChangeSliderPrevious: {
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5
    },
    btnNextContainer: {
        right: 0
    },
    btnPreviousContainer: {
        left: 0
    },
    // eslint-disable-next-line react-native/no-color-literals
    modalFooterStyle: {
        backgroundColor: COLOR.WHITE,
        elevation: 9,
        padding: 5,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: -2
        },
        shadowOpacity: 1.0,
        shadowRadius: 2
    },
    // eslint-disable-next-line react-native/no-color-literals
    totalNumber: {
        backgroundColor: COLOR.GRAY_DARK,
        borderRadius: 16,
        color: '#fff',
        fontSize: 12,
        lineHeight: 16,
        marginBottom: 5,
        marginRight: 5,
        marginTop: 5,
        textAlign: 'center'
    }
});
