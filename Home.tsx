import React, { useState } from 'react';
import { VideoQueue } from './components/VideoQueue';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function Home(): JSX.Element {
    const [active, setActive] = useState(0);

    return (
        <>
            <VideoQueue />
            <View style={styles.container}>
                <Pressable style={styles.tabButton} >
                    <Text style={{ ...styles.tabButtonText, color: (active == 0 ? '#fff' : '#rgba(255, 255, 255, 0.6)') }}>Following</Text>
                </Pressable>
                <Pressable style={styles.tabButton} >
                    <Text style={{ ...styles.tabButtonText, color: (active == 1 ? '#fff' : 'rgba(255, 255, 255, 0.6)') }}>For You</Text>
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 100,
        justifyContent: 'center',
        width: '50%',
        flexDirection: 'row',
    },
    tabButton: {
        flex: 1,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabButtonText: {
        textAlign: 'center',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 19,
        fontWeight: '900',
    },
});