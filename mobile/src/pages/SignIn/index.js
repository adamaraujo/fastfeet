import React from 'react';
import { Image, ScrollView } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/fastfeet_logo.png';

import { Container } from './styles';

const SignIn: React.FC = () => {
  function handleSubmit() {}

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      <Container>
        <Image style={{ marginBottom: 37 }} source={logoImg} />

        <Input
          name="id"
          keyboardType="number-pad"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />

        <Button
          onPress={() => {
            console.log('Ok');
          }}
        >
          Entrar no sistema
        </Button>
      </Container>
    </ScrollView>
  );
};

export default SignIn;
