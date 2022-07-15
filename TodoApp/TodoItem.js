import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {addTodo, deleteTodo} from './redux/actions';

export default function TodoItem({item, title, onToDoDelete}) {
  const {list} = useSelector(state => state.useReducer);
  const dispatch = useDispatch();

  const onPressDelete = () => {
    dispatch(deleteTodo(item.id));

    
  };

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <View style={{alignSelf: 'flex-end'}}>
        <Button
          onPress={onPressDelete}
          title="Delete"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    maxWidth: '80%',
  },
});
