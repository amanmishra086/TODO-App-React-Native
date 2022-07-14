import React from 'react';

import {useCallback, useState} from 'react';

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

import {useSelector, useDispatch} from 'react-redux';
import {addTodo, deleteTodo} from './redux/actions';

const ToDoContainer = () => {
  const [textInput, setTextInput] = useState('');

  const {list} = useSelector(state => state.useReducer);
  const dispatch = useDispatch();

  //   var ans = '';
  //   list.forEach((element, index, array) => {
  //     console.log(element.title); // 100, 200, 300
  //     ans += element.title;
  //     console.log(index); // 0, 1, 2
  //     console.log(array); // same myArray object 3 times
  //   });

  //Alert.alert('list ', '' + ans);

  const renderItem = ({item}) => (
    <TodoItem item={item} title={item.title} onToDoDelete={onToDoDelete} />
  );

  const onToDoDelete = useCallback(todoId => {
    const filteredTodos = todo.filter(t => t.id !== todoId);
    //setTodo(filteredTodos);
    // dispatch(deleteTodo(filteredTodos));
  }, []);

  const onPressBtn = () => {
    setTextInput('');

    // setTodo([...todo, newTask]);
    dispatch(addTodo(textInput));
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
        data={list}
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

export default ToDoContainer;
