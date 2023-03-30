import { StyleSheet, Text, View } from 'react-native';
import { VideoQueue } from './components/VideoQueue';

export default function App() {
  return (
    <View style={styles.container}>
      <VideoQueue />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
