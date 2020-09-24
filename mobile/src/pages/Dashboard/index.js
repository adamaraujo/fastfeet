import React from 'react';
import { StatusBar } from 'react-native';

import Header from './Header';
import Tab from './Tab';

import { Container } from './styles';

const Dashboard = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Container>
        <Header />
        <Tab />
      </Container>
    </>
  );
};

export default Dashboard;
