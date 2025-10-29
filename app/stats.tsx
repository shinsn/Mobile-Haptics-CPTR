import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { JamContext } from "./_layout";

export default function StatsScreen() {
  const jam = useContext(JamContext);
  const focused = useIsFocused();

  useEffect(() => {
    if (focused && jam) {
      jam.setPause(true);
      jam.setPlaying(false);
    }
  }, [focused]);

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
  );
}
