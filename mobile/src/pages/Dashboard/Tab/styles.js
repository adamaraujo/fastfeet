import styled from 'styled-components/native';

export const Container = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const Title = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 22px;
  color: #444444;
`;

export const Options = styled.View`
  flex-direction: row;
`;

export const DeliveryType = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 15px;
  margin-left: 15px;
  color: ${(props) => (props.selected ? '#7D40E7' : '#999999')};
  text-decoration: ${(props) => (props.selected ? 'underline' : 'none')};
`;
