import React from 'react';
import PropTypes from 'prop-types';

import avatarLetter from '../../utils/generateLetter';

import { Container, Image, Letter } from './styles';

const Avatar = ({ size, name, avatar }) => {
  const letters = avatarLetter(name);

  return (
    <Container size={size}>
      {avatar && avatar.url ? (
        <Image size={size} source={{ uri: avatar.url }} />
      ) : (
        <Letter size={size}>{letters}</Letter>
      )}
    </Container>
  );
};

Avatar.defaultProps = {
  avatar: undefined,
};

Avatar.propTypes = {
  avatar: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default Avatar;
