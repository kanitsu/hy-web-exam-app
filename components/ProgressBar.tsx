import React from 'react';

import { StyleSheet, View } from 'react-native';

interface Props {
    progress: number;
}
export function ProgressBar({ progress }: Props): JSX.Element {
    return (
        <View style={styles.container}>
            <View style={{ ...styles.content, width: progress + '%' }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        height: 3,
        backgroundColor: '#000',
    },
    content: {
        height: 3,
        backgroundColor: '#fff',
    },
});