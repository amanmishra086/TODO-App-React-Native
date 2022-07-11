import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import React from 'react';

export default function TodoItem({item, title, setTodo, todo}) {
  const onPressDelete = () => {
    const index = todo.indexOf(item);
    //Alert.alert('' + index);
    todo.splice(index, 1);
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
