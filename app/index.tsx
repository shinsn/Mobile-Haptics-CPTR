import { useIsFocused } from '@react-navigation/native';
import * as Haptics from "expo-haptics";
import React, { useContext } from 'react';
import { Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JamContext } from './_layout';

export default function PlayScreen() {

    const jam = useContext(JamContext);
    const focused = useIsFocused();

    // if not started -> button START JAM
    // if paused -> button RESUME
    let buttonTitle = !jam?.playing ? "START JAM" : jam.pause ? "RESUME" : ""


    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const generateBeats = async () => {
        console.log("started or resumed")
        let beats = 12
        let split_array: number[] = []
        while (beats !== 0) {
            // random split between 1-5
            let splits = Math.floor(Math.random() * (6 - 1) + 1)
            if (beats - splits > -1) {
                split_array.push(splits)
                console.log(split_array)
                for (let i = 0; i < splits; i++) {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
                }
                beats -= splits
                await delay(2000);
            }
        }
        console.log("done generating");
    }

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
                {!jam?.playing || jam?.pause ? (
                    <Button
                        title={buttonTitle}
                        onPress={() => {
                            jam?.setPlaying(true);
                            jam?.setPause(false);
                            generateBeats();
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
