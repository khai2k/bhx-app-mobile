import React from 'react';
import { View, TouchableOpacity, Image, TextInput } from 'react-native';
import { styles } from './styles';
import { ImageNavMenu } from '../../images';
import { removeVietnameseTones } from '../../common/helper';

// Category Search
const CategorySearch = (props) => {
    // Function search danh sách cate con
    function searchFilter(text) {
        if (text) {
            const filtered = props.masterData.map((element) => {
                return {
                    // ...element,
                    data: (element.data || []).filter(
                        (subElement) =>
                            removeVietnameseTones(subElement.Text)
                                .toUpperCase()
                                .indexOf(text.toUpperCase()) > -1
                    )
                };
            });
            const resultSearch = [];
            filtered.filter((value) => {
                return (
                    value.data.length > 0 &&
                    value.data.map((element) => {
                        return (
                            element.ReferenceId !== '-1' &&
                            resultSearch.push(element)
                        );
                    })
                );
            });
            props.setListCate(resultSearch);
            props.setSearch(text);
            props.setIsHasSearch(true);
        } else {
            props.setListCate(props.masterData);
            props.setSearch(text);
            props.setIsHasSearch(false);
        }
    }
    return (
        <View style={styles.navRightTop}>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                value={props.search}
                style={styles.inputSearch}
                placeholder="Tìm nhóm hàng"
                onChangeText={(text) => {
                    searchFilter(text);
                }}
            />
            {props.search.length > 0 ? (
                <TouchableOpacity
                    style={styles.btnClearSearch}
                    onPress={() => searchFilter('')}>
                    <Image
                        style={styles.iconClearSearch}
                        source={ImageNavMenu.imgIconClose}
                    />
                </TouchableOpacity>
            ) : (
                <Image
                    style={styles.iconSearch}
                    source={ImageNavMenu.imgIconSearch}
                />
            )}
        </View>
    );
};

export default CategorySearch;
