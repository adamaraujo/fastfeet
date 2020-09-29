import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';

import Header from './Header';
import Tab from './Tab';

import { Container } from './styles';

const Dashboard = ({ navigation }) => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Container>
        <Header />
        <Tab navigation={navigation} />
      </Container>
    </>
  );
};

Dashboard.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default Dashboard;
