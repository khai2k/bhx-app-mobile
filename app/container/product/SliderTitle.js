import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Colors } from '@app/styles';

const style = StyleSheet.create({
    boxTitle: {
        alignItems: 'center',
        bottom: 10,
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        marginVertical: 10,
        position: 'relative',
        right: 0,
        top: 0,
        width: '100%'
    },
    imgTitle: {
        borderRadius: 50,
        bottom: 0,
        height: 50,
        left: '10%',
        marginHorizontal: 0,
        position: 'absolute',
        right: '10%',
        top: 0
    },
    slideItem: {
        alignContent: 'center',
        alignItems: 'center',
        color: Colors.WHITE,
        display: 'flex',
        height: 50,
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%'
    }
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
            ]
        };
    }

    _renderItem = ({ item }) => {
        return <Text style={style.slideItem}>{item.name}</Text>;
    };

    render() {
        return (
            <View style={style.boxTitle}>
                <Image
                    style={style.imgTitle}
                    source={{
                        uri: 'https://cdn.tgdd.vn/bachhoaxanh/www/Content/images/mobile/freshBanner.v202104121018.png'
                    }}
                />
                <Carousel
                    ref={(c) => {
                        this._carousel = c;
                    }}
                    data={this.state.listTitle}
                    renderItem={this._renderItem}
                    sliderWidth={100}
                    itemWidth={100}
                />
            </View>
        );
    }
}
