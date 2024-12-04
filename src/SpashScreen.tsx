import React, { useEffect, useRef } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";

export default function SplashScreen() {
  const spinValue = useRef(new Animated.Value(0)).current;

  // Função para girar o círculo
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"], // O círculo gira 360 graus
  });

  useEffect(() => {
    // Animação de rotação contínua
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000, // 2 segundos para um ciclo completo
        useNativeDriver: true, // Usa o driver nativo para melhor performance
      })
    ).start();
    
    // Aqui você pode definir o tempo de espera para ir para a próxima tela
    setTimeout(() => {
      // Navegar para a próxima tela
      // Por exemplo, navegue para a tela inicial ou qualquer outra tela
      // navigation.navigate('Home');  // Se estiver usando react-navigation
    }, 3000); // Exibe a splash screen por 3 segundos
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          { transform: [{ rotate: spin }] }, // Aplicando a animação de rotação
        ]}
      />
      <Text style={styles.loadingText}>Carregando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Cor de fundo preta, você pode alterar conforme necessário
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40, // Faz o círculo redondo
    backgroundColor: "#FFD700", // Cor do círculo, você pode mudar conforme necessário
    marginBottom: 20, // Espaçamento entre o círculo e o texto
  },
  loadingText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
