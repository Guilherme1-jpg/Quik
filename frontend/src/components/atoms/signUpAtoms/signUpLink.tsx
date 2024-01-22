import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

const SignUpLink: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <Link to="/" {...props}>
      {children}
    </Link>
  );
}

export default SignUpLink;