import React from 'react';
import { Text, View, Image } from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import styles from './style';

const SliderTitle = (props) => {
    if (props.listTitle != null && props.listTitle.length > 0) {
        return (
            <View style={styles.boxTitle}>
                <Image
                    style={styles.imgTitle}
                    source={{
                        uri: 'https://cdn.tgdd.vn/bachhoaxanh/www/Content/images/mobile/freshBanner.v202104121406.png'
                    }}
                />
                {props.listTitle.map((element) => {
                    return <Text>{element.name}</Text>;
                })}
                {/* <Carousel
                    ref={(c) => {
                        this._carousel = c;
                    }}
                    autoplay
                    enableMomentum={false}
                    lockScrollWhileSnapping
                    loop
                    enableSnap
                    data={props.listTitle}
                    renderItem={renderItem}
                    itemWidth={200}
                    sliderWidth={200}
                    style={styles.boxCarousel}
                /> */}
            </View>
        );
    } else {
        return null;
    }
};

const renderItem = (item) => {
    return <Text style={styles.slideItem}>{item.name}</Text>;
};

export default SliderTitle;
