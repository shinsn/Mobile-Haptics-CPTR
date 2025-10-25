import { useContext, useState } from "react";
import { Text, View } from "react-native";
import { JamContext } from "./_layout";
import { useIsFocused } from "@react-navigation/native";


export default function StatsScreen() {
    // const [correct, setCorrect] = useState<number>(0)
    // const [incorrect, setIncorrect] = useState<number>(0)
    const jam = useContext(JamContext);
    const focused = useIsFocused();
    if (focused) {
        jam?.setPause(true);
    }

    return (

        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Correct: 0</Text>
            <Text>Incorrect: 0</Text>
        </View>
    )
}