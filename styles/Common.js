import {StyleSheet} from 'react-native'

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
        fullSize : {
            width : '100%',
            height : '100%',
        },
        toast : (type,visible) => {
            return {
                position : 'absolute',
                right : 0,
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
        }
    })
}


export default styles