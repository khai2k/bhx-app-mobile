import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    infoContainer: {
        backgroundColor: 'white',
        height: '35%',
        marginTop: 10
    },
    purchaseContainer: {
        backgroundColor: 'white',
        height: '35%',
        marginTop: 10
    },
    infoLine: {
        flexDirection: 'row',
        marginBottom: 5,
        marginLeft: 10
    },
    PMHbox: {
        borderRadius: 5,
        borderColor: 'green',
        borderWidth: 1,
        marginLeft: 10
    },
    PHMText: {
        fontSize: 12,
        color: 'green'
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 50,
        backgroundColor: 'black',
        marginTop: 8,
        marginRight: 5
    },
    dotActive: {
        width: 5,
        height: 5,
        borderRadius: 50,
        backgroundColor: 'green'
    },
    viewTitle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textTitle: {
        fontSize: 17,
        color: 'green',
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
        borderColor: 'green',
        justifyContent: 'center',
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
        borderColor: 'green',
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
        marginBottom: 5
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
        color: 'green',
        fontWeight: 'bold'
    },
    editTextButton: {
        textAlign: 'center',
        color: 'green'
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
        color: 'green',
        marginTop: 5
    },
    imageDone: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
        position: 'absolute',
        left: -35
    },
    iconEdit: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
        position: 'absolute',
        left: 25
    },
    editText: {
        textAlign: 'center',
        color: '#8F9BB3',
        fontSize: 11
    },
    textInternetbanking: {
        textAlign: 'center',
        color: 'green',
        fontSize: 13
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
        borderWidth: 3,
        borderColor: 'green'
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
        backgroundColor: 'green',
        padding: 7,
        borderRadius: 5,
        width: '47%',
        justifyContent: 'center'
    },
    confirmText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    checkBoxText: {
        margin: 6
    }
});

export default styles;
