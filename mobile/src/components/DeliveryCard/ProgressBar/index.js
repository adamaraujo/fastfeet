import React from 'react';
import { StatusBar, View } from 'react-native';

import {
  Container,
  Line,
  Dot,
  StatusContainer,
  LabelContainer,
  Label,
} from './styles';

const ProgressBar = () => {
  return (
    <Container>
      <Line />
      <StatusContainer>
        <LabelContainer>
          <Dot filled />
          <Label>Aguardando Retirada</Label>
        </LabelContainer>
        <LabelContainer>
          <Dot />
          <Label>Retirada</Label>
        </LabelContainer>
        <LabelContainer>
          <Dot />
          <Label>Entregue</Label>
        </LabelContainer>
      </StatusContainer>
    </Container>
  );
};

export default ProgressBar;
