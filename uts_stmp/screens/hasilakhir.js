import React, {Component} from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { Card } from "@rneui/base";

class HasilAkhir extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { route } = this.props;
    const { finalResult, pemain1, pemain2 } = route.params;

    return (
        <ScrollView>
            <View style={styles.container}>
              <Text style={styles.hasilText}>Hasil Permainan</Text>
              <Text style={styles.playerText}>{pemain1} vs {pemain2}</Text>

              <View style={{width: 300, marginBottom: 100}}>
              <Card>
                <View style={{marginTop: 16}}>
                  <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: 'black'}}>
                    <View style={{flex: 1, padding: 8}}>
                    <Text style={{fontWeight: 'bold'}}>Ronde</Text>
                  </View>
                  <View style={{flex: 1, padding: 8}}>
                    <Text style={{fontWeight: 'bold'}}>Hasil</Text>
                  </View>
                </View>
                {finalResult.map((item, index) => (
                <View key={index} style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: 'black'}}>
                  <View style={{flex: 1, padding: 8}}>
                    <Text>{item.round}</Text>
                  </View>
                  <View style={{flex: 1, padding: 8}}>
                    <Text>{item.result}</Text>
                  </View>
                </View>
                ))}
              </View>
              </Card>
              </View>
            </View>

            <View style={{marginBottom: 80, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Button
                    title="Main Lagi"
                    onPress={() => {
                        const {navigation} = this.props;
                        navigation.replace('Gameplay');
                    }}
                />

                <Button
                    title="Menu Utama"
                    onPress={() => {
                        const {navigation} = this.props;
                        navigation.popToTop();
                    }}
                />
            </View>
        </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hasilText: {
    fontSize: 22,
    marginTop: 80,
    marginBottom: 15,
  },
  playerText: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 40,
  },
};

export default HasilAkhir;