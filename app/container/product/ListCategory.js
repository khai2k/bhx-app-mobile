import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Linking,
    StyleSheet
} from 'react-native';

const style = StyleSheet.create({
    boxCategory: {
        marginBottom: 5,
        paddingRight: 5
    },
    categoryItem: {
        color: '#008848',
        padding: 10,
        borderWidth: 1,
        borderColor: '#c5cee0',
        borderRadius: 5,
        marginLeft: 5,
        marginTop: 5,
        backgroundColor: '#fff'
    }
});

export default class ListCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCategories: [
                {
                    categoryId: 1,
                    uri: 'https://www.bachhoaxanh.com/sua-tuoi',
                    name: 'Sữa tươi các loại'
                },
                {
                    categoryId: 2,
                    uri: 'https://www.bachhoaxanh.com/nuoc-ngot',
                    name: 'Nước ngọt các loại'
                },
                {
                    categoryId: 3,
                    uri: 'https://www.bachhoaxanh.com/mi',
                    name: 'Mì gói ăn liền'
                },
                {
                    categoryId: 4,
                    uri: 'https://www.bachhoaxanh.com/dau-an',
                    name: 'Dầu ăn các loại'
                },
                {
                    categoryId: 5,
                    uri: 'https://www.bachhoaxanh.com/khan-giay-uot',
                    name: 'Khăn ướt các loại'
                },
                {
                    categoryId: 6,
                    uri: 'https://www.bachhoaxanh.com/dau-goi',
                    name: 'Dầu gội các loại'
                },
                {
                    categoryId: '1',
                    uri: 'https://www.bachhoaxanh.com/gao-gao-nep',
                    name: 'Gạo ngon các loại'
                },
                {
                    categoryId: 7,
                    uri: 'https://www.bachhoaxanh.com/hai-san-dong-lanh',
                    name: 'Thịt hải sản đông'
                }
            ]
        };
    }

    // CategoryItem(){
    //     return ();
    // }

    render() {
        return (
            <View style={style.boxCategory}>
                <FlatList
                    horizontal
                    data={this.state.listCategories}
                    renderItem={({ item, index, separators }) => (
                        <TouchableOpacity>
                            <View>
                                <Text
                                    style={style.categoryItem}
                                    onPress={() => Linking.openURL(item.uri)}>
                                    {item.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}
