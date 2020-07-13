import React, {useState, useEffect} from 'react';

import { Feather as Icon } from '@expo/vector-icons';

import { View, ImageBackground, Image, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform} from 'react-native';

import { RectButton } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";

import RNPickerSelect from 'react-native-picker-select';

import axios from 'axios';
import { Roboto_100Thin } from '@expo-google-fonts/roboto';

interface IBGEUFResponse {
  sigla: string;
  nome: string;
}

interface IBGECityResponse {
  nome: string;
}
const Home = () => {

  // const[uf, setUf] = useState('');
  // const[city, setCity] = useState('');

  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const navigation = useNavigation();

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf);
      setUfs(ufInitials);
    });
  }, []);


  useEffect(() => {
    //carregtar cidade sempre que estado mudar.
    if(selectedUf === '0'){
      return;
    }

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
    .then(response => {
      const cityNames = response.data.map(city => city.nome);
      setCities(cityNames);
    });
  }, [selectedUf]);

  function handleNavigateToPoints(){
    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity
    });
  }

  console.log(selectedUf);
  console.log(selectedCity);


  const placeholderEstado = {
    label: 'Selecione o estado',
    value: null,
  };

  const placeholderCidade = {
    label: 'Selecione a cidade',
    value: null,
  };


  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground source={require('../../assets/home-background.png')} style={styles.container} imageStyle={{width: 274, height: 268}}>

        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos as pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>
        </View>
        <View style={styles.footer}>

        <RNPickerSelect
         style={{
          inputAndroid: {
            height: 60,
            color: '#6C6C80',
            backgroundColor: '#FFF',
            marginBottom: 8,
            paddingHorizontal: 24,
            fontSize: 16,
          },
          inputIOS: {
            height: 60,
            color: '#6C6C80',
            backgroundColor: '#FFF',
            marginBottom: 8,
            paddingHorizontal: 24,
            fontSize: 16,
          }
        }}
         placeholder={placeholderEstado}
          onValueChange={(value => setSelectedUf(value))}
          items={
            ufs.map(uf => (
              { label: uf.nome, value: uf.sigla}
            ))
          }
        />

        <RNPickerSelect
         style={{

          inputAndroid: {
            height: 60,
            color: '#6C6C80',
            backgroundColor: '#FFF',
            marginBottom: 8,
            paddingHorizontal: 24,
            fontSize: 16,
          },

          inputIOS: {
            height: 60,
            color: '#6C6C80',
            backgroundColor: '#FFF',
            marginBottom: 8,
            paddingHorizontal: 24,
            fontSize: 16,
          }
                 
          ,}}
         placeholder={placeholderCidade}
          onValueChange={(value) => setSelectedCity(value)}
          items={
            cities.map(city => (
              { label: city, value: city}
            ))
          }
        />
          {/* <TextInput style={styles.input} placeholder="Digite a UF" value={uf} maxLength={2} autoCapitalize="characters" onChangeText={setUf}></TextInput>
          <TextInput style={styles.input} placeholder="Digite a cidade" value={city} onChangeText={setCity}></TextInput> */}
          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color="#FFF" size={24}/>
            </Text>
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>

      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});


export default Home;