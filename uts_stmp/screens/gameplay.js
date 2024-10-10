import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Gameplay extends Component {
    kesulitan = 'Gampang';
    scorePemain1 = 0;
    scorePemain2 = 0;
    roundResult = '';
    currIndex = 0;
    finalResults = [];

    state = {
      boxIndex: [0, 1, 2, 3, 4, 5, 6, 7, 8],

      colorTimer: null,
      sequence: [],
      currColorBox: -1,
      interact: false,
      stage: 'Hafalkan Polanya',
      gameOn: false,

      currRonde: 1,
      pemain1: '',
      pemain2: '',
      totalRonde: 0,
      currPemain: '',
    };

  componentDidMount() {
    this.loadGameData();
  }

  loadGameData = async () => {
    try {
      this.setState({pemain1: await AsyncStorage.getItem('namaPemain1')});
      this.setState({pemain2: await AsyncStorage.getItem('namaPemain2')});
      this.setState({totalRonde: await AsyncStorage.getItem('jumlahRonde')});
      this.kesulitan = await AsyncStorage.getItem('kesulitan');

      this.setState({currPemain: this.state.pemain1});
      this.setState({gameOn: true});

      this.createRandomSequence();
      this.startSequence();

    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  createRandomSequence = () => {
    let length;
    this.state.sequence = [];
      if (this.kesulitan == 'Gampang') {
        length = 5;
      } else if (this.kesulitan == 'Sedang') {
        length = 8;
      } else {
        length = 12;
      }
    while (this.state.sequence.length < length) {
      const randomIndex = Math.floor(Math.random() * this.state.boxIndex.length);
      this.state.sequence.push(this.state.boxIndex[randomIndex]);
    }
  };

  startSequence = async () => {
    if (this.state.sequence.length != 0) {
      this.setState({ interact: false });
      this.createRandomSequence();
      for (const index of this.state.sequence) {
        await this._colorBox(index);
      }
      this.setState({ stage: 'Tekan Tombol Sesuai Urutan' });
      this.setState({ interact: true });
    }
  };

  _colorBox = async (idx) => {
    this.setState({ currColorBox: idx });
    await new Promise((resolve) => {
      setTimeout(() => {
        this.setState({ currColorBox: -1 });
        resolve();
      }, 300);
    });

    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  };

  colorBox = new Array(9).fill('grey');

  calculateResult = () => {
    if (this.scorePemain1 == this.scorePemain2) {
      this.roundResult = 'Seimbang';
    } else if (this.scorePemain1 > this.scorePemain2) {
      this.roundResult = this.state.pemain1;
    } else {
      this.roundResult = this.state.pemain2;
    }

    return this.roundResult;
  };

  navHasilRonde = () => {
    const {navigation} = this.props;
    navigation.navigate('HasilRonde', {
      round: this.state.currRonde,
      kesulitan: this.kesulitan,
      pemain1: this.state.pemain1,
      pemain2: this.state.pemain2,
      rondeResult: this.roundResult,
      onNextRonde: (newRonde) => {
        this.setState({
          currRonde: newRonde,
          currPemain: this.state.pemain1,
        });
        this.currIndex = 0;
        this.startSequence();
      },
    });
  };

  onBoxTap = (index) => {
    if (this.state.sequence[this.currIndex] == index) {
      this.currIndex++;
      if (this.currIndex == this.state.sequence.length) {
        if (this.state.currPemain == this.state.pemain1) {
          this.scorePemain1 = 1;
        } else {
          this.scorePemain2 = 1;
        }
        this.roundResult = this.calculateResult();
        this.currIndex = 0;
        this.setState({ stage: 'Hafalkan Polanya' });
        if (this.state.currPemain == this.state.pemain1) {
          this.setState({ currPemain: this.state.pemain2 });
          this.startSequence();
        } else {
          if (this.state.currRonde < this.state.totalRonde) {
            this.finalResults.push({round: this.state.currRonde, result: this.roundResult});
            this.navHasilRonde();
          } else {
            this.finalResults.push({round: this.state.currRonde, result: this.roundResult});
            const {navigation} = this.props;
            navigation.navigate('HasilAkhir', { finalResult: this.finalResults, pemain1: this.state.pemain1, pemain2: this.state.pemain2 });
          }
        }
      }
    } else {
      if (this.state.currPemain == this.state.pemain1) {
        this.scorePemain1 = 0;
      } else {
        this.scorePemain2 = 0;
      }
      this.roundResult = this.calculateResult();
      alert('Urutan Salah'),
      this.currIndex = 0;
      this.setState({ stage: 'Hafalkan Polanya' });
      if (this.state.currPemain == this.state.pemain1) {
        this.setState({ currPemain: this.state.pemain2 });
        this.startSequence();
      } else {
        if (this.state.currRonde < this.state.totalRonde) {
          this.finalResults.push({round: this.state.currRonde, result: this.roundResult});
          this.navHasilRonde();
        } else {
          this.finalResults.push({round: this.state.currRonde, result: this.roundResult});
          const {navigation} = this.props;
          navigation.navigate('HasilAkhir', { finalResult: this.finalResults, pemain1: this.state.pemain1, pemain2: this.state.pemain2 });
        }
      }     
    }
  };

  render() {
    const grid = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    return (
      <View style={styles.container}>
        <Text style={styles.giliranText}>Giliran {this.state.currPemain}</Text>
        <Text style={styles.stageText}>{this.state.stage}</Text>
        <View style={styles.gridContainer}>
          {grid.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.rowContainer}>
              {row.map((boxIndex) => (
                <TouchableOpacity
                  key={boxIndex}
                  style={[
                    styles.box,
                    { backgroundColor: this.state.currColorBox == boxIndex ? 'blue' : this.colorBox[boxIndex] },
                  ]}
                  onPress={() => (this.state.interact ? this.onBoxTap(boxIndex) : null)}
                  disabled={!this.state.interact}>
                  </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        <Text style={styles.rondeText}>Ronde {this.state.currRonde}</Text>
        <Text style={styles.levelText}>Level: {this.kesulitan}</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  giliranText: {
    fontSize: 22,
    marginBottom: 15,
  },
  stageText: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 40,
  },
  gridContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 40,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  box: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
  },
  rondeText: {
    fontSize: 22,
    marginBottom: 15,
  },
  levelText: {
    fontSize: 22,
  },
};

export default Gameplay;