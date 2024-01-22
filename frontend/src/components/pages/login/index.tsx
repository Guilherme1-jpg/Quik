import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios'; 
import SignInFormOrganism from '../../organisms/SignInFormOrganism';
import TypographyAtom from 'components/atoms/TypographyAtom';
import LogoMolecule from 'components/molecules/LogoMolecule';
import useAuth from 'hooks/useAuth';
import SignInTemplate from 'components/templates/SignInTemplete';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import ButtonAtom from 'components/atoms/ButtonAtom';
import { Link } from 'react-router-dom';

type inputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined;

interface AuthProps {
  token: string;
}

function Login() {
  const { singin, token, hasToken } = useAuth();
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (token) {
      hasToken({ authToken: token, callback: () => {
        navigate(from, { replace: true });
      }});
    }
  }, [token]);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post<AuthProps>('http://localhost:3002/auth/login', {
      email,
      password,
    })
    .then(({ data }) => {
      Cookies.set("username", email, { expires: 7 });
      Cookies.set("token", data.token);
      singin({ authToken: data.token, callback: () => {
        
        navigate('/dashboard');
      }});
    })
    .catch(() => {
      
    });
  }, [email, password, navigate, singin]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(event.target.value);
  };



  return (
    <SignInTemplate>
      <LogoMolecule />
      <TypographyAtom component="h1" variant="h5"  >
        Fazer login
      </TypographyAtom>
      <SignInFormOrganism onSubmit={handleSubmit} onEmailChange={handleEmailChange} onPasswordChange={handlePasswordChange}/>
      <Link to='/signup'> 
      <ButtonAtom
      variant="contained"
      sx={{ mt: 3, mb: 2}}>Criar Conta
     </ButtonAtom>
      </Link>
     
    </SignInTemplate>
  );
}

export default Login;
