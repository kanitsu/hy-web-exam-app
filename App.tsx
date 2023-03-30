import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Home } from './Home';
import { TabBar } from './components/TabBar';
import { Discover } from './Discover';

export default function App() {
  const [active, setActive] = useState('Home');
  return (
    <View style={styles.container} >
      {active == 'Discover' && <Discover />}
      {active == 'Home' && <Home />}
      <TabBar labels={['Home', 'Discover']} onChange={setActive} />
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
