import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import styles from './style';

const ListCategories = (props) => {
    if (props.listCate != null && props.listCate.length > 0) {
        return (
            <SafeAreaView style={styles.boxCategory}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={props.listCate}
                    keyExtractor={(item) => item.Id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => props.scrollToLine(index)}>
                            <View>
                                <Text
                                    style={[
                                        styles.categoryItem,
                                        props.selectedIndex === index &&
                                            styles.selectedCategoryItem
                                    ]}>
                                    {item.Name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        );
    } else {
        return null;
    }
};

export default ListCategories;
