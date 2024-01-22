import React, { useEffect } from 'react';
import { Button, Select, useTheme, MenuItem } from '@mui/material';
import axios from 'axios';
import PostFormMolecule from 'components/organisms/ContentFormOrganism/ContentForm';
import baseApi from 'api/server';
import DashboardTemplate from 'components/templates/DashboardTemplate';
import Cookies from 'js-cookie';
import PostOrganismAndComments from 'components/organisms/PostAndComments/PostAndComents';
import CsvExportAtom from 'components/atoms/csvExportAtom';
import CsvExportMolecule from 'components/molecules/ExportCsvMolecule';

type inputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined;

const Dashboard = () => {
  const theme = useTheme();
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [selectedFile, setSelectedFile] = React.useState<File>();
  const [error, setError] = React.useState<string | null>(null);
  const [userId, setUserId] = React.useState(7);
  const [open, setOpen] = React.useState(false);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [generateFullReport, setGenerateFullReport] = React.useState(false);
  const [showSelect, setShowSelect] = React.useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await baseApi.get<Post[]>('/posts/report');
        setPosts(response.data);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);      
      }
    };
  
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const email  = Cookies.get('username')
        const response = await baseApi.get(`user/search/${email}`)
        setUserId(response.data.user.id);
      } catch (error) {
        console.error('Erro ao buscar userId:', error);
      }
    };

    fetchUserId();
  }, []);

  const handleSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!selectedFile) {
      setError('Por favor, selecione uma imagem.');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('userId', Number(userId));

    baseApi.post('/posts/new', formData)
      .then(({ data }) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Erro no servidor:', error.response.data);
        setError(error.response.data.message);
      });
  }, [selectedFile, title, description, userId]);
  

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (file: File) => {
    setSelectedFile(file);
  };

  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleReportTypeChange = (event) => {
    setGenerateFullReport(event.target.value === 'full');
  };


  const handlePostEdit = async (postId, updatedPost) => {
    try {
      const response = await baseApi.put(`/posts/update/${postId}`, updatedPost);
      const { data } = response;
  
      if (data) {
        window.location.reload();
      } else {
        console.error('Error updating post: Response data is undefined');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await baseApi.delete(`posts/delete/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Erro ao excluir post:', error);
    }
  };

  const handleButtonClick = () => {
    setShowSelect(true);
  };
  
  
  return (
    <>
    <DashboardTemplate open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose}/ >
    <CsvExportMolecule data={posts} filename="relatorio.csv" fullReport={generateFullReport}/>
    <PostFormMolecule
      onSubmit={handleSubmit}
      onTitleChange={handleTitleChange}
      onDescriptionChange={handleDescriptionChange}
      onImageChange={handleImageChange}
      error={error}
    />
    {posts.map((post) => (
      <PostOrganismAndComments
        key={post._id}
        post={post}
        onDelete={() => handleDeletePost(post._id)}
        onEdit={() => handleEditPost(post._id)}
        onPostEdit={(postId, editedPost) => handlePostEdit(postId, editedPost)}
      />
    ))}
    </>    
  );
};

export default Dashboard;