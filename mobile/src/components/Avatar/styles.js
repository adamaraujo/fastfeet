import styled from 'styled-components/native';

export const Container = styled.View`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  background-color: #f4effc;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  position: absolute;
  top: 0;
  right: 0;
`;

export const Letter = styled.Text`
  color: #a28fd0;
  text-align: center;
  font-size: ${(props) => (props.size * 0.45).toFixed()}px;
`;
