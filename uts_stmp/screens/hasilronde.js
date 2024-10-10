import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class HasilRonde extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { route } = this.props;
    const { round, kesulitan, pemain1, pemain2, rondeResult, onNextRonde } = route.params;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Hasil Ronde {round} (Level: {kesulitan})</Text>
        <Text style={styles.players}>{pemain1} vs {pemain2}</Text>
        <Text style={styles.result}>{rondeResult}</Text>
        <Button
          title={`LANJUT RONDE ${round + 1}`}
          onPress={() => {
            onNextRonde(round + 1);
            const {navigation} = this.props;
            navigation.navigate('Gameplay');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    marginBottom: 15,

  },
  players: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 160,
  },
  result: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 160,
  },
});

export default HasilRonde;