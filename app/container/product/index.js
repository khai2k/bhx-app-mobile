import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
// import { translate } from '@app/translate';
import { Header } from '@app/components';
import ProductBox from '../../components/ProductBox/ProductBox';
import ProductExpiredBox from '../../components/ProductBox/ProductExpiredBox';
import ComboProductBox from '../../components/ProductBox/ComboProductBox';

import ListCategory from './ListCategory';
import SliderTitle from './SliderTitle';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    productList: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProducts: []
        };
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://staging.bachhoaxanh.com/apiapp/api/Home/GetHomeData?provinceId=3&storeId=6463&userId=0&phoneList=0&IsMobile=true&clearcache=ok'
        })
            .then((res) => {
                const { data } = res;
                const listData = data.Value;
                this.setState({ listProducts: listData[1].Products });
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} />
                <SliderTitle />
                <ListCategory />
                <View style={styles.productList}>
                    {this.state.listProducts.map((product) => {
                        return <ProductBox bhxProduct={product} />;
                    })}
                    {this.state.listProducts.map((product) => {
                        return <ProductExpiredBox bhxProduct={product} />;
                    })}
                    {this.state.listProducts.map((product) => {
                        return <ComboProductBox bhxProduct={product} />;
                    })}
                </View>
            </View>
        );
    }
}

const mapStateToProps = function () {
    return {};
};

const mapDispatchToProps = function () {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
