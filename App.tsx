import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Home } from './Home';
import { TabBar } from './components/TabBar';

export default function App() {
  return (
    <View style={styles.container} >
      <Home />
      <TabBar labels={['Home', 'Discover']} onChange={(label) => console.log(label)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
