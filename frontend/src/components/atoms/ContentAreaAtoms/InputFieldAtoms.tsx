import React from 'react';
import { useDropzone } from 'react-dropzone';

interface FileInputAtomProps {
  onFileChange: (file: File) => void;
}

const FileInputAtom: React.FC<FileInputAtomProps> = ({ onFileChange }) => {
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileChange(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.png, .jpg, .jpeg',
  });

  return (
    <div {...getRootProps()} style={{ marginBottom: '16px', padding: '20px', border: `2px dashed ${isDragActive ? 'green' : 'gray'}` }}>
      <input {...getInputProps({ onChange: onFileChange })} />
      <p>{isDragActive ? 'Solte a imagem aqui...' : 'Arraste e solte uma imagem aqui ou clique para selecionar uma imagem (.png, .jpg, .jpeg)'}</p>
    </div>
  );
}

export default FileInputAtom;