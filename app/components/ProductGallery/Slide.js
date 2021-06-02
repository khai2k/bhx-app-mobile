import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import ImageZoom from 'react-native-image-pan-zoom';

export default function Slide(props) {
    const [isZooming, setIsZooming] = useState(false);
    const { index, screenWidth, image, screenHeight, state } = props;
    if (
        (state.currentShowIndex || 0) > index + 1 ||
        (state.currentShowIndex || 0) < index - 1
    ) {
        return (
            <View
                key={index}
                style={{ width: screenWidth, height: screenHeight }}
            />
        );
    }

    if (!props.handleLongPressWithIndex.has(index)) {
        props.handleLongPressWithIndex.set(
            index,
            props.handleLongPress.bind(props, image)
        );
    }
    let imageRefs = null;
    let width = state.imageSizes[index] && state.imageSizes[index].width;
    let height = state.imageSizes[index] && state.imageSizes[index].height;
    const imageInfo = state.imageSizes[index];

    if (!imageInfo || !imageInfo.status) {
        return (
            <View
                key={index}
                style={{ width: screenWidth, height: screenHeight }}
            />
        );
    }

    if (width > screenWidth) {
        const widthPixel = screenWidth / width;
        width *= widthPixel;
        height *= widthPixel;
    }

    if (height > screenHeight) {
        const HeightPixel = screenHeight / height;
        width *= HeightPixel;
        height *= HeightPixel;
    }

    const handleScale = () => {
        isZooming ? imageRefs.reset() : imageRefs.reset();
    };
    const Wrapper = ({ children, ...others }) => (
        <ImageZoom
            cropWidth={width}
            cropHeight={height}
            maxOverflow={props.maxOverflow}
            horizontalOuterRangeOffset={props.handleHorizontalOuterRangeOffset}
            responderRelease={props.handleResponderRelease}
            onMove={props.onMove}
            onLongPress={props.handleLongPressWithIndex.get(index)}
            onClick={props.handleClick}
            onDoubleClick={props.handleDoubleClick}
            enableSwipeDown={props.enableSwipeDown}
            swipeDownThreshold={props.swipeDownThreshold}
            onSwipeDown={props.handleSwipeDown}
            pinchToZoom={props.enableImageZoom}
            enableDoubleClickZoom={props.enableImageZoom}
            doubleClickInterval={props.doubleClickInterval}
            {...others}>
            {children}
        </ImageZoom>
    );
    switch (imageInfo.status) {
        case 'loading':
            return (
                <Wrapper
                    key={index}
                    style={{
                        ...props.styles.modalContainer,
                        ...props.styles.loadingContainer
                    }}
                    imageWidth={screenWidth}
                    imageHeight={screenHeight}>
                    <View style={props.styles.loadingContainer}>
                        {props.loadingRender()}
                    </View>
                </Wrapper>
            );
        case 'success':
            if (!image.props) {
                image.props = {};
            }

            if (!image.props.style) {
                image.props.style = {};
            }
            image.props.style = {
                ...props.styles.imageStyle, // User config can override above.
                ...image.props.style,
                width,
                height
            };

            if (typeof image.props.source === 'number') {
                // source = require(..), doing nothing
            } else {
                if (!image.props.source) {
                    image.props.source = {};
                }
                image.props.source = {
                    uri: image.url,
                    ...image.props.source
                };
            }
            if (props.enablePreload) {
                props.preloadImage(state.currentShowIndex || 0);
            }

            return (
                <View>
                    <TouchableOpacity onPress={handleScale}>
                        <Text>khai ngo</Text>
                    </TouchableOpacity>

                    <ImageZoom
                        key={index}
                        ref={(el) => (imageRefs = el)}
                        cropWidth={width}
                        cropHeight={height}
                        maxOverflow={props.maxOverflow}
                        horizontalOuterRangeOffset={
                            props.handleHorizontalOuterRangeOffset
                        }
                        responderRelease={props.handleResponderRelease}
                        onMove={props.onMove}
                        onLongPress={props.handleLongPressWithIndex.get(index)}
                        onClick={props.handleClick}
                        onDoubleClick={props.handleDoubleClick}
                        imageWidth={width}
                        imageHeight={height}
                        enableSwipeDown={props.enableSwipeDown}
                        swipeDownThreshold={props.swipeDownThreshold}
                        onSwipeDown={props.handleSwipeDown}
                        panToMove={!state.isShowMenu}
                        pinchToZoom={props.enableImageZoom && !state.isShowMenu}
                        enableDoubleClickZoom={
                            props.enableImageZoom && !state.isShowMenu
                        }
                        doubleClickInterval={props.doubleClickInterval}
                        minScale={props.minScale}
                        maxScale={props.maxScale}>
                        {props.renderImage(image.props)}
                    </ImageZoom>
                </View>
            );
        case 'fail':
            return (
                <Wrapper
                    key={index}
                    style={props.styles.modalContainer}
                    imageWidth={
                        props.failImageSource
                            ? props.failImageSource.width
                            : screenWidth
                    }
                    imageHeight={
                        props.failImageSource
                            ? props.failImageSource.height
                            : screenHeight
                    }>
                    {props.failImageSource &&
                        props.renderImage({
                            source: {
                                uri: props.failImageSource.url
                            },
                            style: {
                                width: props.failImageSource.width,
                                height: props.failImageSource.height
                            }
                        })}
                </Wrapper>
            );

        default:
            break;
    }
}
