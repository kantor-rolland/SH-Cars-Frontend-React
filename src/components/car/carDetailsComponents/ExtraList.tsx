import { List, ListItem, ListItemIcon, ListItemText, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LabelOutlined } from '@mui/icons-material';
import { t } from 'i18next';

interface CarExtrasListProps {
  carExtras: { id: number; name: string; description: string }[];
  handleUpdateExtra: (extraId: number) => void;
  handleDeleteExtra: (extraId: number) => void;
}

function ExtrasList({ carExtras, handleUpdateExtra, handleDeleteExtra }: CarExtrasListProps) {
  return carExtras.length > 0 ? (
    <List dense>
      {/* kisse tomorebb lista */}
      {carExtras.map((extra) => (
        <ListItem key={extra.id}>
          <ListItemIcon>
            <LabelOutlined />
          </ListItemIcon>
          <ListItemText primary={extra.name} secondary={extra.description} />
          <IconButton
            edge="end"
            aria-label="modify"
            onClick={() => {
              console.log('Clicked extra modify button');
              handleUpdateExtra(extra.id);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => {
              console.log('Clicked extra delete button');
              handleDeleteExtra(extra.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  ) : (
    <Typography variant="body2">{t('noExtrasMessage')}</Typography>
  );
}

export default ExtrasList;
