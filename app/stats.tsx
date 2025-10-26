import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { JamContext } from "./_layout";


export default function StatsScreen() {

    const jam = useContext(JamContext);
    const focused = useIsFocused();
    // if (focused && jam?.playing) {
    //     console.log("stats focused and playing")
    //     jam.setPause(true);
        
    // }
    useEffect(() => {
        if (focused && jam?.playing) {
            // console.log("stats focused and playing")
            jam.setPause(true);
        } 
    }, [focused])

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