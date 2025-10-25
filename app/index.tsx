import React, { useContext, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JamContext } from './_layout';
import { useIsFocused } from '@react-navigation/native';

export default function PlayScreen() {
    const [showButton, setShowButton] = useState(true);
    const jam = useContext(JamContext);
    const focused = useIsFocused();

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
                {showButton && (jam?.pause == false) ? (
                    <Button
                        title={showButton ? 'START JAM' : ''}
                        onPress={() => {
                            setShowButton(!showButton);
                            jam?.setPause(!jam.pause);
                            console.log(jam.pause);
                        }}
                    />
                ) : <View
                    style={{
                        width: 300,
                        height: 300,
                        backgroundColor: "grey",
                        borderRadius: "50%",
                    }}
                >
                </View>}

            </View>
        </SafeAreaView>
    );
};
