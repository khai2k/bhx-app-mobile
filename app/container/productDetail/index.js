import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, View, Text, Image, FlatList } from 'react-native';
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
            ]
        };
    }

    render() {
        const { screenWidth, screenHeight } = Dimensions.get('window');
        const { isShowModal, data, crrImgIdx } = this.state;
        return (
            <View style={{ width: screenWidth, height: screenHeight, backgroundColor: '#000' }}>
                <Text>1234567890</Text>
                <FlatList
                    style={{ width: screenWidth, height: screenHeight, backgroundColor: '#000' }}
                    data={data}
                    keyExtractor={item => item.uri}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        console.log(item.uri);
                        return (
                            <View style={{ width: screenWidth, height: screenHeight, backgroundColor: '#000' }}>
                                <Image
                                    style={{ width: 200, height: 200 }}
                                    source={{ uri: item.uri }}
                                />
                            </View>
                        )
                    }}
                />
            </View>
        );
    }

    renderThumbnail = () => {

    }
}

const mapStateToProps = function () {
    return {};
};

const mapDispatchToProps = function () {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
