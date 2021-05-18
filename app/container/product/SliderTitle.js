import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
// import Carousel from 'react-native-snap-carousel';

const style = StyleSheet.create({
    boxTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 10,
        width: '100%'
    },
    imgTitle: {
        marginHorizontal: 0,
        height: 50,
        borderRadius: 50,
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        bottom: 0
    },
    slideItem: {
        width: '100%',
        color: '#fff',
        textAlign: 'center',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    boxCarousel: {}
});

export default class SliderTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTitle: [
                {
                    titleId: 1,
                    name: '5 lần free ship cho khách hàng mới'
                },
                {
                    titleId: 2,
                    name: 'THỊT, CÁ, TRỨNG, RAU CỦ'
                },
                {
                    titleId: 3,
                    name: 'Hơn 10k sản phẩm đang kinh doanh'
                }
            ],
            backgroundTitle:
                'https://cdn.tgdd.vn/bachhoaxanh/www/Content/Images/mobile/freshBanner.v202104121018.png'
        };
    }

    _renderItem = ({ item, index }) => {
        return <Text style={style.slideItem}>{item.name}</Text>;
    };

    render() {
        return (
            <View style={style.boxTitle}>
                <Image
                    style={style.imgTitle}
                    source={{
                        uri: this.state.backgroundTitle
                    }}
                />
                {/* <Carousel
                    ref={(c) => {
                        this._carousel = c;
                    }}
                    autoplay={true}
                    enableMomentum={false}
                    lockScrollWhileSnapping={true}
                    loop={true}
                    enableSnap={true}
                    data={this.state.listTitle}
                    renderItem={this._renderItem}
                    itemWidth={200}
                    sliderWidth={200}
                    style={style.boxCarousel}
                /> */}
            </View>
        );
    }
}
