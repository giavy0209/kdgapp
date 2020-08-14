import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    searchBoxContainer: {
        borderRadius: 25,
        backgroundColor: 'rgba(46,47,79,0.4)',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 9,
        height: 45,
        flexDirection: 'row',
        paddingLeft: 20

    },
    searchBox: {
        color: '#8a8c8e'
    },
    iconSearch: {
        marginTop: 15,
        paddingRight: 30
    },

    // ------------ List style -----------------
        listContainer: {
           marginTop: 22,
           marginLeft: 15,
           flexDirection: 'row',
        },
        textList: {
            fontSize: 16,
            color: 'white',

        },
        description: {
            fontSize: 13,
            color: '#74767a',
        },
        exchangeRate: {
            fontSize: 16,
            color: 'rgba(241,243,244, 0.7)',

        },
        nearExchangeRate: {
            fontSize: 13,
            color: '#74767a',
        },

// ---------WithdrawPage2----------

    // ------ Số dư ------------
        balanceContainer: {
            borderRadius: 10,
            borderColor: '#cc9e00',
            marginLeft: 16,
            marginRight: 16,
            marginTop: 10,
            height: 80,
            flexDirection: 'row',
            paddingLeft: 5,
            borderWidth: 2,
            marginBottom: 30,
        },
        coinName: {
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',

        },
        balance: {
            fontSize: 13,
            color: '#74767a',
        },
    // ------ Số tiền gửi ------------
        numberSendContainer: {
            borderRadius: 10,
            marginLeft: 16,
            marginRight: 16,
            marginTop: 9,
            height: 100,
            flexDirection: 'row',
            paddingLeft: 5,
            backgroundColor: 'rgba(26,36,56, 0.8)',
            marginBottom: 15
        },
        coinName: {
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',

        },
        balance: {
            fontSize: 13,
            color: '#74767a',
        },
        nearSymbol: {
            color: 'rgba(241, 243, 244, 0.5)',
            fontSize: 40
        },
        inputNumContainer: {
            flexDirection: 'column',
            borderRadius: 10,
            backgroundColor: 'white',
            marginLeft: 16,
            marginRight: 16,
            marginTop: 9,
            height: 45,
            flexDirection: 'row',   
            width: 150,
    
        },
        inputNumContainer2: {
            flexDirection: 'column',
            borderRadius: 10,
            backgroundColor: 'white',
            marginLeft: 16,
            marginRight: 16,
            marginTop: 9,
            height: 45,
            flexDirection: 'row',   
            width: '100%',
    
        },
        inputNum: {
            color: '#8a8c8e',
        },
        numberSendContainer2: {
            borderRadius: 10,
            marginLeft: 16,
            marginRight: 16,
            marginTop: 9,
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(26,36,56, 0.8)',
            marginBottom: 15
        }
        


})

export default styles