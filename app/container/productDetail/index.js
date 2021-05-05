import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions, ScrollView, Modal } from 'react-native';
import FlatListSlider from '/components/imageSlider/flatListSlider.js';

const white = 'green';
const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
        flex: 1
    },
    separator: {
        height: 20,
    },
    contentStyle: {
        paddingHorizontal: 16,
    }
});

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    url:
                        'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
                },
                {
                    url:
                        'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
                },
                {
                    url:
                        'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                },
                {
                    url:
                        'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                },
                {
                    url:
                        'https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
                },
            ],
            isShowModalSlider: false,
            crrImageIndex: 0,
        };
    }

    render() {
        const screenWidth = Math.round(Dimensions.get('window').width);
        return (
            <ScrollView>

                <FlatListSlider
                    data={this.state.data}
                    timer={10000}
                    imageKey={'url'}
                    local={false}
                    width={screenWidth}
                    separator={0}
                    loop={true}
                    autoscroll={false}
                    currentIndexCallback={index => { this.setCrrImageIndex(index) }}
                    onPress={item => this.handleEventSliderClick(item)}
                    indicator={false}
                    showTotalNumber
                    animation={false}
                    showArrow
                    totalNumberStyle
                />
            </ScrollView>
        );
    }

    setCrrImageIndex = (idx) => {
        this.setState({ crrImageIndex: idx })
    }

    handleEventSliderClick = (idx) => {
        this.setState({
            isShowModalSlider: true
        })
        //alert(`Position: ${JSON.stringify(item)}`)
    }

    onCloseModalSilder = (idx) => {
        this.setState({
            isShowModalSlider: false
        })
    }
}

const mapStateToProps = function () {
    return {};
};

const mapDispatchToProps = function () {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
