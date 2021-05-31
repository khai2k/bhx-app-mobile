// import liraries
import React from 'react';
import { Dimensions } from 'react-native';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

// create a component
const LoadingCart = () => {
    //  const { width } = Dimensions.get('window');
    return (
        <ContentLoader
            speed={5}
            width={400}
            height={120}
            viewBox="0 0 400 120"
            backgroundColor="#f2f2f2"
            foregroundColor="#ecebeb">
            <Circle cx="-53" cy="140" r="15" />
            <Rect x="11" y="12" rx="2" ry="2" width="113" height="103" />
            <Rect x="145" y="41" rx="2" ry="2" width="280" height="10" />
            <Rect x="145" y="70" rx="0" ry="0" width="280" height="10" />
            <Rect x="145" y="105" rx="0" ry="0" width="280" height="10" />
            <Rect x="145" y="14" rx="0" ry="0" width="280" height="10" />
        </ContentLoader>
    );
};

export default LoadingCart;
