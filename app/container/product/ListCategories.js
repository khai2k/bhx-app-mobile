import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import styles from './style';

const ListCategories = (props) => {
    if (props.listCate != null && props.listCate.length > 0) {
        return (
            <View style={styles.boxCategory}>
                <FlatList
                    horizontal
                    data={props.listCate}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <View>
                                <Text style={styles.categoryItem}>
                                    {item.Name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    } else {
        return null;
    }
};

export default ListCategories;
