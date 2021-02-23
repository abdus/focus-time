import React from 'react';
import { Dimensions } from 'react-native';
import { Layout, Input, Text, Button } from '@ui-kitten/components';

export function AddTaskScreen({ setFocus }: { setFocus: (a: string) => void }) {
  const [inputText, setInputText] = React.useState('');

  return (
    <>
      <Layout
        level="1"
        style={{
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
          <Input onChangeText={setInputText} />
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
      </Layout>
    </>
  );
}
