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
    SafeAreaView
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ScrollView } from 'react-native-gesture-handler'

const THUMB_SIZE = 50
const { width, height } = Dimensions.get('window')
export default class ProductGallery extends Component {
    silderRef = createRef()
    galleryRef = createRef()
    thumbRef = createRef()

    constructor (props) {
        super(props)
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
                }
            ],
            crrImgIdx: 0,
            isShowModal: false
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }

    render () {
        const { data, crrImgIdx, isShowModal } = this.state
        const DATA_IMAGES_LENGTH = data.length

        return (
            <ScrollView style={{ width: width, height: 255 }}>
                <View>
                    <View>
                        <FlatList
                            ref={this.silderRef}
                            style={{ width: width, height: 230 }}
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
                            onViewableItemsChanged={this.onViewableItemsChanged}
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
                                                height: 230
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
                                    this.setActiveIndex(tmpcrridx)
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
                                    this.setActiveIndex(tmpcrridx)
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
                            onSwipeComplete={() => this.setModalVisible(false)}
                            style={{ width: width, height: height }}>
                            <View style={{ width: width, height: height }}>
                                <FlatList
                                    keyboardShouldPersistTaps='always'
                                    style={{ height: 230 }}
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
                                    onViewableItemsChanged={
                                        this.onViewableItemsChanged
                                    }
                                    renderItem={({ item }) => {
                                        return (
                                            <Image
                                                style={{
                                                    width: width,
                                                    height: 230
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
                                    keyExtractor={item => item.uri}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.changeOffsetGallery(
                                                        index
                                                    )
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
                                                        borderRadius: 4
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
        console.log(this.galleryRef?.current?.index)
        this.changeOffsetGallery(this.state.crrImgIdx)
    }

    changeOffsetSlider = index => {
        this.silderRef?.current?.scrollToIndex({
            index: index
        })
    }

    changeOffsetGallery = index => {
        this.galleryRef?.current?.scrollToIndex({
            index: index
        })

        this.changeOffsetThumb(index)
    }

    changeOffsetThumb = index => {
        let mnus = 30
        if (THUMB_SIZE * index < width / 2) mnus = -30

        this.thumbRef?.current?.scrollToOffset({
            offset: THUMB_SIZE * index + mnus,
            viewPosition: 1
        })
    }

    onViewableItemsChanged = ({ viewableItems }) => {
        if (
            viewableItems.length > 0 &&
            viewableItems[0].index !== this.state.crrImgIdx
        ) {
            this.setActiveIndex(viewableItems[0].index)
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
