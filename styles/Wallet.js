import {StyleSheet} from 'react-native'

const styles = ({
    ...theme
}) => {
    return StyleSheet.create({
        top : {
            height : 313,
            width : '100%',
            position : 'relative'
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
        }

    })
}


export default styles