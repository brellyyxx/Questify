import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tasks } from "./tasks";
import { useState } from 'react';
import { useAudioPlayer } from 'expo-audio';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function App() {
  const [confettiKey, setConfettiKey] = useState(0);

  const player = useAudioPlayer(require("./assets/buttonClickSound.mp3"));

  const [task, setTask] = useState(
    tasks[Math.floor(Math.random() * tasks.length)]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ConfettiCannon
        key={confettiKey}
        count={60}
        origin={{ x: 220, y: 0 }}
        fadeOut={true}
        autoStart={true}
      />
      )}
      <Text style={styles.textTask}>{task}</Text>
      <Text style={styles.allTasks}>{tasks.length} Aufgaben verfügbar</Text>

      {/* button für neue aufgabe */}
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          const randomIndex = Math.floor(Math.random() * tasks.length);

          await player.seekTo(0);
          player.play();

          setTask(tasks[randomIndex]);
          setConfettiKey(prev => prev + 1);
        }}

      >
        <Text style={styles.buttonText}>Neue Aufgabe</Text>
      </TouchableOpacity>

      <StatusBar style="light" />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c293b',
    alignItems: 'center',
    justifyContent: "center",
  },
  textTask: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 50,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 25,
    width: "80%",
    position: "absolute",
    bottom: 100,
    borderWidth: 4,
    borderColor: "black",
  },
  buttonText: {
    color: "black",
    fontSize: 26,
    textAlign: "center",
  },
  allTasks: {
    color: "white",
    position: "absolute",
    bottom: 150,
    fontWeight: "bold",
    fontSize: 13,
  },
});
