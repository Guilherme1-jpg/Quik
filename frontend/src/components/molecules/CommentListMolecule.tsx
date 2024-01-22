import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from 'components/atoms/FeedAtoms/IconButtonAtom';

interface CommentListProps {
  comments: Comment[];
  onEdit: (commentId: number) => void;
  onDelete: (commentId: number) => void;
}

const CommentListMolecule: React.FC<CommentListProps> = ({ comments, onEdit, onDelete }) => {
  return (
    <>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemText primary={comment.description} secondary={`Comentário de ${comment.user.name}`} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => onEdit(comment.id)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(comment.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Divider />
    </>
  );
};

export default CommentListMolecule;
