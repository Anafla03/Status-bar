import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
  StyleSheet,
  Image,
  Platform,
} from "react-native";

export default function App() {
  const [visible, setVisible] = useState(true);
  const barHeight = 70;
  const anim = useRef(new Animated.Value(0)).current;

  const toggleBar = () => {
    const toValue = visible ? 1 : 0;
    Animated.timing(anim, {
      toValue,
      duration: 400,
      useNativeDriver: true,
    }).start(() => setVisible(!visible));
  };

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -barHeight],
  });

  const opacity = anim.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [1, 0.5, 0],
  });

  return (
    <>
      <StatusBar barStyle="light-content" hidden={!visible} animated={true} />

      <View
        style={[
          styles.container,
          {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.topBar,
            {
              transform: [{ translateY }],
              opacity,
            },
          ]}
        >
          <Text style={styles.topBarText}> Seu pedido está a caminho...</Text>
        </Animated.View>

        <View style={styles.content}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2662/2662453.png",
            }}
            style={styles.makeupIcon}
          />
          <Text style={styles.title}>Beleza em andamento!</Text>
          <Text style={styles.subtitle}>
            Preparando seu brilho com muito carinho 
          </Text>

          <TouchableOpacity style={styles.button} onPress={toggleBar}>
            <Text style={styles.buttonText}>
              {visible ? "Ocultar barra" : "Mostrar barra"}
            </Text>
          </TouchableOpacity>

          <View style={styles.iconsRow}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/2927/2927256.png",
              }}
              style={styles.icon}
            />
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/1867/1867027.png",
              }}
              style={styles.icon}
            />
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/2927/2927259.png",
              }}
              style={styles.icon}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6f0", 
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#ff99cc",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 10,
  },
  topBarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 100, 
  },
  title: {
    fontSize: 24,
    color: "#cc0066",
    fontWeight: "bold",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#993366",
    textAlign: "center",
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#cc0066",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  makeupIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  iconsRow: {
    flexDirection: "row",
    marginTop: 30,
    gap: 25,
  },
  icon: {
    width: 50,
    height: 50,
  },
});
