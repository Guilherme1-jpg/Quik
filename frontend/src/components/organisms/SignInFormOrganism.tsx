import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LinkAtom from 'components/atoms/LinkAtom';
import ButtonAtom from 'components/atoms/ButtonAtom';
import TextFieldAtom from 'components/atoms/TextFieldAtom';
import LoginIcon from '@mui/icons-material/Login';

interface SignInFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string | null;
}

function SignInFormOrganism({ onSubmit, onEmailChange, onPasswordChange, error }: SignInFormProps) {
  return (
    <Box
      component="form"
      noValidate
      onSubmit={onSubmit}
      sx={{ mt: 1 }}
    >
      <TextFieldAtom
        margin="normal"
        required
        fullWidth
        id="email"
        label="Digite seu email"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={onEmailChange} 
      />
      <TextFieldAtom
        margin="normal"
        required
        fullWidth
        name="password"
        label="Senha"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={onPasswordChange}
      />

      {error && (
        <Box sx={{ color: 'error.main', mt: 2, textAlign: 'center' }}>
          {error}
        </Box>
      )}

      <ButtonAtom
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        <LoginIcon/> Entrar
      </ButtonAtom>

      <Grid container>
        <Grid item xs>
          <LinkAtom href="#" variant="body2"></LinkAtom>
        </Grid>
        <Grid item>
          <LinkAtom href="#" variant="body2"></LinkAtom>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SignInFormOrganism;
