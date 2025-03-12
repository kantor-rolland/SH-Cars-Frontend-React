import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Divider, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { extraService } from '../../api/ExtraService';
import { ExtraDetailsDTO } from '../../model/dto/extra/extraDetailsDTO';
import useDeleteExtra from '../../hooks/extra/useDeleteExtra';

export default function ExtraDetailsPage() {
  const { extraId } = useParams<{ extraId: string }>();
  const [extra, setExtra] = useState<ExtraDetailsDTO | null>(null);
  const navigate = useNavigate();
  const deleteExtraMutation = useDeleteExtra();

  const { t } = useTranslation(); // nemzetkoziesiteshez

  useEffect(() => {
    if (extraId) {
      extraService
        .getExtraById(Number(extraId))
        .then((data) => setExtra(data))
        .catch((error) => console.error(error));
    }
    console.log({ extra });
  }, [extraId]);

  const handleEdit = () => {
    navigate(`/modify_extra/${extraId}`);
  };

  const handleDelete = () => {
    if (extraId) {
      deleteExtraMutation.mutate(Number(extraId));
      navigate('/extras');
    }
  };

  if (!extra) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          {t('pageExtraDetails')}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        <Typography variant="h5" gutterBottom>
          <strong>{t('extraName')}:</strong> {extra.name}
        </Typography>

        <Typography variant="h6" gutterBottom>
          <strong>{t('description')}:</strong> {extra.description}
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleEdit}>
            {t('buttonEdit')}
          </Button>

          <Button variant="contained" color="secondary" onClick={handleDelete}>
            {t('buttonDelete')}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
