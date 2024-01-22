import React from 'react';
import { Grid, Box } from '@mui/material';
import ButtonAtom from 'components/atoms/ButtonAtom';
import TextFieldAtom from 'components/atoms/TextFieldAtom';
import SignUpLink from 'components/atoms/signUpAtoms/signUpLink';

interface SignUpFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string | null;
}

const SignUpFormOrganism: React.FC<SignUpFormProps> = ({ onSubmit, onEmailChange, onNameChange, onPasswordChange, error }) => {
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextFieldAtom
            fullWidth
            required
            autoComplete="given-name"
            name="name"
            id="name"
            label="Nome completo"
            autoFocus
            onChange={onNameChange}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextFieldAtom
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            autoComplete="email"
            onChange={onEmailChange}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextFieldAtom
            fullWidth
            id="password"
            name="password"
            label="Digite a senha, deve conter 1Maisculo e um Caracter especial"
            type="password"
            onChange={onPasswordChange}
          />
          {error && (
            <Box sx={{ color: 'error.main', mt: 2, textAlign: 'center' }}>
              {error}
            </Box>
          )}
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between" alignItems="center" mt={2}>
        <ButtonAtom
          type="submit"
          variant="contained"
        >
          Registrar
        </ButtonAtom>

        <Box>
          <ButtonAtom
            variant="contained"
          >
            <SignUpLink>Ja possui conta?</SignUpLink>
          </ButtonAtom>
        </Box>
      </Grid>
    </form>
  );
}

export default SignUpFormOrganism;