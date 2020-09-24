import React, { useState } from 'react';
// import { View } from 'react-native';

import DeliveryList from '../../../components/DeliveryList';

import { Container, Title, Options, DeliveryType } from './styles';

const Tab = () => {
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
      <DeliveryList option={routes[index].key} />
    </>
  );
};

export default Tab;
