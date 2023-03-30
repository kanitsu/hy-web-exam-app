import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Motion } from '@legendapp/motion';
import { Video, ResizeMode } from 'expo-av';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import { ProgressBar } from './ProgressBar';
import MarqueeText from 'react-native-marquee';


export function VideoQueue(): JSX.Element {
    const video = React.useRef(null);
    const [position, setPosition] = useState(0);
    const [status, setStatus] = useState<number[]>([]);
    const urls = [
        'http://localhost:3000/media/Volkswagen_Golf_7.m3u8',
        'http://localhost:3000/media/Toyota_Camry_XV70.m3u8',
        'http://localhost:3000/media/Rolls_Royce_Ghost.m3u8',
    ];

    const swipeUp = Gesture.Fling()
        .direction(Directions.UP)
        .onEnd(() => {
            if (position < urls.length - 1) {
                setPosition(position + 1);
            }
        });
    const swipeDown = Gesture.Fling()
        .direction(Directions.DOWN)
        .onEnd(() => {
            if (position > 0) {
                setPosition(position - 1);
            }
        });

    const handlePlaybackStatusUpdate = (index: number) => (state) => {
        const newStatus = [...status];
        newStatus[index] = state.positionMillis * 100.0 / state.playableDurationMillis;
        setStatus(newStatus);
    }

    return (
        <>
            <GestureDetector gesture={swipeUp}>
                <GestureDetector gesture={swipeDown}>
                    <View style={styles.column}>
                        {urls.map((uri, index) => (
                            <Motion.View style={styles.inner}
                                key={index}
                                animate={{
                                    y: (index - position) * 896,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                }}>
                                <Video
                                    ref={video}
                                    style={styles.video}
                                    source={{ uri }}
                                    useNativeControls={false}
                                    shouldPlay={index == position}
                                    isLooping={true}
                                    resizeMode={ResizeMode.COVER}
                                    onPlaybackStatusUpdate={handlePlaybackStatusUpdate(index)}
                                />
                            </Motion.View>
                        ))}
                    </View>
                </GestureDetector>
            </GestureDetector>
            <ProgressBar progress={status[position]} />
            <View style={styles.marqueeContainer}>
                <MarqueeText
                    style={styles.marquee}
                    speed={0.5}
                    marqueeOnStart={true}
                    loop={true}
                    delay={1000}
                >Lorem Ipsum is simply dummy text of the printing and typesetting industry and typesetting industry.</MarqueeText>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    video: {
        width: '100%',
        height: '100%',
    },
    column: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    inner: {
        position: 'absolute',
        width: 414,
        height: 896,
        overflow: 'hidden',
    },
    marqueeContainer: {
        position: 'absolute',
        bottom: 75,
        left: 10,
        justifyContent: 'center',
        width: '60%',
    },
    marquee: {
        color: '#fff',
        fontSize: 15,
    },
});