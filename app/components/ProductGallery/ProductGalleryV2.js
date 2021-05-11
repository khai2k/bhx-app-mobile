import React from 'react';
import { Dimensions, Image } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

const ProductSliderV2 = () => {
    return (
        <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={200}
            imageHeight={200}>
            <Image
                style={{ width: 200, height: 200 }}
                source={{
                    uri:
                        'https://cdn.tgdd.vn/Products/Images/2282/88223/bhx/thung-24-chai-budweiser-330ml-201905281439182449.jpg'
                }}
            />
        </ImageZoom>
    );
};

export default ProductSliderV2;
