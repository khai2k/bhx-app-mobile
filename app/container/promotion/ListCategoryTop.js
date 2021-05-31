import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import React from 'react';
import { styles } from './styles';

const ListCategoryTop = (props) => {
    return (
        <View style={styles.listCategory}>
            <FlatList
                horizontal
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                windowSize={60}
                showsHorizontalScrollIndicator={false}
                data={props.lstCategoryTop}
                keyExtractor={(item) => item.Id}
                renderItem={(item) => {
                    return (
                        item.item.Id !== 8686 && (
                            <RenderCategory
                                item={item}
                                setGroupCateFilter={props.setGroupCateFilter}
                            />
                        )
                    );
                }}
            />
        </View>
    );
};

const RenderCategory = React.memo((props) => {
    const { item } = props.item;
    function handleSelectCateFilter() {
        props.setGroupCateFilter(item.Id);
    }
    return (
        <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => handleSelectCateFilter()}>
            <Image
                style={styles.iconCategory}
                source={{ uri: `https://${item.ImgUrl}` }}
            />
            <Text style={styles.nameCategory}>{item.Name} </Text>
        </TouchableOpacity>
    );
});

export default ListCategoryTop;
