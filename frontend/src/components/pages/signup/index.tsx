import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignUpFormOrganism from 'components/organisms/SignUpOrganism/signUpOrganism';
import ButtonAtom from 'components/atoms/ButtonAtom';
import LogoMolecule from 'components/molecules/LogoMolecule';
import { Container, CssBaseline } from '@mui/material';
import TypographyAtom from 'components/atoms/TypographyAtom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseApi from 'api/server';

type inputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined;
const defaultTheme = createTheme();

export default function SignUp() {

  const [password, setPassword] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    baseApi.post('/user/new', {
      name,
      email,
      password,
    })
    .then(({ data }) => {
      navigate("/")
    })
    .catch((error) => {
      console.error('Server Error:', error.response.data);
      setError(error.response.data.message);
    });
  }, [name, email, password, navigate]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(event.target.value);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LogoMolecule/>
          <TypographyAtom>
            Fazer Cadastro
          </TypographyAtom>
          <SignUpFormOrganism 
            onSubmit={handleSubmit}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            onNameChange={handleNameChange}
            error={error}
          />
          
          
        </Box>
      </Container>
    </ThemeProvider>
  );
}