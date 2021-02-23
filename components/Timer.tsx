import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

interface IProps {
  remainingTime: number;
}

export const Timer = (props: IProps) => {
  return (
    <Layout level="3" style={styles.container}>
      <Text category="h1">{secondsToMins(props.remainingTime)}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 200,
    minHeight: 200,
  },
});

function secondsToMins(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString(10);
  const secs = (seconds % 60).toString(10);

  return `${minutes.padStart(2, '0')}:${secs.padStart(2, '0')}`;
}
