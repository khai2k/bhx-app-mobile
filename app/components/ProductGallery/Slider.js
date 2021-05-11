import React from 'react';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';

const Slider = (props) => {
    return (
        <View>
            <FlatList
                ref={props.silderRef}
                style={{ width, height: IMG_HEIGHT }}
                snapToInterval={width}
                bounces={false}
                decelerationRate="fast"
                viewAbilityConfig={{
                    viewAreaCoveragePercentThreshold: 50
                }}
                data={data}
                keyExtractor={(item) => item.uri}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={this.onViewableItemsChangedSlider}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => this.setModalVisible(true)}
                            style={{
                                width,
                                height
                            }}>
                            <Image
                                style={{
                                    width,
                                    height: IMG_HEIGHT
                                }}
                                source={{ uri: item.uri }}
                            />
                        </TouchableOpacity>
                    );
                }}
            />
            <View
                style={[styles.btnArrowContainer, styles.btnPreviousContainer]}>
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
                        this.changeOffsetSlider(tmpcrridx);
                    }}>
                    <Icon name="angle-left" size={26} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={[styles.btnArrowContainer, styles.btnNextContainer]}>
                <TouchableOpacity
                    style={[styles.btnChangeSlider, styles.btnChangeSliderNext]}
                    activeOpacity={0.7}
                    onPress={() => {
                        const tmpcrridx =
                            crrImgIdx + 1 >= DATA_IMAGES_LENGTH
                                ? 0
                                : crrImgIdx + 1;
                        this.changeOffsetSlider(tmpcrridx);
                    }}>
                    <Icon name="angle-right" size={26} color="#fff" />
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
                    <Text style={styles.totalNumber}>
                        {crrImgIdx + 1}/{DATA_IMAGES_LENGTH}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Slider;
