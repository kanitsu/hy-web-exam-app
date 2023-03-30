import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Motion } from '@legendapp/motion';
import { Video, ResizeMode } from 'expo-av';
import { Directions, Gesture, GestureDetector, FlingGestureHandler } from 'react-native-gesture-handler';


export function VideoQueue(): JSX.Element {
    const video = React.useRef(null);
    const [playing, setPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [status, setStatus] = useState({});
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
                                shouldPlay={true}
                                isLooping={true}
                                resizeMode={ResizeMode.COVER}
                                onPlaybackStatusUpdate={setStatus}
                            />

                        </Motion.View>
                    ))}
                </View>
            </GestureDetector>
        </GestureDetector>
    );
}

// export function Old(): JSX.Element {
//     const [playing, setPlaying] = useState(false);
//     const [needClick, setNeedClick] = useState(true);
//     const [position, setPosition] = useState(0);
//     const [downward, setDownward] = useState(true);

//     const urls = [
//         'http://localhost:3000/media/Volkswagen_Golf_7.m3u8',
//         'http://localhost:3000/media/Toyota_Camry_XV70.m3u8',
//         'http://localhost:3000/media/Rolls_Royce_Ghost.m3u8',
//     ];

//     const handlers = useSwipeable({
//         onSwipedUp: (eventData) => {
//             if (position < urls.length - 1) {
//                 setPosition(position + 1);
//                 setDownward(false);
//             }
//         },
//         onSwipedDown: (eventData) => {
//             if (position > 0) {
//                 setPosition(position - 1);
//                 setDownward(true);
//             }
//         },
//     });

//     return (
//         <div {...handlers} style={styles.container}>
//             <div style={styles.column}>
//                 {urls.map((url, index) => (
//                     <Motion.View
//                         style={styles.inner}
//                         key={index}
//                         animate={{
//                             top: `${(index - position) * 896 - (downward ? 496 : 400)}px`,
//                         }}
//                         transition={{
//                             type: "spring",
//                             stiffness: 260,
//                             damping: 20,
//                         }}>
//                         <ReactPlayer
//                             playing={playing}
//                             loop={true}
//                             controls={false}
//                             playsinline={true}
//                             // className='react-player'
//                             url={url}
//                             width='100%'
//                             height='100%'
//                             onError={e => { setPlaying(false); console.log('onError', e) }}
//                         />
//                     </Motion.View>
//                 ))}
//             </div>
//             {needClick && <Pressable onPress={() => { setNeedClick(false); setPlaying(true); console.log('play!') }} ><Image source={{ uri: require('./explore.jpg') }} /></Pressable>}
//         </div>
//     );
// }

const styles = StyleSheet.create({
    container: {
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        padding: 0,
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
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