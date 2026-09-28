import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [size, setSize] = useState(1);
  const [rand, setRand] = useState(0);
  const [numCol, setNumCol] = useState(1);
  const [boxList, setBoxList] = useState([false]);
  const [color, setColor] = useState('rgb( 250, 0, 0)');
  const [points, setPoints] = useState(0);

  const press = (value) => {
    const newPoints = value? points+1 : 0;
    setPoints(newPoints);
    colorChange()
    const newSize = value ? Math.min(size + 1, 5) : 2;
    setSize(newSize);
    setNumCol(newSize);
    const randSet = Math.trunc(Math.random() * Math.pow(newSize, 2));
    setRand(randSet);
    setBoxList(
      Array.from(
        { length: Math.pow(newSize, 2) },
        (_, index) => index === randSet
      )
    );
  };

  const colorChange = () => {
    let r, g, b = 0
      r = Math.trunc(Math.random() * 256)
      g = Math.trunc(Math.random() * 256)      
      b = Math.trunc(Math.random() * Math.min(256, 510-r-g))
      setColor('rgb(' + r + ',' + g + ',' + b);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Size: {size} Random: {rand} Color: {color}) Points: {points}
      </Text>
      <FlatList
        data={boxList}
        contentContainerStyle={{}}
        numColumns={numCol}
        key={numCol}
        renderItem={(boxData) => {
          return (
            <Pressable style={[
              styles.box,
              boxData.item
                ? { backgroundColor: color + ', .7 )' }
                : { backgroundColor: color + ')' },
            ]} onPress={() => press(boxData.item)}>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'col',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',
    padding: 8,
  },
  text: {
    color: 'black',
    fontSize: 20,
    marginBottom: 10,
  },
  list: {
    borderWidth: 5,
    borderColor: 'orange',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'col',
  },
  box: {
    aspectRatio: 1,
    flex: 1,
    margin: 5,
    borderRadius: 10,
  },
});
