/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { Animated, Easing, Dimensions, StatusBar } from 'react-native';

import { FocusedScreen } from './screens/Focused';
import { AddTaskScreen } from './screens/AddTask';

const App = () => {
  const [currentFocus, setCurrentFocus] = React.useState<string>('');

  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <StatusBar hidden={true} />
      {currentFocus ? (
        <AnimatedComponent>
          <FocusedScreen focusedItem={currentFocus} />
        </AnimatedComponent>
      ) : (
        <AnimatedComponent>
          <AddTaskScreen setFocus={setCurrentFocus} />
        </AnimatedComponent>
      )}
    </ApplicationProvider>
  );
};

function AnimatedComponent({
  children,
}: {
  children: React.ReactChild | React.ReactChildren;
}) {
  const slideToTop = React.useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;
  const fadeIn = React.useRef(new Animated.Value(0)).current;
  const ANIMATION_DURATION = 300;

  React.useEffect(() => {
    Animated.timing(slideToTop, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
      easing: Easing.exp,
    }).start();
  }, [slideToTop]);

  React.useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
      easing: Easing.exp,
    }).start();
  }, [fadeIn]);

  return (
    <Animated.ScrollView
      style={{
        minHeight: 300,
        opacity: 1,
        flex: 1,
        transform: [{ translateY: slideToTop }],
      }}
    >
      {children}
    </Animated.ScrollView>
  );
}

export default App;
