import React, { useEffect, useRef } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { helper } from '@app/common';
import styles from './style';

const ListLineTitle = (props) => {
    const scrollList = useRef();
    useEffect(() => {
        if (helper.isNumber(props.selectedIndex)) {
            scrollList.current?.scrollToIndex({
                animated: true,
                index: props.selectedIndex
            });
        }
    }, [props.selectedIndex]);
    if (props.listCate != null && props.listCate.length > 0) {
        return (
            <View style={styles.boxCategory}>
                <FlatList
                    ref={scrollList}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={props.listCate}
                    keyExtractor={(item) => item.Id}
                    initialScrollIndex={props.selectedIndex}
                    onScrollToIndexFailed={(info) => {
                        const wait = new Promise((resolve) =>
                            setTimeout(resolve, 500)
                        );
                        wait.then(() => {
                            scrollList.current?.scrollToIndex({
                                index: info.index,
                                animated: true
                            });
                        });
                    }}
                    snapToAlignment="center"
                    snapToInterval={Dimensions.get('window').width / 2}
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
            </View>
        );
    } else {
        return null;
    }
};

export default React.memo(ListLineTitle);
