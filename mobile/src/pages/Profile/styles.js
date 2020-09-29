import styled from 'styled-components/native';

import Button from '../../components/Button';

export const Container = styled.SafeAreaView`
  background-color: #fff;
  flex: 1;
  flex-direction: column;
  padding: 50px 35px;
`;

export const AvatarContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 63px;
  margin-bottom: 40px;
`;

export const ProfileContainer = styled.View`
  flex-direction: column;
`;

export const Small = styled.Text`
  font-family: 'Roboto-Regular';
  color: #666666;
  font-size: 12px;
  text-align: left;
`;

export const Item = styled.Text`
  font-family: 'Roboto-Bold';
  color: #444444;
  font-size: 22px;
  margin-bottom: 15px;
  text-align: left;
`;

export const LogoutButton = styled(Button).attrs({
  color: '#E74040',
})`
  align-self: stretch;
  margin-top: 15px;
`;
