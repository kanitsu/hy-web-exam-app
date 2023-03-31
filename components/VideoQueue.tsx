import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native';
import { Motion } from '@legendapp/motion';
import { Video, ResizeMode } from 'expo-av';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import { ProgressBar } from './ProgressBar';
import MarqueeText from 'react-native-marquee';
import Toast from 'react-native-root-toast';

interface VideoInfo {
    "cover": string;
    "play_url": string;
    "title": string;
};
interface VideoState {
    progress: number;
    isBuffering: boolean;
};
interface Props {
    videoInfos: VideoInfo[] | [];
}
export function VideoQueue({ videoInfos }: Props): JSX.Element {
    const video = React.useRef(null);
    const [position, setPosition] = useState(0);
    const [status, setStatus] = useState<VideoState[]>([]);

    const swipeUp = Gesture.Fling()
        .direction(Directions.UP)
        .onEnd(() => {
            if (position < videoInfos.length - 1) {
                setPosition(position + 1);
            }
            else {
                Toast.show('No more newer video.', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                });
            }
        });
    const swipeDown = Gesture.Fling()
        .direction(Directions.DOWN)
        .onEnd(() => {
            if (position > 0) {
                setPosition(position - 1);
            }
            else {
                Toast.show('No more older video.', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                });
            }
        });

    const handlePlaybackStatusUpdate = (index: number) => (state) => {
        //console.log(index, state);
        const newStatus = [...status];
        newStatus[index] = { progress: state.positionMillis * 100.0 / state.playableDurationMillis, isBuffering: state.isBuffering };
        setStatus(newStatus);
    }

    if (!videoInfos || videoInfos.length < 1) {
        return <></>;
    }

    return (
        <>
            <GestureDetector gesture={swipeUp}>
                <GestureDetector gesture={swipeDown}>
                    <View style={styles.column}>
                        {videoInfos.map((info, index) => (
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
                                    source={{ uri: info.play_url }}
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
            <ProgressBar progress={status[position] ? status[position].progress : 0} />
            <View style={styles.marqueeContainer}>
                <MarqueeText
                    style={styles.marquee}
                    speed={0.2}
                    marqueeOnStart={true}
                    loop={true}
                    delay={1000}
                >{`${videoInfos[position].title} ${videoInfos[position].cover} ${videoInfos[position].play_url}`}</MarqueeText>
            </View>
            {(!status || !status[position] || status[position].isBuffering) && <ActivityIndicator size='large' />}
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