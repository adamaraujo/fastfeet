import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '../../../store/modules/auth/actions';

import Avatar from '../../../components/Avatar';

import {
  Container,
  WelcomeContainer,
  Welcome,
  Name,
  LogoutButton,
} from './styles';

const Header = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function formatName(name) {
    const names = name.split(' ');
    const formattedName =
      names.length > 0 ? `${names[0]} ${names[1]}` : names[0];

    return formattedName;
  }

  function logout() {
    dispatch(signOut());
  }

  return (
    <>
      <Container>
        <Avatar size={70} name={profile.name} avatar={profile.avatar} />
        <WelcomeContainer>
          <Welcome>Bem vindo de volta,</Welcome>
          <Name>{formatName(profile.name)}</Name>
        </WelcomeContainer>
        <LogoutButton>
          <TouchableOpacity onPress={logout}>
            <Icon name="exit-to-app" size={27} color="#E74040" />
          </TouchableOpacity>
        </LogoutButton>
      </Container>
    </>
  );
};

export default Header;
