/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/sort-styles */
import React, { useEffect, useState, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigation } from '@react-navigation/native';
import {
    // Dimensions,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { apiBase, METHOD, API_CONST } from '@app/api';
import { Colors } from '@app/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import HTML from 'react-native-render-html';
//  import * as cartCreator from '@app/container/cart/action';
import * as cartCreator from '@app/redux/actions/cartAction';
import { helper } from '@app/common';
import DelayInputCmp from '../../components/DelayInput';

const SuggestSearchModal = () => {
    useEffect(() => {
        setObjSearch({
            Phrase: '',
            ProvinceId: locationinfo?.crrLocationRs?.ProvinceId,
            StoreId: 0,
            Phone: ''
        });
    }, [locationinfo]);

    // Init
    const navigation = useNavigation();
    // const windowWidth = Math.round(Dimensions.get('window').width);
    const inputRef = createRef();

    // State
    const [value, setValue] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const [objSearch, setObjSearch] = useState(Object);
    const [lstSuggest, setlstSuggest] = useState(null);

    // Redux
    const locationinfo = useSelector(
        (state) => state.generalReducer.Location.LocationInfo
    );
    const dispatch = useDispatch();
    const actionCart = bindActionCreators(cartCreator, dispatch);

    // Function
    useEffect(() => {
        setObjSearch((prevState) => {
            return { ...prevState, Phrase: value };
        });
    }, [value]);

    useEffect(() => {
        doSearch();
    }, [objSearch]);

    const doSearch = () => {
        if (objSearch.Phrase === '') {
            return false;
        } else {
            console.log(objSearch.Phrase);
            setisLoading(true);
            apiBase(API_CONST.API_SEARCH_SUGGESTMODAL, METHOD.POST, objSearch)
                .then((response) => {
                    setisLoading(false);
                    if (response.ResultCode === 0 && response.Value !== null) {
                        setlstSuggest(response.Value);
                    }
                })
                .catch((err) => {
                    setisLoading(false);
                    console.log(err);
                });
        }
    };

    const _renderListItem = (item) => {
        if (item.Type === 3) {
            return (
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('Group', { url: item.Url })
                    }>
                    <HTML containerStyle={styles.searchItem} html={item.Name} />
                </TouchableOpacity>
            );
        } else if (item.Type === 4) {
            return _renderProductItem(item.Product);
        } else if (item.Type === 5) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Search', { url: item.Url });
                    }}>
                    <HTML
                        containerStyle={[
                            styles.searchItem,
                            {
                                alignItems: 'center',
                                flex: 1
                            }
                        ]}
                        html={item.Name}
                    />
                </TouchableOpacity>
            );
        }
    };

    const _renderProductItem = (product) => {
        return (
            <View style={[styles.searchItem, styles.searchItemProd]}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.push('ProductDetail', {
                            productId: product.Id
                        })
                    }>
                    <Image
                        style={{ width: 50, height: 50, marginRight: 10 }}
                        source={{
                            uri: product.Avatar
                        }}
                    />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.push('ProductDetail', {
                                productId: product.Id
                            })
                        }>
                        <Text numberOfLines={1}>{product.FullName}</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 5
                        }}>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() =>
                                navigation.push('ProductDetail', {
                                    productId: product.Id
                                })
                            }>
                            <Text>{helper.formatMoney(product.Price)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => addToCart(product.Id)}
                            style={styles.btnBuyNow}>
                            <Text style={{ color: Colors.GREEN_KEY }}>
                                Mua ngay
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };
    const addToCart = (productID, expStoreId) => {
        actionCart
            .cart_add_item_product(productID, 1, true, expStoreId)
            .then(async (res) => {
                console.log('cart_add_item_product');
                console.log(res);
                if (res.ResultCode > 0) {
                    Alert.alert('', res.messages);
                } else {
                    await actionCart.cart_get_simple();
                }
            })
            .catch((error) => {
                Alert.alert('', error);
            });
    };

    // Callback

    return (
        <SafeAreaView style={styles.Container}>
            <View style={styles.boxsearch}>
                <TouchableOpacity
                    style={styles.btnBack}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Icon name="chevron-left" size={20} color="#fff" />
                </TouchableOpacity>
                <View style={styles.grsearchInput}>
                    <DelayInputCmp
                        value={value}
                        minLength={3}
                        inputRef={inputRef}
                        onChangeText={setValue}
                        delayTimeout={1000}
                        placeholder="Tìm kiếm hơn 10k sản phẩm"
                        style={styles.boxsearchInput}
                    />
                    <Image
                        style={styles.iconsearch}
                        source={require('../../../assets/images/icon-search.png')}
                    />
                </View>
            </View>
            <View>
                {isLoading && (
                    <ActivityIndicator
                        style={{ paddingVertical: 20 }}
                        size="large"
                        color={Colors.GREEN_KEY}
                    />
                )}
                {!isLoading && (
                    <FlatList
                        data={lstSuggest}
                        keyExtractor={(item, index) => `key_${index}`}
                        renderItem={({ item }) => _renderListItem(item)}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    Container: {
        backgroundColor: Colors.WHITE
    },
    boxsearch: {
        backgroundColor: Colors.GREEN_KEY,
        flexDirection: 'row',
        paddingVertical: 10
    },
    btnBack: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 20
    },
    grsearchInput: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        paddingRight: 10,
        paddingVertical: 0,
        height: 40
    },
    boxsearchInput: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: Colors.WHITE
    },
    iconsearch: {
        width: 20,
        height: 20
    },
    searchItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    searchItemProd: {
        flexDirection: 'row'
    },
    btnBuyNow: {
        width: 80,
        height: 30,
        marginTop: 5,
        borderColor: Colors.GREEN_KEY,
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SuggestSearchModal;
