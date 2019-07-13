import React from 'react';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from 'react-native';
import reducer from "./reducers";

const store = createStore(reducer);

export default function App() {
  return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Text>Test</Text>+
          <AppContainer />
        </View>
      </Provider>
  );
}