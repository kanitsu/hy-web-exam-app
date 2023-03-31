import React, { useEffect, useState } from 'react';
import { VideoQueue } from './components/VideoQueue';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useGetVideoData } from './hooks/useGetVideoData';

export function Home(): JSX.Element {
    const [active, setActive] = useState(0);
    const [buffering, setBuffering] = useState(false);

    const { loadInfo, data, loading, error } = useGetVideoData();

    useEffect(() => loadInfo('http://localhost:3000/following_list'), []);

    return (
        <>
            {!loading && <VideoQueue videoInfos={data ? data.items : []} />}
            {loading && <ActivityIndicator size='large' />}
            <View style={styles.container}>
                <Pressable style={styles.tabButton} onPress={() => { setActive(0); loadInfo('http://localhost:3000/following_list') }}>
                    <Text style={{ ...styles.tabButtonText, color: (active == 0 ? '#fff' : '#rgba(255, 255, 255, 0.6)') }}>Following</Text>
                </Pressable>
                <Pressable style={styles.tabButton} onPress={() => { setActive(1); loadInfo('http://localhost:3000/for_you_list') }}>
                    <Text style={{ ...styles.tabButtonText, color: (active == 1 ? '#fff' : 'rgba(255, 255, 255, 0.6)') }}>For You</Text>
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 57,
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