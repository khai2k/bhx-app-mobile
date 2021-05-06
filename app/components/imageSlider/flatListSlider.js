import React, { Component, createRef } from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    LayoutAnimation,
    Platform,
    UIManager,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Indicator from './indicator';
import ChildItem from './childItem';
import TotalNumber from './totalNumber';

export default class FlatListSlider extends Component {
    slider = createRef();

    static defaultProps = {
        data: [],
        imageKey: 'uri',
        local: false,
        width: Math.round(Dimensions.get('window').width),
        height: 230,
        separatorWidth: 0,
        loop: true,
        showTotalNumber: true,
        indicator: false,
        indicatorStyle: {},
        indicatorContainerStyle: {},
        totalNumberStyle: {},
        indicatorActiveColor: '#3498db',
        indicatorInActiveColor: '#bdc3c7',
        indicatorActiveWidth: 6,
        animation: true,
        autoScroll: false,
        showArrow: true,
        timer: 10000,
        onPress: {},
        contentContainerStyle: {},
        component: <ChildItem />
    };

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            data: this.props.data
        };
        if (Platform.OS === 'android') {
            //UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentDidMount() {
        if (this.props.autoScroll) {
            this.startAutoPlay();
        }
    }

    componentWillUnmount() {
        if (this.props.autoScroll) {
            this.stopAutoPlay();
        }
    }

    render() {
        const itemWidth = this.props.width;
        const { separatorWidth } = this.props;
        const totalItemWidth = itemWidth + separatorWidth;

        return (
            <View>
                <FlatList
                    ref={this.slider}
                    horizontal
                    pagingEnabled={false}
                    snapToInterval={totalItemWidth}
                    decelerationRate="fast"
                    bounces={false}
                    contentContainerStyle={this.props.contentContainerStyle}
                    data={this.state.data}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) =>
                        React.cloneElement(this.props.component, {
                            style: { width: this.props.width },
                            item,
                            imageKey: this.props.imageKey,
                            onPress: this.props.onPress,
                            index: this.state.index % this.props.data.length,
                            active: index === this.state.index,
                            local: this.props.local,
                            height: this.props.height
                        })
                    }
                    ItemSeparatorComponent={() => (
                        <View style={{ width: this.props.separatorWidth }} />
                    )}
                    keyExtractor={(item, index) => item.toString() + index}
                    onViewableItemsChanged={this.onViewableItemsChanged}
                    viewAbilityConfig={this.viewAbilityConfig}
                    getItemLayout={(data, index) => ({
                        length: totalItemWidth,
                        offset: totalItemWidth * index,
                        index
                    })}
                    windowSize={1}
                    initialNumToRender={1}
                    maxToRenderPerBatch={1}
                    removeClippedSubViews
                />
                {this.props.showArrow && (
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
                            onPress={() =>
                                this.onHandleChangeSliderPosition(false)
                            }>
                            <Icon name="angle-left" size={26} color="#fff" />
                        </TouchableOpacity>
                    </View>
                )}
                {this.props.showArrow && (
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
                            onPress={() =>
                                this.onHandleChangeSliderPosition(true)
                            }>
                            <Icon name="angle-right" size={26} color="#fff" />
                        </TouchableOpacity>
                    </View>
                )}
                {this.props.indicator && !this.props.showTotalNumber && (
                    <Indicator
                        itemCount={this.props.data.length}
                        currentIndex={this.state.index % this.props.data.length}
                        indicatorStyle={this.props.indicatorStyle}
                        indicatorContainerStyle={[
                            styles.indicatorContainerStyle,
                            this.props.indicatorContainerStyle
                        ]}
                        indicatorActiveColor={this.props.indicatorActiveColor}
                        indicatorInActiveColor={
                            this.props.indicatorInActiveColor
                        }
                        indicatorActiveWidth={this.props.indicatorActiveWidth}
                        style={{
                            ...styles.indicator,
                            ...this.props.indicatorStyle
                        }}
                    />
                )}
                {this.props.showTotalNumber && !this.props.indicator && (
                    <TotalNumber
                        itemCount={this.props.data.length}
                        currentIndex={this.state.index % this.props.data.length}
                        totalNumberStyle={this.props.totalNumberStyle}
                    />
                )}
            </View>
        );
    }

    onViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const currentIndex = viewableItems[0].index;
            if (
                currentIndex % this.props.data.length ===
                    this.props.data.length - 1 &&
                this.props.loop
            ) {
                this.setState({
                    index: currentIndex,
                    // eslint-disable-next-line react/no-access-state-in-setstate
                    data: [...this.state.data, ...this.props.data]
                });
            } else {
                this.setState({ index: currentIndex });
            }

            if (this.props.currentIndexCallback) {
                this.props.currentIndexCallback(currentIndex);
            }
        }
    };

    viewAbilityConfig = {
        viewAreaCoveragePercentThreshold: 50
    };

    changeSliderListIndex = () => {
        if (this.props.animation) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeIn);
        }
        // eslint-disable-next-line react/no-access-state-in-setstate
        this.setState({ index: this.state.index + 1 });
        this.slider.current.scrollToIndex({
            index: this.state.index,
            animated: true
        });
    };

    onHandleChangeSliderPosition = (isNext) => {
        if (this.props.animation) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeIn);
        }
        // eslint-disable-next-line react/no-access-state-in-setstate
        let idx = isNext ? this.state.index + 1 : this.state.index - 1;
        idx = idx < 0 ? this.props.data.length - 1 : idx;
        this.setState({ index: idx });
        this.slider.current.scrollToIndex({
            index: idx,
            animated: true
        });
    };

    startAutoPlay = () => {
        this.sliderTimer = setInterval(
            this.changeSliderListIndex,
            this.props.timer
        );
    };

    stopAutoPlay = () => {
        if (this.sliderTimer) {
            clearInterval(this.sliderTimer);
            this.sliderTimer = null;
        }
    };
}

const styles = StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    image: {
        height: 230,
        resizeMode: 'stretch'
    },
    indicatorContainerStyle: {
        marginTop: 18
    },
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
    }
});
