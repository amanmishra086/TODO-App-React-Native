/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Button,
  TextInput,
} from 'react-native';
import TodoItem from './TodoItem';

// const onPressDelete = () => {
//   //setTodo([]);
//   Alert.alert('delete');
// };

// const Item = ({title}) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//     <View style={{alignSelf: 'flex-end'}}>
//       <Button
//         onPress={onPressDelete}
//         title="Delete"
//         color="#841584"
//         accessibilityLabel="Learn more about this purple button"
//       />
//     </View>
//   </View>
// );

const App = () => {
  const [textInput, setTextInput] = useState('');
  const [todo, setTodo] = useState([
    {
      id: '1',
      title: 'my first task',
    },
    {
      id: '2',
      title: 'my second task',
    },
  ]);

  const renderItem = ({item}) => (
    <TodoItem item={item} title={item.title} setTodo={setTodo} todo={todo}  />
  );

  const onPressBtn = () => {
    setTextInput('');
    const newTask = {
      id: '' + todo.length + 1,
      title: textInput,
    };
    setTodo([...todo, newTask]);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 20,
          fontSize: 30,
          fontWeight: '800',
          color: '#000',
          borderColor: '#000',
          borderBottomWidth: 1,
        }}>
        Practice Todo App
      </Text>

      <FlatList
        data={todo}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          onChangeText={setTextInput}
          value={textInput}
          placeholder="Add New Task"
        />
        <TouchableOpacity
          onPress={onPressBtn}
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              backgroundColor: '#f9c2ff',
              padding: 15,
              borderRadius: 10,
              borderColor: '#000',
              borderWidth: 1,
            }}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 8,
    justifyContent: 'space-between',
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
  },
  input: {
    flex: 3,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default App;
