import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';

import { Container, Purple, Content } from './styles';

const Background = ({ children }) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Container>
        <Purple />
        <Content>{children}</Content>
      </Container>
    </>
  );
};

Background.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Background;
