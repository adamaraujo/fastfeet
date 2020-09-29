import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DeliveryList from '../../../components/DeliveryList';

import { Container, Title, Options, DeliveryType } from './styles';

const Tab = ({ navigation }) => {
  const [routes] = useState([
    { key: 'pending', title: 'Pendentes' },
    { key: 'delivered', title: 'Entregues' },
  ]);
  const [index, setIndex] = useState(0);

  return (
    <>
      <Container>
        <Title>Entregas</Title>
        <Options>
          {routes.map((route, i) => {
            return (
              <DeliveryType
                key={route.key}
                selected={index === i}
                onPress={() => setIndex(i)}
              >
                {route.title}
              </DeliveryType>
            );
          })}
        </Options>
      </Container>
      <DeliveryList navigation={navigation} option={routes[index].key} />
    </>
  );
};

Tab.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default Tab;
