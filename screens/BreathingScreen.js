import React, { useRef } from "react";
import { Animated, Text, View, StyleSheet, Button } from "react-native";

export default function BreathingScreen() {
  const initialSize = 10;
  // fadeAnim will be used as the value for opacity. Initial Value:
  const sizeAnim = useRef(new Animated.Value(initialSize)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(sizeAnim, {
      toValue: 200,
      duration: 3000
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(sizeAnim, {
      toValue: 100,
      duration: 6000
    }).start();
  };

  const infiniteLoop = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.loop(
      Animated.sequence([
        Animated.timing(sizeAnim, {
        toValue: 200,
        duration: 6000
        }),
        Animated.timing(sizeAnim, {
          toValue: 50,
          duration: 6000
        }),
        Animated.delay(1000),
      ])).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            width: sizeAnim,
            height: sizeAnim
          }
        ]}
      >
        {/* <Text style={styles.fadingText}> </Text> */}
      </Animated.View>
      <View style={styles.buttonRow}>
        <Button title="Breathe In" onPress={fadeIn} />
        <Button title="Breathe Out" onPress={fadeOut} />
        <Button title="Infinite" onPress={infiniteLoop} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  fadingContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "powderblue"
  },
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 16
  }
});