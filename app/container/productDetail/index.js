import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, ScrollView, Modal, Image } from 'react-native';
// eslint-disable-next-line import/no-absolute-path
import FlatListSlider from '/components/imageSlider/flatListSlider';
import SmartGallery from 'react-native-smart-gallery';
class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    uri:
                        'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
                },
                {
                    uri:
                        'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80'
                },
                {
                    uri:
                        'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
                },
                {
                    uri:
                        'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
                },
                {
                    uri:
                        'https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80'
                }
            ],
            isShowModal: false,
            crrImgIdx: 0
        };
    }

    render() {
        const screenWidth = Math.round(Dimensions.get('window').width);
        const { isShowModal, data, crrImgIdx } = this.state;
        return (
            <ScrollView>
                <FlatListSlider
                    data={data}
                    timer={10000}
                    imageKey="uri"
                    local={false}
                    width={screenWidth}
                    separator={0}
                    loop
                    autoScroll={false}
                    currentIndexCallback={(index) => {
                        this.setCrrImageIndex(index);
                    }}
                    onPress={(item) => this.handleEventSliderClick(item)}
                    indicator={false}
                    showTotalNumber
                    animation={false}
                    showArrow
                    totalNumberStyle
                />
                <Modal visible={isShowModal}>
                    <SmartGallery
                        images={data}
                        index={crrImgIdx}
                        sensitiveScroll={false}
                        onSwipeDownReleased={() => this.setModalVisible(false)}
                        onSwipeUpReleased={() => this.setModalVisible(false)}
                        onPageSelected={(index) => this.setCrrImageIndex(index)}
                    />
                </Modal>
            </ScrollView>
        );
    }

    setModalVisible = (visible) => {
        this.setState({ isShowModal: visible });
    };

    setCrrImageIndex = (idx) => {
        this.setState({ crrImgIdx: idx });
        console.log(idx);
    };

    handleEventSliderClick = (idx) => {
        this.setState({ isShowModal: true, crrImgIdx: idx });
    };
}

const mapStateToProps = function () {
    return {};
};

const mapDispatchToProps = function () {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
