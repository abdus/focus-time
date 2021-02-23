import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Layout, Button } from '@ui-kitten/components';
import { Timer } from '../components/Timer';
import { Progress } from '../components/Progress';

export const FocusedScreen = ({ focusedItem }: { focusedItem: string }) => {
  const ONE_MIN = 60;
  let totalTime = React.useRef(10 * ONE_MIN);
  const [remainingTime, setRemainingTime] = React.useState(totalTime.current);
  const [timePaused, setTimePaused] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      !timePaused && remainingTime > 0 && setRemainingTime(remainingTime - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime, timePaused]);

  return (
    <Layout
      style={{
        flex: 1,
        flexDirection: 'column',
        minHeight: Dimensions.get('window').height,
      }}
      level="1"
    >
      <Timer remainingTime={remainingTime} />
      <Progress
        value={timeRemainingInPercent(remainingTime, totalTime.current)}
      />
      <Layout level="4">
        <Layout
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 10,
          }}
        >
          <Button
            status={timePaused ? 'success' : 'danger'}
            appearance="outline"
            disabled={remainingTime === 0 ? true : false}
            size="small"
            onPress={() => setTimePaused(!timePaused)}
          >
            {timePaused ? 'RESUME' : 'PAUSE'}
          </Button>
        </Layout>

        <Layout style={styles.button_wrapper}>
          <Button
            onPress={() => {
              const tenMin = 10 * ONE_MIN;
              totalTime.current = tenMin;
              setRemainingTime(tenMin);
            }}
            status="info"
            appearance="outline"
            size="giant"
            style={styles.time_button}
          >
            10M
          </Button>
          <Button
            onPress={() => {
              const twentyMin = 20 * ONE_MIN;
              totalTime.current = twentyMin;
              setRemainingTime(twentyMin);
            }}
            status="info"
            appearance="outline"
            size="giant"
            style={styles.time_button}
          >
            20M
          </Button>
          <Button
            onPress={() => {
              const thirtyMin = 30 * ONE_MIN;
              totalTime.current = thirtyMin;
              setRemainingTime(thirtyMin);
            }}
            status="info"
            appearance="outline"
            size="giant"
            style={styles.time_button}
          >
            30M
          </Button>
        </Layout>

        <Layout style={{ paddingTop: 100 }}>
          <Button status="success" appearance="ghost" size="giant">
            {focusedItem.toUpperCase()}
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  time_button: {
    margin: 8,
  },

  button_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 40,
    paddingBottom: 40,
  },
});

function timeRemainingInPercent(remaining: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  console.log({ total, remaining });
  return (remaining / total) * 100;
}
