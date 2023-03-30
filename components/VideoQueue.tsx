import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Motion } from '@legendapp/motion';
import { Video, ResizeMode } from 'expo-av';
import { Directions, Gesture, GestureDetector, FlingGestureHandler } from 'react-native-gesture-handler';


export function VideoQueue(): JSX.Element {
    const video = React.useRef(null);
    const [playing, setPlaying] = useState(false);
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
        newStatus[index] = state.positionMillis / state.playableDurationMillis;
        setStatus(newStatus);
    }

    return (
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
});