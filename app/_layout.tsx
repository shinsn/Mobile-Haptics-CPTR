import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React, { createContext, useState } from "react";

type PlayInterface = {
  pause: boolean,
  setPause: React.Dispatch<React.SetStateAction<boolean>>
  playing: boolean,
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
  start: boolean,
  setStart: React.Dispatch<React.SetStateAction<boolean>>
}

export const JamContext = createContext<PlayInterface | null>(null);

export default function RootLayout() {
  const [pause, setPause] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [start, setStart] = useState(false);

  return (
    <JamContext.Provider value={{ pause, setPause, start, setStart, playing, setPlaying }}>
      <Tabs
        screenOptions={{
          headerShown: false
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Play',
            tabBarIcon: ({ color }) => <MaterialIcons size={28} name="music-note" color={color} />,
          }}

        />

        <Tabs.Screen
          name="stats"
          options={{
            title: 'Stats',
            tabBarIcon: ({ color }) => <MaterialIcons size={28} name="insights" color={color} />,

          }}

        />
      </Tabs>
    </JamContext.Provider>
  );
}
