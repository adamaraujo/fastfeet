import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import { Container, ButtonText } from './styles';

const Button: React.FC<RectButtonProperties> = ({ children, ...rest }) => (
  <Container {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Button;
