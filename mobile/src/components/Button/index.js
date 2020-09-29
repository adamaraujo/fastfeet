import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import { Container, ButtonText } from './styles';

const Button: React.FC<RectButtonProperties> = ({
  children,
  color,
  ...rest
}) => (
  <Container {...rest} color={color}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

Button.defaultProps = {
  color: undefined,
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Button;
