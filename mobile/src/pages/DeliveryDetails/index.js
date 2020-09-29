import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { StackActions, NavigationActions } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../components/Background';

import {
  Container,
  Card,
  Header,
  CardTitle,
  Title,
  Small,
  DateRow,
  DateContainer,
  Options,
  ButtonOption,
  VerticalLine,
  ButtonText,
} from './styles';

const DeliveryDetails = ({ route }) => {
  const { recipient } = route.params;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Background>
        <Container>
          <Card>
            <Header>
              <Icon size={25} name="local-shipping" color="#7D40E7" />
              <CardTitle>Informações da entrega</CardTitle>
            </Header>
            <Title>DESTINATÁRIO</Title>
            <Small>Adam</Small>
            <Title>ENDEREÇO DE ENTREGA</Title>
            <Small>Adam Cordeiro Araújo</Small>
            <Title>PRODUTO</Title>
            <Small>Adam Cordeiro Araújo</Small>
          </Card>
          <Card>
            <Header>
              <Icon size={25} name="event" color="#7D40E7" />
              <CardTitle>Situação de entrega</CardTitle>
            </Header>
            <Title>STATUS</Title>
            <Small>Alguma coisa</Small>
            <DateRow>
              <DateContainer>
                <Title>DATA DE RETIRADA</Title>
                <Small>01/01/2020</Small>
              </DateContainer>
              <DateContainer>
                <Title>DATA DE ENTREGA</Title>
                <Small>01/01/2020</Small>
              </DateContainer>
            </DateRow>
          </Card>
          <Options>
            <ButtonOption>
              <Icon size={25} name="highlight-off" color="#E74040" />
              <ButtonText>Informar</ButtonText>
              <ButtonText>Problema</ButtonText>
            </ButtonOption>
            <VerticalLine />
            <ButtonOption>
              <Icon size={25} name="info-outline" color="#E7BA40" />
              <ButtonText>Visualizar</ButtonText>
              <ButtonText>Problemas</ButtonText>
            </ButtonOption>
            <VerticalLine />
            <ButtonOption>
              <Icon size={25} name="check-circle-outline" color="#7D40E7" />
              <ButtonText>Confirmar</ButtonText>
              <ButtonText>Entregas</ButtonText>
            </ButtonOption>
          </Options>
        </Container>
      </Background>
    </>
  );
};

DeliveryDetails.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.func.isRequired,
  }).isRequired,
};

export default DeliveryDetails;
