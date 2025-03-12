import { Button, Box } from '@mui/material';

// a gombok csak atvisznek egy masik komponensre
interface MainButtonsProps {
  onEdit: () => void;
  onAddExtra: () => void; // ez esetben csak egy bool atallitas tortenik
  onDelete: () => void;
  buttonText: {
    edit: string;
    addExtra: string;
    delete: string;
  };
}

function MainButtons({ onEdit, onAddExtra, onDelete, buttonText }: MainButtonsProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
      <Button variant="contained" color="primary" onClick={onEdit}>
        {buttonText.edit}
      </Button>
      <Button variant="contained" color="primary" onClick={onAddExtra}>
        {buttonText.addExtra}
      </Button>
      <Button variant="contained" color="secondary" onClick={onDelete}>
        {buttonText.delete}
      </Button>
    </Box>
  );
}

export default MainButtons;
