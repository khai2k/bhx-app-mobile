import { StyleSheet } from 'react-native';
import { Colors } from '@app/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    infoContainer: {
        backgroundColor: Colors.WHITE,
        height: '35%',
        marginTop: 10
    },
    purchaseContainer: {
        backgroundColor: Colors.WHITE,
        height: '35%',
        marginTop: 10
    },
    infoLine: {
        flexDirection: 'row',
        marginBottom: 5,
        marginLeft: 10
    },
    PMHbox: {
        justifyContent: 'center',
        padding: 2,
        borderRadius: 5,
        borderColor: Colors.GREEN_PRIMARY,
        borderWidth: 1,
        marginLeft: 10
    },
    PHMText: {
        bottom: 0.5,
        fontSize: 12,
        color: Colors.GREEN_PRIMARY
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 50,
        backgroundColor: Colors.BLACK,
        marginTop: 8,
        marginRight: 5
    },
    dotActive: {
        width: 5,
        height: 5,
        borderRadius: 50,
        backgroundColor: Colors.GREEN_PRIMARY
    },
    viewTitle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textTitle: {
        fontSize: 17,
        color: Colors.GREEN_PRIMARY,
        fontWeight: 'bold',
        marginBottom: 10
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    box: {
        width: '50%',
        height: 50,
        borderColor: Colors.GREEN_PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 5
    },
    boxRow: {
        width: '50%',
        height: 50,
        borderColor: Colors.GREEN_PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 5,
        flexDirection: 'row'
    },
    editBox: {
        borderWidth: 1,
        backgroundColor: '#E4E9F2',
        borderColor: '#D6E0F5',
        width: '50%',
        height: 50,
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'center'
    },
    buttonContainer: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5
    },
    EPurchaseContainer: {
        marginLeft: 15,
        marginRight: 15
    },
    textButton: {
        textAlign: 'center',
        color: Colors.GREEN_PRIMARY,
        fontWeight: 'bold'
    },
    editTextButton: {
        textAlign: 'center',
        color: Colors.GREEN_PRIMARY
    },
    doneIcon: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
        marginBottom: 10,
        marginRight: 5
    },
    backToHomeText: {
        textAlign: 'center',
        color: Colors.GREEN_PRIMARY,
        marginTop: 5
    },
    imageDone: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
        position: 'absolute',
        left: 20
    },
    iconEdit: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
        marginRight: 3
    },
    editText: {
        textAlign: 'center',
        color: '#8F9BB3',
        fontSize: 11
    },
    textInternetbanking: {
        textAlign: 'center',
        color: Colors.GREEN_PRIMARY,
        fontSize: 13
    },
    modalContainer: {
        flex: 1
    },
    modalView: {
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20
    },
    textInput: {
        width: '100%',
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10
    },
    modalButtonView: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between'
    },
    cancelButton: {
        backgroundColor: '#DFDFDF',
        padding: 7,
        borderRadius: 5,
        width: '47%',
        justifyContent: 'center'
    },
    canceltext: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    confirmButton: {
        backgroundColor: Colors.GREEN_PRIMARY,
        padding: 7,
        borderRadius: 5,
        width: '47%',
        justifyContent: 'center'
    },
    confirmText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    checkBoxText: {
        margin: 6
    }
});

export default styles;
