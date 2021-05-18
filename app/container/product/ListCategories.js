import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Colors } from '@app/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as homeCreator from './action';

const style = StyleSheet.create({
    boxCategory: {
        marginBottom: 5,
        paddingRight: 5
    },
    categoryItem: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.GRAY_MEDIUM,
        borderRadius: 5,
        borderWidth: 1,
        color: Colors.TROPICAL_RAIN_FOREST,
        marginLeft: 5,
        marginTop: 5,
        padding: 10
    }
});

class ListCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.actionHome.get_listcategories();
    }

    render() {
        return (
            <View style={style.boxCategory}>
                <FlatList
                    horizontal
                    data={this.props.HomeReducer.ListCategories}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <View>
                                <Text style={style.categoryItem}>
                                    {item.Name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        HomeReducer: state.homeReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionHome: bindActionCreators(homeCreator, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListCategories);
