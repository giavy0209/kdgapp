import {StyleSheet} from 'react-native'

const styles = ({
    ...theme
}) => {
    return StyleSheet.create({
        top : {
            height : 313,
            width : '100%',
        },
        header : {
            marginTop : 54,
            justifyContent : 'space-between'
        },
        headerTitle : {
            fontSize : theme.font24,
            color : theme.titlecolor,
            fontWeight : 'bold'
        },
        headerIconRow : {
            margin : -13
        },
        headerIcon : {
            padding : 13,
            position : 'relative'
        },
        notiCount : {
            position : 'absolute',
            width : 16, 
            height: 16,
            backgroundColor : '#FF0000',
            borderRadius : 50,
            right : 7,
            top : 11
        },
        notiText : {
            color : theme.titlecolor,
            fontSize : theme.font12
        },
        totalBalance : {
            color : theme.hlcolor,
            fontSize : 45
        },
        avaiBalanceBlock : {
            position : 'absolute',
            height : 44,
            width : '100%',
            backgroundColor : '#111826',
            bottom : 0,
            borderTopLeftRadius : 15,
            borderTopRightRadius : 15,
            alignItems : 'center',
        },
        avaiBalanceContainer : {
            position : 'absolute',
            width : '84%',
            height : 66,
            backgroundColor : '#1D2330',
            top : -33,
            borderRadius : 5,
        },
        avaiBalanceContent : {
            width : '50%',
            paddingLeft : 15,
            borderLeftColor : '#707070', 
            borderLeftWidth : 1
        },
        avaiBalanceContentTitle : {
            color : theme.subcolor,
            fontSize : theme.font14
        },
        avaiBalanceContentData : {
            color : theme.titlecolor,
            fontSize : theme.font16
        },
        listCoinHeader : {
            justifyContent : 'space-between',
        },
        listCoinContainer : {
            position : 'relative',
            borderRadius : 5,
            overflow : 'hidden',
        },
        listCoinBg : {
            opacity : .4
        },
        listCoin : {
            padding : 10,
        },
        coinContainer : {
            position : 'relative',
            borderRadius : 5,
            overflow : 'hidden',
        },
        coin : {
            padding : 12,
            justifyContent : 'space-between'
        },
        coinLeft : {

        },
        coinIcon : {
            width : 35,
            height : 35
        },
        withdrawCoinInfo : {
            position : 'relative',
            overflow : 'hidden',
            borderRadius : 5
        },
        withdrawProgress : {
            paddingVertical : 30,
            paddingHorizontal : 15,
            backgroundColor : theme.bgcolor,
            borderRadius : 5,
        },
        inputContainer : {
            width : '40%',
        },
        input : {
            borderRadius : 15,
            backgroundColor : theme.titlecolor,
            paddingVertical : 15,
        },
        inputText : {
            backgroundColor : theme.titlecolor,
            paddingVertical : 7,
            borderRadius : 5,
            color : theme.subcolor,
            width : '100%',
            textAlign : 'center'
        },
        inputFake : {
            borderRadius : 5,
            backgroundColor : 'rgba(255,255,255,.2)',
            textAlign : 'center',
            color : theme.hlcolor,
            paddingVertical : 7,
            width : '100%',
        },
        history : {
            paddingVertical : 14,
            justifyContent : 'space-between',
            borderBottomWidth : 1,
            borderBottomColor : theme.subcolor
        },
        redCircle : {
            width : 40,
            height : 40,
            backgroundColor : '#ff0000',
            borderRadius : 25
        },
        greenCircle : {
            width : 40,
            height : 40,
            backgroundColor : '#26A65B',
            borderRadius : 25
        }
    })
}


export default styles