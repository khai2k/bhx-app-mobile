import React, { Component, useRef } from 'react';
import { connect } from 'react-redux';
import { Dimensions, View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Modal, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.silderRef = React.createRef();
        this.galleryRef = React.createRef();
        this.thumbRef = React.createRef();
        this.state = {
            data: [
                {
                    uri:
                        'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
                },
                {
                    uri:
                        'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80'
                },
                {
                    uri:
                        'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
                },
                {
                    uri:
                        'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
                },
                {
                    uri:
                        'https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80'
                },
                {
                    uri:
                        'https://znews-photo.zadn.vn/w860/Uploaded/mfnuy/2021_05_07/1.jpg'
                },
                {
                    uri:
                        'https://znews-photo.zadn.vn/w860/Uploaded/mfnuy/2021_05_07/r.jpg'
                },

            ],
            crrImgIdx: 0,
            isShowModal: false,
        };
    }

    render() {
        const { width, height } = Dimensions.get('window');
        const { isShowModal, data, crrImgIdx } = this.state;
        const THUMB_SIZE = 50;
        const DATA_IMAGES_LENGTH = data.length;

        const setActiveIndex = (index) => {
            this.setState({ crrImgIdx: index });

            this.silderRef?.current?.scrollToOffset({
                offset: index * width,
            })
        }

        const setModalVisible = (isshow) => {
            this.setState({ isShowModal: isshow });
            if (!isshow) {
                this.silderRef?.current?.scrollToOffset({
                    offset: crrImgIdx * width,
                })
            }
        }

        const changeThumbOffsetGallery = (index) => {
            this.setState({ crrImgIdx: index });
            if (index * (THUMB_SIZE + 10) - THUMB_SIZE / 2 > width / 2) {
                this.thumbRef?.current?.scrollToOffset({
                    offset: index * (THUMB_SIZE + 10) - width / 2 + THUMB_SIZE / 2,
                    animated: true
                })
            }
            else {
                this.thumbRef?.current?.scrollToOffset({
                    offset: 0,
                    animated: true
                })
            }
            changeOffsetGallery(index);
        }

        const onModalChangingShow = () => {
            changeOffsetGallery();
            changeThumbOffsetGallery(crrImgIdx);
        }

        const changeOffsetGallery = (index) => {
            this.galleryRef?.current?.scrollToOffset({
                offset: (index ?? crrImgIdx + 1) * width,
            });
        }

        return (
            <ScrollView style={{ flex: 1 }}>
                <View>
                    <View>
                        <FlatList
                            ref={this.silderRef}
                            style={{ width: width, height: 230 }}
                            data={data}
                            keyExtractor={item => item.uri}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onMomentumScrollBegin={() => {
                                this.onEndReachedCalledDuringMomentum = false;
                            }}
                            onMomentumScrollEnd={ev => {
                                if (!this.onEndReachedCalledDuringMomentum) {
                                    const tmpoffset = ev.nativeEvent.contentOffset.x / width;
                                    let tmpOffsetAfter = Math.floor(tmpoffset > 0 ? tmpoffset + 1 : tmpoffset);

                                    if (tmpOffsetAfter === DATA_IMAGES_LENGTH - 1 && crrImgIdx === DATA_IMAGES_LENGTH - 1)
                                        tmpOffsetAfter = 0;
                                    else if (tmpOffsetAfter === 0 && crrImgIdx === 0)
                                        tmpOffsetAfter = DATA_IMAGES_LENGTH - 1;

                                    setActiveIndex(tmpOffsetAfter);
                                    this.onEndReachedCalledDuringMomentum = true;
                                }
                            }}
                            initialNumToRender={2}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={.85}
                                        onPress={() => setModalVisible(true)}
                                        style={{ width: width, height: height }}>
                                        <Image
                                            style={{ width: width, height: 230 }}
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
                                    const tmpcrridx = crrImgIdx - 1 < 0 ? DATA_IMAGES_LENGTH - 1 : crrImgIdx - 1;
                                    setActiveIndex(tmpcrridx);
                                }}>
                                <Icon name="angle-left" size={26} color="#fff" />
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
                                    const tmpcrridx = crrImgIdx + 1 >= DATA_IMAGES_LENGTH ? 0 : crrImgIdx + 1;
                                    setActiveIndex(tmpcrridx);
                                }}>
                                <Icon name="angle-right" size={26} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <View style={{ width: 40 }}>
                                <Text style={[styles.totalNumber]}>{crrImgIdx + 1}/{DATA_IMAGES_LENGTH}</Text>
                            </View>
                        </View>
                    </View>

                    <SafeAreaView>
                        <Modal
                            visible={isShowModal}
                            onRequestClose={() => setModalVisible(false)}
                            onShow={() => onModalChangingShow()}
                            swipeDirection='bottom'
                            swipeThreshold={50}
                            onSwipeComplete={() => setModalVisible(false)}
                            style={{ width: width, height: height }}>

                            <View
                                style={{ width: width, height: height }}>
                                <FlatList
                                    keyboardShouldPersistTaps='always'
                                    style={{ height: 230 }}
                                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333' }}
                                    data={data}
                                    ref={this.galleryRef}
                                    keyExtractor={item => item.uri}
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    onMomentumScrollBegin={() => {
                                        this.onEndReachedCalledDuringMomentum = false;
                                    }}
                                    onMomentumScrollEnd={ev => {
                                        if (!this.onEndReachedCalledDuringMomentum) {
                                            const tmpoffset = ev.nativeEvent.contentOffset.x / width;

                                            if (tmpoffset > crrImgIdx && tmpoffset > crrImgIdx + .5 || tmpoffset <= crrImgIdx + .5)
                                                setActiveIndex(Math.floor(tmpoffset > 0 ? tmpoffset + 1 : tmpoffset));

                                            this.onEndReachedCalledDuringMomentum = true;
                                        }
                                    }}
                                    initialNumToRender={2}
                                    renderItem={({ item }) => {
                                        return (
                                            <Image
                                                style={{ width: width, height: 230 }}
                                                source={{ uri: item.uri }}
                                            />
                                        )
                                    }}
                                />
                            </View>

                            <View
                                style={{ position: 'absolute', bottom: 25, left: 10, right: 10, width: width, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <FlatList
                                    ref={this.thumbRef}
                                    contentContainerStyle={{ padding: 5, justifyContent: 'center', alignItems: 'center', minWidth: width }}
                                    data={data}
                                    keyExtractor={item => item.uri}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => changeThumbOffsetGallery(index)}
                                                activeOpacity={.85}
                                                style={{ width: THUMB_SIZE, height: THUMB_SIZE, marginRight: 10 }}>
                                                <Image
                                                    style={{ width: THUMB_SIZE, height: THUMB_SIZE, borderRadius: 4, opacity: index == crrImgIdx ? 1 : .5 }}
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
        );
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
});

const mapStateToProps = function () {
    return {};
};

const mapDispatchToProps = function () {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
