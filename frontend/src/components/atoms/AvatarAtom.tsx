import React from 'react';
import Avatar, { AvatarProps } from '@mui/material/Avatar';

function AvatarAtom(props: AvatarProps) {
  return <Avatar { ...props } />;
}

export default AvatarAtom;
