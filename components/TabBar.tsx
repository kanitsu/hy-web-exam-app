import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
    labels: string[];
    onChange?: (label: string) => void;
}
export function TabBar({ labels, onChange }: Props): JSX.Element {
    const [active, setActive] = useState(0);

    const onClick = (index: number) => () => {
        setActive(index);
        if (onChange) {
            onChange(labels[index]);
        }
    }

    return (
        <View style={styles.tabBar}>
            {labels.map((label, index) => (
                <Pressable key={index} style={styles.tabButton} onPress={onClick(index)} >
                    <Text style={{ ...styles.tabButtonText, fontWeight: (active == index ? '900' : '400') }}>{label}</Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 0,
        paddingBottom: 20,
        width: '100%',
        backgroundColor: '#000',
        flexDirection: 'row',
    },
    tabButton: {
        flex: 1,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontSize: 10,
        lineHeight: 12,
        letterSpacing: 0.15,
    },
});