import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import ProgressBar from './ProgressBar';

import {
  Container,
  Content,
  Header,
  Title,
  Footer,
  FooterContent,
  Description,
  Item,
  Button,
  ButtonText,
} from './styles';

const DeliveryCard = ({ delivery, navigation }) => {
  return (
    <Container>
      <Content>
        <Header>
          <Icon name="local-shipping" size={25} color="#7d40e7" />
          <Title>{`Encomenda ${delivery.id}`}</Title>
        </Header>
        <ProgressBar />
      </Content>
      <Footer>
        <FooterContent>
          <Description>Data</Description>
          <Item>{delivery.formattedDate}</Item>
        </FooterContent>
        <FooterContent>
          <Description>Cidade</Description>
          <Item>{delivery.recipient.city}</Item>
        </FooterContent>
        <FooterContent>
          <Button
            onPress={() => navigation.route('DeliveryDetails', { delivery })}
          >
            <ButtonText>Ver detalhes</ButtonText>
          </Button>
        </FooterContent>
      </Footer>
    </Container>
  );
};

DeliveryCard.propTypes = {
  delivery: PropTypes.shape({
    id: PropTypes.number,
    formattedDate: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    recipient: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }),
  }).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default DeliveryCard;
