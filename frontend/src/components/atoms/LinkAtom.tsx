import React from 'react';
import Link, { LinkProps } from '@mui/material/Link';

function LinkAtom(props: LinkProps) {
  return <Link { ...props } />;
}

export default LinkAtom;