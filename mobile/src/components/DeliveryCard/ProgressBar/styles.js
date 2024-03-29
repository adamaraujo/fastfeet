import styled from 'styled-components';

export const Container = styled.View`
  flex-direction: column;
  margin-top: 15px;
  padding: 0 20px;
`;

export const Line = styled.View`
  height: 1px;
  background-color: #000;
  border: 1px solid #7d40e7;
  margin-left: 25px;
  margin-right: 20px;
`;

export const Dot = styled.View`
  width: 10px;
  height: 10px;
  border: 1px solid #7d40e7;
  border-radius: 5px;
  background: ${(props) => (props.filled ? '#7d40e7' : '#FFFFFF')};
  margin-bottom: 5px;
`;

export const StatusContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: -6px;
`;

export const LabelContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.Text`
  color: #999999;
  font-weight: bold;
  font-size: 8px;
  max-width: 50px;
  text-align: center;
`;
