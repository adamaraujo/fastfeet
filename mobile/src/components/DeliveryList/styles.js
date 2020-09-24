import styled from 'styled-components';

import { ActivityIndicator } from 'react-native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 3px;
`;

export const Loading = styled(ActivityIndicator).attrs({
  size: 'large',
  color: '#999',
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Empty = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const EmptyLabel = styled.Text`
  color: #ddd;
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
  margin-left: -5px;
  margin-right: -5px;
`;
