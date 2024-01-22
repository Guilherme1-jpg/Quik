import React from 'react';
import { Grid } from '@mui/material';

import axios from 'axios';
import ButtonAtom from 'components/atoms/ButtonAtom';
import FileInputAtom from 'components/atoms/ContentAreaAtoms/InputFieldAtoms';
import TextFieldAtom from 'components/atoms/TextFieldAtom';

interface ContentPostFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onDescriptionChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onImageChange: (file: File) => void;
  error?: string | null;
}

const PostFormMolecule: React.FC<ContentPostFormProps> = ({ onSubmit, onDescriptionChange, onImageChange, onTitleChange, error }) => {
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={8}>
          <TextFieldAtom
            fullWidth
            multiline
            rows={3}
            label="Digite seu titulo"
            variant="outlined"
            onChange={onTitleChange}
          />
          <TextFieldAtom
            fullWidth
            multiline
            rows={3}
            label="Digite seu post"
            variant="outlined"
            onChange={onDescriptionChange}
          />
        </Grid>
        <Grid item xs={8}>
          <FileInputAtom onFileChange={onImageChange} />
        </Grid>
        <Grid item xs={8}>
          <ButtonAtom
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Publicar
          </ButtonAtom>
        </Grid>
      </Grid>
      {error && (
        <div style={{ color: 'red', marginTop: '16px' }}>
          {error}
        </div>
      )}
    </form>
  );
};

export default PostFormMolecule;