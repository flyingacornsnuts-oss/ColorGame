import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [size, setSize] = useState(1);
  const [numCol, setNumCol] = useState(1);
  const [boxList, setBoxList] = useState([false]);
  const [color, setColor] = useState('rgb( 250, 0, 0)');
  const [points, setPoints] = useState(0);
  const [alpha, setAlpha] = useState(0.5);

  const press = (value) => { 
    const newAlpha = value ? Math.min(.9, alpha + 0.05) : 0.5;
    setAlpha(newAlpha);
    const newPoints = value ? points + 1 : 0;
    setPoints(newPoints);
    colorChange();
    const newSize = value ? Math.min(size + 1, 10) : 2;
    setSize(newSize);
    setNumCol(newSize);
    const rand = Math.trunc(Math.random() * Math.pow(newSize, 2));
    setBoxList(
      Array.from(
        { length: Math.pow(newSize, 2) },
        (_, index) => index === rand
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
                ? { backgroundColor: color + ',' + alpha +   ')' }
                : { backgroundColor: color + ')' },
            ]} onPress={() => press(boxData.item)}>
            </Pressable>
          );
        }}
      />
      <View style={styles.contxt}>
      <Text style={styles.text}>
        {points}
      </Text>
      </View>
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
    padding: 10,
  },
  contxt: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
    marginTop: -50,
    fontSize: 100,
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
