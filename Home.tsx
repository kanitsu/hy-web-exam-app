import React from 'react';
import { Text } from 'react-native';
import { VideoQueue } from './components/VideoQueue';

export function Home(): JSX.Element {
    return (
        <>
            <VideoQueue />
        </>
    );
}