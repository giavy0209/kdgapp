import {StyleSheet} from 'react-native'
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

console.log("Width: " + windowWidth + " --- " + "Height: " + windowHeight);
const styles = StyleSheet.create({
        searchBoxContainer: {
        borderRadius: 25,
        backgroundColor: 'rgba(46,47,79,0.4)',
        height: (windowWidth*windowHeight)/7834,
        flexDirection: 'row',
        paddingLeft: (windowWidth*windowHeight)/17625

    },
    searchBox: {
        color: '#8a8c8e'
    },
    iconSearch: {
        marginTop: 15,
        paddingRight: 30
    },

    // ------------ List style -----------------
        textList: {
            fontSize: (windowWidth*windowHeight)/22032,
            color: 'white',

        },
        description: {
            fontSize: (windowWidth*windowHeight)/27116,
            color: '#74767a',
        },
        exchangeRate: {
            fontSize: (windowWidth*windowHeight)/22032,
            color: 'rgba(241,243,244, 0.7)',

        },
        nearExchangeRate: {
            fontSize: (windowWidth*windowHeight)/27116,
            color: '#74767a',
        },

        listContainer : {
            padding: (windowWidth*windowHeight)/23040,
            borderBottomWidth:1,
            borderBottomColor: '#29303d', 
        },

// ---------WithdrawPage2----------

    // ------ Số dư ------------
        balanceContainer: {
            borderRadius: 10,
            borderColor: '#cc9e00',
            borderWidth: 2,
            margin: (windowWidth*windowHeight)/23040,
            padding: (windowWidth*windowHeight)/23040,
        },
        coinName: {
            fontSize: (windowWidth*windowHeight)/16457,
            fontWeight: 'bold',
            color: 'white',
            fontSize:  (windowWidth*windowHeight)/25179

        },
        balance: {
            color: '#74767a',
            fontSize: 14
        },
    // ------ Số tiền gửi ------------
        numberSendContainer: {
            borderRadius: 10,
            margin: (windowWidth*windowHeight)/23040,
            padding: (windowWidth*windowHeight)/23040,
            flexDirection: 'row',
            backgroundColor: 'rgba(26,36,56, 0.8)',
        },
        nearSymbol: {
            color: 'rgba(241, 243, 244, 0.5)',
            fontSize: (windowWidth*windowHeight)/10322
        },
        inputNumContainer: {
            borderRadius: 10,
            backgroundColor: 'white',
            flexDirection: 'row',   
            width: windowWidth/3,
        },
        inputNumContainer2: {
            borderRadius: 10,
            backgroundColor: 'white',
            width: '100%'
    
        },
        inputNum: {
            color: '#8a8c8e',
            fontSize: (windowWidth*windowHeight)/27116,
        }


})

export default styles