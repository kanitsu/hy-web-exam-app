import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

export function Discover(): JSX.Element {
    return (
        <>
            <Image source={require('./explore.jpg')} style={styles.image} />
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
    },
});