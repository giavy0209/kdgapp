import {StyleSheet, Dimensions} from 'react-native'
const {height} = Dimensions.get('window')
const styles = ({
    ...theme
}) => {
    return StyleSheet.create({
        link : {
            textDecorationLine :'underline',
            textDecorationColor : theme.hlcolor,
            color : theme.hlcolor,
            fontSize : theme.font16,
        },
        linkweb : {
            color : theme.linkcolor,
            fontSize : theme.font16,
        },
        center : {
            justifyContent : 'center',
            alignItems : 'center'
        },
        left : {
            alignItems : 'flex-start'
        },  
        right : {
            alignItems : 'flex-end'
        },  
        fullSize : {
            width : '100%',
            height : '100%',
        },
        toast : (type,visible) => {
            return {
                position : 'absolute',
                zIndex : 99,
                right : 0,
                marginTop : 40,
                marginRight : 10,
                borderRadius : 25,
                paddingHorizontal : 10,
                backgroundColor: type === 0 ? '#ff0000' : '#00ff00',
                opacity : visible ? 1 : 0
            }
        },
        toastText : {
            color : theme.titlecolor,
            fontSize : theme.font16
        },
        container : {
            paddingHorizontal : 15,
            paddingBottom : 15,
        },
        row : {
            display : 'flex',
            flexDirection : 'row',
        },
        flexSize : {
            flex : 1
        },
        iconPadding : {
            padding : 13
        },
        tc : {
            textAlign : 'center'
        },
        tr : {
            textAlign : 'right'
        },
        text : {
            color : theme.maincolor,
            fontSize : theme.font16
        },
        textMain : {
            color : theme.maincolor,
            fontSize : theme.font16
        },
        textSub : {
            color : theme.subcolor,
            fontSize : theme.font16
        },
        textTitle : {
            color : theme.titlecolor,
            fontSize : theme.font16
        },
        textHL: {
            color : theme.hlcolor,
            fontSize : theme.font16
        },
        font12 : {
            fontSize : theme.font12
        },
        font14 : {
            fontSize : theme.font14
        },
        font16 : {
            fontSize : theme.font16
        },
        font18 : {
            fontSize : theme.font18
        },
        font20 : {
            fontSize : theme.font20
        },
        font22 : {
            fontSize : theme.font22
        },
        font24 : {
            fontSize : theme.font24
        },
        font26 : {
            fontSize : theme.font26
        },
        fullSizeAbsolute : {
            position : 'absolute',
            width : '100%',
            height : '100%',
            top : 0,
            left : 0,
        },
        background : {
            backgroundColor : theme.bgcolor
        },
        bgo: (o) =>{
            o = o ? o : .4
            return{
            backgroundColor : `rgba(40,51,73 , ${o})`
        }},
        radius : {
            borderRadius : 5
        },
        mr : {
            marginRight : 10
        },
        ml : {
            marginLeft : 10
        },
        mt : {
            marginTop : 10
        },
        pd : {
            padding : 15,
        },
        pv : {
            paddingVertical : 15
        },
        ph : {
            paddingHorizontal : 15
        },
        pl : {
            paddingLeft : 15,
        },
        row_col : (margin) => {
            margin = margin ? margin : -15
            return {
                marginHorizontal : margin,
                display : 'flex',
                flexWrap : 'wrap',
                flexDirection : 'row',
            }
        },  
        column : (column,index, padding ) => {
            padding = padding ? padding : 15;
            return {
                paddingHorizontal : padding,
                width : (100 / column) + '%',
                marginTop : index >= column ? padding : 0
            }
        }
    })
}


export default styles