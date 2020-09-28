import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    backgroundHead: {
        paddingTop: 25,
        paddingHorizontal: 13,
        position: 'relative',
        paddingBottom: 11,
    },
    title : {
        fontSize: 16,
        color: '#e0ba54'
    },
    rowHeader: {
        flexDirection: 'row',
        flex: 1,
        alignContent:'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 26,
    },
    itemHeader: {
        width: '33.33333333%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    imageHeader: {
        width: 38,
        height: 38,
    },
    textHeader: {
        color: '#fff',
        fontSize: 12,
        marginTop: 10,
    },
    profileBar : {
        padding: 13,
        backgroundColor: '#ffff',
        flex: 1,
        flexDirection:'row',
        alignItems: 'center',
        // position: 'relative',
        overflow: 'visible',
        marginBottom: 13
    },
    blockAvata: {
        width: 44,
        height: 44,
        borderRadius: 50,
        overflow: 'hidden',
        borderColor: '#e3c05a',
        borderWidth: 1,
    },
    avata: {
        resizeMode: 'cover',
        width: 44,
        height: 44,
    },
    profileBarEmail: {
        marginLeft: 10,
        color: '#283349',
        fontSize: 14,
        fontWeight: 'bold'
    },
    touchPen: {
        width: 36,
        height: 36,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pen: {
        position: 'absolute',
        width: 45,
        height: 45,
        bottom: -14,
        right: 15,
        zIndex: 999,
        borderRadius: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    maskOpacity: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff'
    },
    blockSetting: {
        marginTop: 20,
    },
    settingTitle: {
        fontSize:10,
        color: '#8a8c8e',
        marginBottom: 12,
        paddingLeft:17,
        fontFamily: 'Roboto_700Bold'
    },
    setting: {
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 13,
        alignItems: 'center',
        width: '100%'
    },
    settingLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconBlock: {
        width: 21,
        height: 21
    },
    icon: {
        width: 21,
        height: 21,
        resizeMode: 'contain'
    },
    settingTextLeft: {
        color: '#283349',
        fontSize: 13,
        marginLeft: 18
    },
    settingRight:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    settingTextRight: {
        fontSize: 12,
        color: '#8a8c8e'
    },
    settingBorder: {
        borderTopWidth: 1,
        borderTopColor: '#e8e8e8'
    },
    listFollow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'center',
        width: '100%',
        marginBottom: 15
    },
    followBlock: {
        width: 51,
        height: 51,
        paddingHorizontal: 9,
    },
    followIcon : {
        width: 33,
        height: 33,
        resizeMode: 'contain'
    }
})

export default styles