import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, IconButton, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from 'components/atoms/FeedAtoms/TypographyAtoms';
import IconButtonAttomFeed from 'components/atoms/FeedAtoms/IconButtonAtom';
import CommentListMolecule from 'components/molecules/CommentListMolecule';
import baseApi from 'api/server';
import Cookies from 'js-cookie';

interface PostProps {
  post: Post;
  onDelete: () => void;
  onEdit: () => void;
  onPostEdit: (postId: number, editedPost: { title: string; description: string }) => void;
}

const PostOrganismAndComments: React.FC<PostProps> = ({ post, onDelete, onEdit, onPostEdit }) => {
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editedPost, setEditedPost] = useState({
    title: post.props.title,
    description: post.props.description,
  });
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [editedComment, setEditedComment] = useState(post._comments[0]?.description || '');
  const [postId, setPostId] = useState<number | undefined>(undefined);
  const [userId, setUserId] = React.useState(7);
  const [newComment, setNewComment] = useState('');
  const [commentId, setCommentId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const email  = Cookies.get('username')
        const response = await baseApi.get(`user/search/${email}`)
        setUserId(response.data.user.id);
        console.log('resp', setUserId)
      } catch (error) {
        console.error('Erro ao buscar userId:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    setEditedPost({
      title: post.props.title,
      description: post.props.description,
    });
  }, [post.props.title, post.props.description]);

  useEffect(() => {
    if (post && post.id !== undefined) {
      setEditedPost({
        title: post.props.title,
        description: post.props.description,
      });
      setPostId(post.id);
    }
  }, [post]);

  const handleEditPost = () => {
    setIsEditingPost(true);
  };

  const handleSavePostEdit = async () => {
    try {
      if (!post._id) {
        console.error("O post não tem _id definido.");
        return;
      }

      await onPostEdit(post._id, editedPost);
      setIsEditingPost(false);
    } catch (error) {
      console.error('Erro ao salvar edição do post:', error);
    }
  };

  const handleCancelPostEdit = () => {
    setEditedPost({
      title: post.props.title,
      description: post.props.description,
    });
    setIsEditingPost(false);
  };

  const handleEditComment = (commentId: number) => {
    setIsEditingComment(true);
    setEditedComment(findCommentById(commentId)?.description || '');
    setCommentId(commentId);
  };

  const handleSaveCommentEdit = async () => {
    try {
      if (!commentId) {
        return;
      }
  
      await baseApi.put(`comments/update/${commentId}`, { description: editedComment });
      setIsEditingComment(false);
      window.location.reload();
    } catch (error) {
      console.error('Erro ao salvar a edição do comentário:', error);
    }
  };


  const handleCancelCommentEdit = () => {
    setEditedComment(post._comments[0]?.description || '');
    setIsEditingComment(false);
  };

  const handleDeletePost = () => {
    onDelete();
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await baseApi.delete(`comments/delete/${commentId}`);
      console.log('Comentário excluído com sucesso!');
     
    } catch (error) {
      console.error('Erro ao excluir comentário:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      const postId = post._id;
      const commentData = { userId, postId, description: newComment };

      const response = await baseApi.post('comments/new', commentData);
      console.log('Novo comentário adicionado:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    }
  };

  const findCommentById = (commentId: number) => {
    const foundComment = post._comments.find(comment => comment.id === commentId);
    console.log('Comentário encontrado:', foundComment);
    return foundComment;
  };


  return (
    <Paper elevation={3} style={{ margin: '16px', padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {isEditingPost ? (
          <div>
            <TextField
              label="Editar Título"
              fullWidth
              variant="outlined"
              value={editedPost.title}
              onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
            />
            <TextField
              label="Editar Descrição"
              multiline
              fullWidth
              rows={3}
              variant="outlined"
              value={editedPost.description}
              onChange={(e) => setEditedPost({ ...editedPost, description: e.target.value })}
            />
            <Button onClick={handleSavePostEdit} color="primary">
              Salvar
            </Button>
            <Button onClick={handleCancelPostEdit} color="secondary">
              Cancelar
            </Button>
          </div>
        ) : (
          <div style={{ flex: 1 }}>
            <Typography variant="h6">{post.props.title}</Typography>
            <Typography variant="body1">{post.props.description}</Typography>
          </div>
        )}
        <IconButton edge="end" onClick={handleEditPost}>
          <EditIcon />
        </IconButton>
        <IconButtonAttomFeed edge="end" onClick={handleDeletePost}>
          <DeleteIcon />
        </IconButtonAttomFeed>
      </div>

      <CommentListMolecule
        comments={post._comments}
        onEdit={handleEditComment}
        onDelete={handleDeleteComment}
      />

      {isEditingComment ? (
        <div>
          <TextField
            label="Editar Comentário"
            multiline
            fullWidth
            rows={3}
            variant="outlined"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
          <Button onClick={() => handleSaveCommentEdit(post._comments[0]?.id)} color="primary">
            Salvar
          </Button>
          <Button onClick={handleCancelCommentEdit} color="secondary">
            Cancelar
          </Button>
        </div>
      ) : null}

      <Divider />

      <TextField
        label="Escreva seu comentário"
        multiline
        fullWidth
        value={newComment}
        rows={3}
        variant="outlined"
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button onClick={handleAddComment} color="primary">Adicionar Comentário</Button>
    </Paper>
  );
};

export default PostOrganismAndComments;
