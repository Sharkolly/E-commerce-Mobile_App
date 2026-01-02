import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";

const FREQUENCIES = ["daily", "weekly", "monthly"];

type Frequency = (typeof FREQUENCIES)[number];

export default function AddHabitLayout() {
  const [frequency, setFrequency] = useState<Frequency>(FREQUENCIES[0]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        mode="outlined"
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label="Description"
        mode="outlined"
        style={styles.input}
        onChangeText={setDescription}
      />

      <View style={styles.frequencyContainer}>
        <SegmentedButtons
          value={frequency}
          onValueChange={(value: string) => setFrequency(value as Frequency)}
          buttons={FREQUENCIES.map((freq) => ({
            value: freq,
            label: freq.charAt(0).toUpperCase() + freq.slice(1),
          }))}
          style={styles.segmentedButton}
        />
      </View>

      <Button mode="contained" disabled={!title || !description}>
        Add Habit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
  },
  segmentedButton: {
    marginBottom: 8,
  },
  frequencyContainer: {
    marginBottom: 24,
  },
});
