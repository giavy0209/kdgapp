import React, { useState, useCallback, useEffect,useRef} from 'react';
import { View, Dimensions,Animated } from 'react-native';
import { mainStyles as styles } from '../../styles/'
import { transition } from '../../helper'
import {useSelector} from 'react-redux'

import Button from './Button'
import Dots from './Dots'
import ControlsPageButton from './ControlsPageButton'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'

const listPasge = [Page1,Page2, Page3, Page4]

export default function App() {
    const ScreenWidth = useSelector(state=>state.width)
    const ScreenHeight = useSelector(state=>state.height)

    const [DotsPosition, setDotsPosition] = useState(0)
    const [ActivePage, setActivePage] = useState(0)
    
    const [TimeOutID, setTimeOutID] = useState()
    const [TimeOutPage, setTimeOutPage] = useState(0)
    
    const Position = useRef(new Animated.Value(ActivePage  * ScreenWidth  * (-1))).current;

    const count = useCallback((duration, targetTransition) => {
        if(!duration) duration = 300
        if(!targetTransition) targetTransition = ActivePage + 1
        if (ActivePage < (listPasge.length - 1)) {
            clearTimeout(TimeOutID)
            Animated.timing(Position, {
                toValue: -(targetTransition  * ScreenWidth),
                duration: duration,
                useNativeDriver: false
            }).start();

            setActivePage(targetTransition)

        }
    }, [ActivePage,ScreenWidth])

    useEffect(()=>{
        if(ActivePage < (listPasge.length - 1) && ScreenWidth > 10){
            var id = setTimeout(count, 5000);
            setTimeOutPage(ActivePage)
            setTimeOutID(id)
        }
    },[ActivePage,ScreenWidth, count])

    useEffect(()=>{
        if(TimeOutPage !== ActivePage){
            clearTimeout(TimeOutID)
            if(ActivePage < (listPasge.length - 1)){
                var id = setTimeout(count, 5000);
                setTimeOutPage(ActivePage)
                setTimeOutID(id)
            }
        }
    },[TimeOutPage, TimeOutID, ActivePage])
    return (
        <>
        <View style={[styles.container, {width: ScreenWidth, height: ScreenHeight, position: 'relative', }]}>
            <Animated.View
                style={{
                    position: 'absolute',
                    flex: 1,
                    flexDirection:'row',
                    top: 0, 
                    left: Position,
                    width: ScreenWidth,
                    height: ScreenHeight
                }}
            >
                {listPasge.map((Page, index) => {
                    return (
                        <Page
                            key={index}
                            ScreenHeight={ScreenHeight}
                            ScreenWidth={ScreenWidth}
                            setDotsPosition={setDotsPosition}
                        />
                    )
                })}
            </Animated.View>
        <Dots
            ScreenHeight={ScreenHeight}
            ScreenWidth={ScreenWidth}
            ActivePage={ActivePage}
            DotsPosition={DotsPosition}
        />
        <Button
            ScreenHeight={ScreenHeight}
            ScreenWidth={ScreenWidth}
            ActivePage={ActivePage}
        />
        <ControlsPageButton
            count={count}
            ScreenWidth={ScreenWidth}
            ActivePage={ActivePage}
        />
        </View>
        </>
    );
}

