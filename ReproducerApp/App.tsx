import React, {useEffect} from 'react';
import {
  View,
  StatusBar,
  Animated,
  Button,
  Text,
  useAnimatedValue,
  StyleSheet,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

// in my case its coming from props and also combined value using Multiply operator, but for demonstation its doesn't matter
const anyOutsideIncomingAnimValue = new Animated.Value(1);

const Component = () => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useAnimatedValue(0);
  const scaleAnim = Animated.add(fadeAnim, anyOutsideIncomingAnimValue);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    let id = fadeAnim.addListener(val => {
      // works fine, listener is attached
      console.log('faedAnim value', val.value);
    });
    return () => {
      fadeAnim.removeListener(id);
    };
  });
  useEffect(() => {
    let id = scaleAnim.addListener(val => {
      // never fires
      console.log('scale anim value', val.value);
    });

    return () => {
      scaleAnim.removeListener(id);
    };
  }, [scaleAnim]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            opacity: fadeAnim,
          },
        ]}>
        <Text style={styles.fadingText}>{'Fading View!'}</Text>
      </Animated.View>
      <Animated.View
        style={[
          {
            height: 30,
            width: 30,
            backgroundColor: 'red',
          },
          {
            transform: [{scale: scaleAnim}],
          },
        ]}
      />
      <View style={styles.buttonRow}>
        <Button title="Fade In View" onPress={fadeIn} />
        <Button title="Fade Out View" onPress={fadeOut} />
      </View>
    </SafeAreaView>
  );
};

export function App() {
  return (
    <SafeAreaProvider>
      <StatusBar hidden />
      <Component />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
});
