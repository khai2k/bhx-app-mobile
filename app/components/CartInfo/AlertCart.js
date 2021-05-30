// import liraries
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '@app/styles';
import Dialog, {
    DialogTitle,
    DialogFooter,
    DialogButton
} from 'react-native-popup-dialog';

// create a component
const AlertCart = (props) => {
    console.log('AlertCart', props.visible);
    const [visibleAlert, setVisibleAlert] = useState(props.visible);
    useEffect(() => {
        setVisibleAlert(props.visible);
        console.log('useEffect', visibleAlert);
    });
    return (
        <Dialog
            visible={visibleAlert}
            onHardwareBackPress={() => {
                return true;
            }}
            onTouchOutside={() => {
                //  setVisibleAlert(false);
            }}
            dialogTitle={<DialogTitle title={props.titleAlert} />}
            footer={
                <DialogFooter>
                    <DialogButton
                        textStyle={styles.btnAlertClose}
                        text="Không xóa"
                        onPress={() => {
                            //  setVisibleAlert(false);
                        }}
                    />
                    <DialogButton
                        style={styles.btnAlert}
                        textStyle={styles.btnAlert}
                        text="Đồng ý"
                        onPress={props.onPressSubmit}
                    />
                </DialogFooter>
            }
        />
    );
};

// define your styles
const styles = StyleSheet.create({
    btnAlert: {
        backgroundColor: Colors.GREEN_KEY,
        color: Colors.WHITE
    },
    btnAlertClose: {
        color: Colors.GRAY_ALERT_CLOSE
    }
});

// make this component available to the app
export default AlertCart;
