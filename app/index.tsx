import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JamContext } from './_layout';

export default function PlayScreen() {

    const jam = useContext(JamContext);
    const focused = useIsFocused();

    // if not started -> button START JAM
    // if paused -> button RESUME
    let buttonTitle = !jam?.playing ? "START JAM" : jam.pause ? "RESUME" : ""

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                // if jam is NOT playing OR jam is currently pasued
                {!jam?.playing || jam?.pause ? (
                    <Button
                        title={buttonTitle}
                        onPress={() => {
                            // setShowButton(!showButton);
                            jam?.setPlaying(true);
                            jam?.setPause(false);
                        }}
                    />
                ) : <View
                    style={{
                        width: 300,
                        height: 300,
                        backgroundColor: "grey",
                        borderRadius: "50%",
                    }}>
                </View>
                }

            </View>
        </SafeAreaView>
    );
};
