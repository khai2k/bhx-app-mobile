import React from 'react';
import { Text, View, Image, SafeAreaView } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import styles from './style';

const SliderTitle = (props) => {
    if (props.listTitle != null && props.listTitle.length > 0) {
        return (
            <SafeAreaView style={styles.boxTitle}>
                <Image
                    style={styles.imgTitle}
                    source={{
                        uri: 'https://cdn.tgdd.vn/bachhoaxanh/www/Content/images/mobile/freshBanner.v202104121406.png'
                    }}
                />
                <SwiperFlatList
                    autoplay
                    autoplayDelay={3}
                    autoplayLoop
                    index={0}
                    data={props.listTitle}
                    vertical
                    style={{ height: 50, overflow: 'hidden', flex: 1 }}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                width: '100%',
                                height: 50,
                                justifyContent: 'center',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                            <Text style={styles.swiperItem}>{item.name}</Text>
                        </View>
                    )}
                />
            </SafeAreaView>
        );
    } else {
        return null;
    }
};

export default React.memo(SliderTitle);
