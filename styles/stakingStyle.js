import {StyleSheet} from 'react-native'
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

console.log("Width: " + windowWidth + " --- " + "Height: " + windowHeight);
const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: windowHeight/33, 
        paddingHorizontal: windowWidth/21
    },
    tableContainer: {
        backgroundColor: 'rgba(26,37,56, 0.8)', 
        marginTop: windowHeight/66.7, 
        width: '100%', 
        borderRadius: 8, 
        paddingHorizontal: 10, 
        paddingVertical: 5
    },
    tableHeaderContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleHeader: {
        color: 'rgba(255,255,255,0.7)', 
        textAlign: 'center', 
        fontSize: (windowWidth*windowHeight)/25012,
    },
    tableContentContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        borderBottomColor: 'rgba(65,71,86,0.7)',
        borderBottomWidth: 1,
        marginTop: windowHeight/100
    },
    titleContent: {
        color: 'rgba(255,255,255,1)', 
        textAlign: 'center', 
        fontSize: (windowWidth*windowHeight)/25012
    },

    // ----------------Staking History-------------------------
    titleHeaderStakingHistory: {
        color: 'rgba(255,255,255,0.7)', 
        textAlign: 'center', 
        fontSize: (windowWidth*windowHeight)/25012,
        fontStyle: 'italic',
        color: '#fac800'
    },
    titleContentStakingHistory: {
        color: 'rgba(255,255,255,0.8)', 
        textAlign: 'center', 
        fontSize: (windowWidth*windowHeight)/25012
    },
    tableContentStackingHistoryContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        borderBottomColor: 'rgba(65,71,86,0.7)',
        borderBottomWidth: 1,
        paddingVertical: 5,
        marginTop: windowHeight/100
    },


})

export default styles