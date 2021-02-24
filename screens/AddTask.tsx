import React from 'react';
import { Dimensions } from 'react-native';
import { ITask } from '../types';
import { Layout, Input, Text, Button } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function AddTaskScreen({ setFocus }: { setFocus: (a: string) => void }) {
  const [inputText, setInputText] = React.useState('');
  const [tasks, setTasks] = React.useState<ITask[]>([]);
  const prevState = React.useRef(JSON.stringify(tasks));

  React.useEffect(() => {
    const interval = setInterval(async () => {
      const _raw = await AsyncStorage.getItem('tasks');

      // don't update state if state didn't change
      console.log(prevState.current, _raw);
      if (prevState.current !== _raw) {
        const allTasks = JSON.parse(_raw || '[]');
        setTasks(allTasks.reverse());
      }
    }, 500);

    return () => clearInterval(interval);
  });

  return (
    <>
      <Layout
        level="1"
        style={{
          display: 'flex',
          padding: 10,
          paddingTop: 50,
          minHeight: Dimensions.get('window').height,
        }}
      >
        <Text category="h6" style={{ textAlign: 'center', marginBottom: 20 }}>
          Add Something To Focus
        </Text>

        <Layout
          style={{
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'space-between',
          }}
        >
          <Input onChangeText={setInputText} placeholder="task to focus..." />
          <Button
            appearance="outline"
            status="primary"
            size="small"
            style={{ alignSelf: 'center', marginTop: 2 }}
            onPress={() => setFocus(inputText)}
          >
            ADD
          </Button>
        </Layout>

        <Layout
          style={{
            marginTop: 30,
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {tasks &&
            Array.isArray(tasks) &&
            tasks.map((task: ITask, i) => {
              return (
                <React.Fragment key={i}>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginBottom: 5,
                      color: task.isFinished ? 'green' : 'red',
                    }}
                  >
                    {task.title}
                  </Text>
                </React.Fragment>
              );
            })}
        </Layout>

        <Layout>
          {Array.isArray(tasks) && tasks.length > 0 && (
            <Button
              status="danger"
              appearance="outline"
              onPress={async () => {
                await AsyncStorage.setItem('tasks', '[]');
                setTasks([]);
              }}
            >
              CLEAR HISTORY
            </Button>
          )}
        </Layout>
      </Layout>
    </>
  );
}
