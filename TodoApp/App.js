import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

import {Provider} from 'react-redux';
import {store} from './redux/store';
import ToDoContainer from './ToDoContainer';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <ToDoContainer />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

export default App;
