import React,{useState,useEffect} from 'react';
import {View,Text,TextInput,Button,Picker} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Setup() {
  const [namaPemain1, setNamaPemain1] = useState('');
  const [namaPemain2, setNamaPemain2] = useState('');
  const [jumlahRonde, setJumlahRonde] = useState('');
  const [kesulitan, setKesulitan] = useState('Gampang');
  const navigation = useNavigation();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try{
      const namaPemain1Value = await AsyncStorage.getItem('namaPemain1');
      const namaPemain2Value = await AsyncStorage.getItem('namaPemain2');
      const jumlahRondeValue = await AsyncStorage.getItem('jumlahRonde');
      const kesulitanValue = await AsyncStorage.getItem('kesulitan');

      setNamaPemain1(namaPemain1Value || '');
      setNamaPemain2(namaPemain2Value || '');
      setJumlahRonde(jumlahRondeValue || '');
      setKesulitan(kesulitanValue || 'Gampang');
    }catch(error){
      console.error('Error load data:', error);
    }
  };

  const saveData = async () => {
    try{
      await AsyncStorage.setItem('namaPemain1', namaPemain1);
      await AsyncStorage.setItem('namaPemain2', namaPemain2);
      await AsyncStorage.setItem('jumlahRonde', jumlahRonde);
      await AsyncStorage.setItem('kesulitan', kesulitan);
    }catch(error){
      console.error('Error save data:', error);
    }
  };

  const navGameplay = () => {
    if(namaPemain1 && namaPemain2 && jumlahRonde){
      const parsedJumlahRonde = parseInt(jumlahRonde, 10);
      if(parsedJumlahRonde >= 1 && parsedJumlahRonde <= 10){
        saveData();
        navigation.navigate('Gameplay');
      }else{
        alert('Jumlah ronde diperbolehkan minimal 1 hingga maksimal 10 ronde');
      }
    }else{
        alert('Input field tidak boleh kosong');
    }
  };

  return(
      <View style={styles.container}>
        <Text style={styles.title}>Setup Permainan</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama Pemain #1"
          value={namaPemain1}
          onChangeText={(text) => setNamaPemain1(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nama Pemain #2"
          value={namaPemain2}
          onChangeText={(text) => setNamaPemain2(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Jumlah Ronde"
          value={jumlahRonde}
          onChangeText={(text) => setJumlahRonde(text)}
          keyboardType="numeric"
        />
        <Picker
          style={styles.input}
          selectedValue={kesulitan}
          onValueChange={(itemValue, itemIndex) => setKesulitan(itemValue)}
        >
          <Picker.Item label="Gampang" value="Gampang" />
          <Picker.Item label="Sedang" value="Sedang" />
          <Picker.Item label="Susah" value="Susah" />
        </Picker>
        <Button title="MULAI" onPress={navGameplay} />
      </View>
  );
}

const styles = {
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    fontSize: 24,
    marginBottom: 30,
  },
  input:{
    width: 280,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
};
