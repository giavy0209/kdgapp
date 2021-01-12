import {StyleSheet} from 'react-native'

const styles = ({
    ...theme
}) => {
    return StyleSheet.create({
        header : {
            height : 49,
            position : 'relative',
        },
        arrow : {
            height : '100%' ,
            position : 'absolute',
            top : 0,
            left : 0,
            width : 68,
            alignItems : 'center',
            justifyContent : 'center'
        },
        title : {
            position : 'absolute',
            height : '100%',
            width : '100%',
            justifyContent : 'center',
            alignItems : 'center',
        },
        textTitle : {
            color : theme.titlecolor , 
            fontSize : theme.font16
        }
    })
}


export default styles