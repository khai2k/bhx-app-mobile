import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Modal
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import FakeData from '../../components/ProductGallery/FakeData';

const ProductArticle = () => {
    const [showModal, setshowModal] = useState(false);
    const [imageIndex, setimageIndex] = useState(0);
    const images = FakeData.map((s) => ({ url: s.uri }));

    return (
        <View>
            <TouchableOpacity>
                <Text>
                    Thùng 12 lon bia Budweiser 500ml là thương hiệu bia Mỹ
                    thượng hạng, bia có nồng độ cồn 5%, thành phần hoàn toàn tự
                    nhiên, vị ít đắng và dễ uống, sản xuất tại VN. Xem chi tiết
                </Text>
                <Text>13123123123</Text>
                <Text>345435435</Text>
                <Text>68768678</Text>
            </TouchableOpacity>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={FakeData}
                horizontal
                pagingEnabled
                style={{ width: 360, height: 350 }}
                renderItem={({ item, index }) => {
                    console.log(item.uri);
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setimageIndex(index);
                                setshowModal(true);
                            }}>
                            <Image
                                source={{ uri: item.uri }}
                                resizeMode="stretch"
                                // eslint-disable-next-line react-native/no-color-literals
                                style={{
                                    alignSelf: 'center',
                                    height: 350,
                                    marginVertical: 10,
                                    width: 360,
                                    borderRadius: 7,
                                    backgroundColor: '#A9A9A9'
                                }}
                            />
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item.uri}
            />

            <Modal
                visible={showModal}
                transparent
                onSwipeDown={() => setshowModal(false)}>
                <ImageViewer
                    imageUrls={images}
                    index={imageIndex}
                    onSwipeDown={() => setshowModal(false)}
                    // onMove={data => console.log(data)}
                    enableSwipeDown
                />
            </Modal>
        </View>
    );
};

export default ProductArticle;
