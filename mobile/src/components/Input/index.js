import React from 'react';
import { TextInputProps } from 'react-native';
// import PropTypes from 'prop-types';

import { Container, TextInput } from './styles';

const Input: React.FC<TextInputProps> = ({ ...rest }) => (
  <Container>
    <TextInput placeholderTextColor="#999999" {...rest} />
  </Container>
);

export default Input;
