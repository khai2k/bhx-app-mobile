import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { MyText } from '@app/components';
import { setI18nConfig } from '@app/translate';
import styles from './style';
import * as actionAuthenCreator from './action';

class Splash extends Component {
    constructor(props) {
        super(props);
        setI18nConfig();
        this.state = {};
    }
    
    componentDidMount() {
        const { isShowSplash } = this.props;
        if (isShowSplash) {
            const delay = 1000 * 3;
            setTimeout(() => {
                this.props.actionAuthen.show_splash(false);
            }, delay);
        }
    }

    render() {
        return (
            <View style={styles.conainer}>
                <MyText text="SPLASH" addSize={10} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    console.log('mapStateToProps authenReducer');
    return {
        isShowSplash: state.authenReducer.isShowSplash
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionAuthen: bindActionCreators(actionAuthenCreator, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
