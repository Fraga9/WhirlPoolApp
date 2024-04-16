import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';

const Progress = ({ currentStep }) => {
    const progress1 = useRef(new Animated.Value(0)).current;
    const progress2 = useRef(new Animated.Value(0)).current;
    const progress3 = useRef(new Animated.Value(0)).current;

    const startAnimation = (progressRef) => {
        Animated.timing(progressRef, {
            toValue: 70,
            duration: 3000,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        if (currentStep === 2) {
            startAnimation(progress1);
        } else if (currentStep === 3) {
            startAnimation(progress1)
            startAnimation(progress2);
        } else if (currentStep === 4) {
            startAnimation(progress1);
            startAnimation(progress2);
            startAnimation(progress3);
        }
    }, [currentStep]);

    return (
        <View style={{flex: 1}}>
            <View style={{width:'100%', alignItems:'center', justifyContent: 'center', flexDirection: 'row'}}>
                <View style={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                    backgroundColor: currentStep > 0 ? '#eeb111':'#D9D9D9',
                    }}/>

                <View style={{width:70,height:6,backgroundColor:'#D9D9D9'}}/>

                <View style={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                    backgroundColor: currentStep > 1 ? '#eeb111':'#D9D9D9',
                    }}/>

                <View style={{width:70,height:6,backgroundColor:'#D9D9D9'}}/>

                <View style={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                    backgroundColor: currentStep > 2 ? '#eeb111':'#D9D9D9',
                    }}/>

                <View style={{width:70,height:6,backgroundColor:'#D9D9D9'}}/>

                <View style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    backgroundColor: currentStep > 3 ? '#eeb111':'#D9D9D9',
                    }}/>
            </View>
            
            <View style={{width:'100%', alignItems:'center', justifyContent: 'center', flexDirection: 'row', position: 'absolute'}}>

                <Animated.View style={{width:progress1,height:6,backgroundColor: '#eeb111', marginTop: 12}}/>

                <Animated.View style={{width:progress2,height:6,backgroundColor: '#eeb111', marginHorizontal:30, marginTop: 12}}/>

                <Animated.View style={{width:progress3,height:6,backgroundColor: '#eeb111', marginTop: 12}}/>

            </View>
                
        </View>

        
    );
}

export default Progress;
