import React from 'react';
import { StatusBar, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { format, parseISO } from 'date-fns';

import { signOut } from '../../store/modules/auth/actions';

import Avatar from '../../components/Avatar';

import {
  Container,
  AvatarContainer,
  ProfileContainer,
  Small,
  Item,
  LogoutButton,
} from './styles';

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  const registerDate = format(parseISO(profile.createdAt), 'dd/MM/yyyy');

  function logout() {
    dispatch(signOut());
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Container>
        <AvatarContainer>
          <Avatar size={136} name={profile.name} avatar={profile.avatar} />
        </AvatarContainer>
        <ProfileContainer>
          <Small>Nome Completo</Small>
          <Item>{profile.name}</Item>
          <Small>Email</Small>
          <Item>{profile.email}</Item>
          <Small>Data de cadastro</Small>
          <Item>{registerDate}</Item>
        </ProfileContainer>
        <TouchableWithoutFeedback onPress={logout}>
          <LogoutButton>Logout</LogoutButton>
        </TouchableWithoutFeedback>
      </Container>
    </>
  );
};

export default Profile;
