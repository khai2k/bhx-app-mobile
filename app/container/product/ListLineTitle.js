import React, { useEffect, useRef } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import styles from './style';

const ListLineTitle = (props) => {
    const scrollList = useRef();
    useEffect(() => {
        scrollList.current.scrollToIndex({
            animated: true,
            index: props.selectedIndex
        });
    }, [props.selectedIndex]);
    if (props.listCate != null && props.listCate.length > 0) {
        return (
            <SafeAreaView style={styles.boxCategory}>
                <FlatList
                    ref={scrollList}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={props.listCate}
                    keyExtractor={(item) => item.Id}
                    initialNumToRender={20}
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
                                    {item.Text}
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

export default React.memo(ListLineTitle);
