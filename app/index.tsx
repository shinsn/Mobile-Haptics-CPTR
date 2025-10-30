import { useIsFocused } from '@react-navigation/native';
import * as Haptics from "expo-haptics";
import React, { useContext, useEffect, useRef } from 'react';
import { Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JamContext } from './_layout';

export default function PlayScreen() {
  const jam = useContext(JamContext);
  const focused = useIsFocused();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const generateBeats = () => {
    if (!jam) return;

    // if timeout array is not empty
    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];

    jam.setStart(true);
    jam.setPause(false);
    jam.setPlaying(true);

    // random total beats between 12 and 16
    let beats = Math.floor(Math.random() * (16 - 12) + 12)
    console.log(`total beats: ${beats}`)

    const split_array: number[] = []
    while (beats > 0) {
      const split = Math.floor(Math.random() * 5) + 1;
      if (beats - split >= 0) {
        split_array.push(split)
        beats -= split;
      }
    }
    console.log(split_array);

    let timeout = 0;
    for (const beat of split_array) {
      for (let i = 0; i < beat; i++) {
        timeout += 200; // small pause
        const pulseId = setTimeout(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        }, timeout);
        timeoutRef.current.push(pulseId); // push id into array
      }
      timeout += 1000;  // longer pause
    }

    const stopId = setTimeout(() => {
      if (jam) {
        jam.setPlaying(false);
        // jam.setPause(true);
        jam.setStart(false);
      }
    }, timeout);
    timeoutRef.current.push(stopId);
  };

  useEffect(() => {
    if (!focused) {
      timeoutRef.current.forEach(clearTimeout);
      timeoutRef.current = [];
      if (jam) {
        jam.setPause(true);
        jam.setPlaying(false);
        
      }
    }
  }, [focused]);

  const buttonTitle = !jam?.start ? "START JAM" : "RESUME";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!jam?.playing || jam?.pause ? (
          <Button title={buttonTitle} onPress={generateBeats} />
        ) : (
          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: "grey",
              borderRadius: "50%",
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
