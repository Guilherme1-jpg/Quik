import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AvatarAtom from 'components/atoms/AvatarAtom';

function LogoMolecule() {
  return (
    <AvatarAtom sx={{ m: 1, bgcolor: 'primary.main' }}>
      <LockOutlinedIcon />
    </AvatarAtom>
  );
}

export default LogoMolecule;
