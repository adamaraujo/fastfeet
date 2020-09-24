import styled from 'styled-components';

export const Container = styled.View`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: #fff;
  margin-bottom: 30px;
`;

export const Content = styled.View`
  padding: 13px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 16px;
  color: rgba(125, 64, 231, 1);
  margin-left: 10px;
`;

export const Footer = styled.View`
  background-color: rgba(248, 249, 253, 1);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

export const FooterContent = styled.View`
  flex-direction: column;
`;

export const Description = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 8px;
  color: rgba(153, 153, 153, 1);
`;

export const Item = styled.Text`
  color: rgba(68, 68, 68, 1);
  font-family: 'Roboto-Bold';
  font-size: 12px;
`;

export const Button = styled.TouchableOpacity``;

export const ButtonText = styled.Text`
  color: #7d40e7;
  font-family: 'Roboto-Bold';
  font-size: 12px;
`;
