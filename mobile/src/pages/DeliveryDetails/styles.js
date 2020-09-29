import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  background-color: #fff;
  border-radius: 4px;
  margin: 0 10px;
  flex: 1;
  flex-direction: column;
`;

export const Card = styled.View`
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 14px;
  margin-bottom: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const CardTitle = styled.Text`
  color: #7d40e7;
  font-family: 'Roboto-Bold';
  font-size: 14px;
  margin-left: 5px;
`;

export const Title = styled.Text`
  color: #999999;
  font-family: 'Roboto-Bold';
  font-size: 14px;
  margin-bottom: 5px;
`;

export const Small = styled.Text`
  color: #666666;
  font-family: 'Roboto-Regular';
  font-size: 14px;
  margin-bottom: 15px;
`;

export const DateRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
`;

export const DateContainer = styled.View`
  flex-direction: column;
`;

export const Options = styled.View`
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #f8f9fd;
  border-radius: 4px;
  flex-direction: row;
  align-self: stretch;
`;

export const ButtonOption = styled(RectButton)`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  padding: 14px;
`;

export const ButtonText = styled.Text`
  color: #999999;
  font-size: 12px;
`;

export const VerticalLine = styled.View`
  width: 1px;
  background-color: #0000001a;
`;
