import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {  View, Text, Image, StyleSheet, Dimensions, Clipboard} from 'react-native';
import {LineChart } from 'react-native-chart-kit'
import {mainStyles} from '../../../styles'
import {Header2} from '../../Header'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faCopy, faFilter } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App({coin = 'BTC'}){
    return (
        <>
            <Header2 title={coin} />       
            <View style={[mainStyles.container]}>
                <View style={{flexDirection: 'row',justifyContent: 'center', paddingVertical: 20}}>
                   <View> 
                        <Text style={{color: '#fff', fontSize: (windowWidth*windowHeight)/10000, textAlign: 'center'}}>$4123</Text>
                        <Text style={{color: '#26a65b', fontSize: (windowWidth*windowHeight)/22000, textAlign: 'center'}}>+$15000(2.57%)</Text>
                   </View>
                   <View style={{flexDirection: 'row', position: 'absolute', top: 25, right: 25, alignItems: 'center'}}>
                        <Text style={{color: 'rgba(255,255,255,0.6)', fontSize: (windowWidth*windowHeight)/21000}}>7 ngày</Text>
                        <FontAwesomeIcon size={15} color="rgba(255,255,255,0.6)" icon={faAngleDown}/>
                   </View>
                </View>
                <LineChart
                data={{
                labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
                datasets: [
                    {
                    data: [
                        10,9,8,7,6,6,7,8,9,10,11,12,13,14,15,16
                    ]
                    }
                ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={10} // optional, defaults to 1
                chartConfig={{
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientToOpacity: 0,
                    decimalPlaces: 2,
                    fillShadowGradient: '#e8bf23',
                    fillShadowGradientOpacity: .37,
                    color: () => '#edd174',
                    labelColor: () => '#8a8c8e',
                    propsForBackgroundLines: {strokeWidth: 1 , stroke: '#000',strokeDasharray: '',strokeOpacity: .2},
                    barPercentage: 0
                }}
                withVerticalLines={false}
                // withDots={false}
                withOuterLines={false}
                fromZero={true}
                onDataPointClick={({value, dataset, getColor})=>{
                    console.log(getColor());
                }}
                />

                <TouchableOpacity 
                    onPress={() => Clipboard.setString('TS8jRFiS3sjnwwJMAydZifV9Bas3rKgFFu')}
                    style={{padding: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'rgba(29,38,59,0.6)', borderRadius: 5}}>
                        <Text style={{color: 'rgba(255,255,255, 0.7)'}}>TS8jRFiS3sjnwwJMAydZifV9Bas3rKgFFu</Text>
                        <FontAwesomeIcon size={15} color="#fac800" icon={faCopy}/>
                    </View>
                </TouchableOpacity>

                <View style={{padding: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <View>
                            <Text style={{color: '#deb306', fontSize: 18}}>Lịch sử</Text>
                        </View>
                        <View style={{flexDirection: 'row' ,position: 'absolute', top: 2, right: 2, alignItems: 'center'}}>
                            <Text style={{color: 'rgba(255,255,255,0.4)', fontSize: 14}}>Tất cả </Text>
                            <FontAwesomeIcon size={12} color="rgba(255,255,255,0.4)" icon={faFilter}/>
                        </View>
                    </View>
                    <View style={{backgroundColor: 'rgba(28,38,59,0.7)', borderRadius: 5, padding: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={{color: 'rgba(255,255,255,0.8)', fontSize: 14}}>Nhận</Text>
                            <Text style={{color: 'rgba(255,255,255,0.5)', fontSize: 12}}>08:21 - 20/02/20</Text>
                        </View>
                        <View>
                            <Text style={{color: 'rgba(255,255,255,0.8)', fontSize: 14}}>+0.1 BTC</Text>
                            <Text style={{color: '#26a65b', fontSize: 12, fontStyle: 'italic'}}>Thành công</Text>
                        </View>
                        
                        
                    </View>
                </View>
            </View>     
        </>
    )
}