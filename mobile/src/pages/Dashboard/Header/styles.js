import styled from 'styled-components/native';

export const Container = styled.View`
  align-self: stretch;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const WelcomeContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
`;

export const Welcome = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 12px;
  color: #666666;
`;

export const Name = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 22px;
  color: #444444;
`;

export const LogoutButton = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
