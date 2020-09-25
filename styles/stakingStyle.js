import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
  tableHeaderContainer: {
    flex: 1, 
    backgroundColor: 'rgba(26,37,56, 0.6)',
  },
  tableHeaderTextContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 70
  },
  tableHeaderText: {
    color: 'rgba(225, 225, 225, 0.6)', 
    fontSize: 14, 
    textAlign: 'center'
  },
  tableContentContainer: {
    flex: 1, 
    backgroundColor: 'rgba(26,37,56, 0.9)',
  },
        firstTableContentContainerOnly: {
            backgroundColor: 'rgba(26,37,56, 0.9)',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10
        },
  tableContentTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    paddingLeft: 10
  },
  tableContentText: {
    color: 'rgba(225, 225, 225, 0.9)', 
    fontSize: 14,
  },


})

export default styles