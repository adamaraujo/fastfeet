import React, { useState } from 'react';
import { Image, ScrollView, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/fastfeet_logo.png';

import { Container } from './styles';
import { signInRequest } from '../../store/modules/auth/actions';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState('');

  function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Container>
        <Image style={{ marginBottom: 37 }} source={logoImg} />

        <Input
          value={id}
          onChangeText={setId}
          keyboardType="number-pad"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />

        <Button onPress={handleSubmit}>Entrar no sistema</Button>
      </Container>
    </ScrollView>
  );
};

export default SignIn;
