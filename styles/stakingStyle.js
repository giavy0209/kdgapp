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
            backgroundColor: 'rgba(26,37,56, 0.5)', 
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
            fontSize: 12,
        },
        tableContentContainer: {
            backgroundColor: 'rgba(26,37,56, 0.8)', 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            marginTop: windowHeight/155
        },
        titleContent: {
            color: 'rgba(255,255,255, 0.7)', 
            textAlign: 'center', 
            fontSize: 14,
            paddingLeft: 5
        },

        // ----------------Staking History-------------------------
        titleHeaderStakingHistory: {
            color: 'rgba(255,255,255,0.7)', 
            textAlign: 'center', 
            fontSize: 12,
            fontStyle: 'italic',
            color: '#fac800'
        },
        titleContentStakingHistory: {
            color: 'rgba(255,255,255,0.8)', 
            textAlign: 'center', 
            fontSize: 12
        },
        tableContentStackingHistoryContainer: {
            flexDirection: 'row', 
            justifyContent: 'space-between',
            borderBottomColor: 'rgba(65,71,86,0.7)',
            borderBottomWidth: 1,
            paddingVertical: 5,
            marginTop: windowHeight/100
        },


        // ----------------Staking Joining-------------------------

        coinName: {
            color: 'white', 
            paddingBottom: windowHeight/30, 
            fontSize: 15
        },
        timeContainer: {
            width: (windowHeight/60)*25.75, 
            paddingBottom: 5, 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center'
        },
        timeName: {
            color: 'rgba(255,255,255,0.7)', 
            width: '33.33%', 
            fontSize: 10
        },
        dateContainer: {
            width: (windowHeight/60)*25.75, 
            paddingTop: 5, 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center'
        },
        dateName: {
            color: 'rgba(255,255,255,0.9)', 
            width: '33.33%', 
            fontSize: 11, 
        },
        mainStakingContainer: {
            padding: (windowWidth*windowHeight)/29376, 
            backgroundColor: 'rgba(29,37,54,0.8)'
        }, 
        stakingNumberContainer: {
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginVertical: 10
        },
        numberOrderContainer: {
            backgroundColor: 'rgba(16,20,34, 0.8)', 
            width: (windowWidth*windowHeight)/10125, 
            height: (windowWidth*windowHeight)/10125 , 
            borderRadius: 10, 
            justifyContent: 'center', 
            alignItems: 'center'
        },
        dashSymbol: {
            color: '#rgba(138,140,142, 0.8)', 
            fontSize: 13
        },
        valueStaking: {
            color: '#fff', 
            fontSize: 17, 
            position: 'absolute', 
            bottom: windowHeight/333, 
            left: windowWidth/6
        },
        interestReceiveContainer: {
            flexDirection: 'row', 
            justifyContent: 'center', 
            backgroundColor: '#fcf7bb', 
            margin: (windowWidth*windowHeight)/3573 , 
            marginVertical: windowHeight/100 , 
            padding: (windowWidth*windowHeight)/12506,
            paddingVertical: windowHeight/80, 
            borderRadius: 5
        },
        interestReceive: {
            color: 'rgba(0,0,0,0.4)', 
            fontSize: 15, 
            fontWeight: 'bold'
        },
        interestReceiveUnit: {
            paddingTop: 5, 
            color: '#fac800', 
            fontSize: 17, 
            fontWeight: 'bold'
        },
        iconInfoContainer: {
            flexDirection: 'row', 
            alignItems: 'center', 
            paddingVertical: 20
        },
        iconInfo: {
            paddingLeft: 10, 
            color: '#fff', 
            fontSize: 13
        },
        termContent: {
            color: 'rgba(255,255,255, 0.6)', 
            paddingBottom: 10, 
            fontSize:  11
        },
        termCheckboxTitle: {
            color: 'rgba(255,255,255,0.5)', 
            fontSize: 12
        },
        checkBox:{
            backgroundColor : '#ddd9d8',
            width: 15,
            height: 15,
            borderRadius: 2,
            position: 'relative',
          },
          checkBoxTick: {
            position: 'absolute',
            top: 3,
            left: 2,
            width: 11,
            height: 9,
          },
        // ----------------Staking Time-------------------------
        stakingTimeContainer: {
            backgroundColor: 'rgba(27,36,56,0.8)',
            borderRadius: 5, 
            padding: 10, 
            flexDirection: 'row', 
            justifyContent: 'space-between'
        },    
        stakingTimeInput: {
            width: '100%',
            borderColor: 'gray', 
            backgroundColor: '#fff', 
            borderRadius: 5, 
            marginVertical: 5, 
            padding: 10
        }

})

export default styles