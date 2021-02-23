import React from 'react';
import { useTheme } from '@ui-kitten/components';
import { Animated, Easing } from 'react-native';

interface IProgressProps {
  value: number;
}

function Progress(props: IProgressProps) {
  const uiTheme = useTheme();
  const smoothAnim = React.useRef(new Animated.Value(0)).current;
  const [widthOfElem, setWidthOfElem] = React.useState<number>();

  console.log(props.value);

  //React.useEffect(() => {
  ////if (props.value < 0 || props.value > 100) {
  ////throw new Error("progress-bar's value must be between 0 to 100");
  ////}
  //}, [props.value]);

  React.useEffect(() => {
    Animated.timing(smoothAnim, {
      toValue: widthOfElem ? widthOfElem * (props.value / 100) : 0,
      useNativeDriver: true,
      easing: Easing.linear,
      duration: 300,
    }).start();
  }, [smoothAnim, widthOfElem, props.value]);

  return (
    <Animated.View
      style={{ height: 10, backgroundColor: 'red' }}
      onLayout={(e) => setWidthOfElem(e.nativeEvent.layout.width)}
    >
      <Animated.View
        style={{
          width: '100%',
          left: 0,
          transform: [{ translateX: smoothAnim }],
          height: 10,
          backgroundColor: uiTheme['color-info-default'],
        }}
      />
    </Animated.View>
  );
}

export { Progress };
