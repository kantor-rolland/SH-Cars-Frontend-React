import { useEffect, useState } from 'react';
import { TextField, Typography, Box, Button, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddExtraData, addExtraSchema } from '../../formValidation/validationSchemas';
import { ExtraInDTO } from '../../model/dto/extra/extraInDTO';

interface ExtraFormProps {
  initialData?: ExtraInDTO | null;
  onSubmit: (data: ExtraInDTO) => void;
}

export default function ExtraForm({ initialData = null, onSubmit }: ExtraFormProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [text, setText] = useState<string>('');
  const { t } = useTranslation(); // nemzetkoziesiteshez

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddExtraData>({
    resolver: zodResolver(addExtraSchema),
    // initialData lekezelese
    // TODO: tobb adat fog bejonni
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
    },
  });

  useEffect(() => {
    // ha van initialData-nk akkor modositas tortenik
    // => be kell allitani az adatokat
    if (initialData) {
      setText('editExtraMessage'); // ezeknek van nemzetkoziesitett megfeleloje
    } else {
      setText('addExtraMessage');
    }
    setLoading(false);
  }, [initialData]);

  const handleFormSubmit = (data: AddExtraData) => {
    console.log('HANDLE SUBMIT EXTRA FORM');
    console.log('Form Data:', data);

    onSubmit(data);
    if (initialData) {
      // alert(t('editCarMessageSuccessfully'));
      console.info('Car modified successfully');
      console.log(t('editCarMessageSuccessfully'));
    } else {
      // alert(t('addCarMessageSuccessfully'));
      console.info('Add new car successful');
      console.log(t('addCarMessageSuccessfully'));
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{
        maxWidth: 400,
        margin: '0 auto',
        marginTop: 4,
        padding: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        {t(text)}
      </Typography>

      {/* attol meg hogy number tipus, meg kell adni a valueAsNumber attributumot */}
      <TextField
        // label={t('year')}
        label={t('extraName')}
        type="string"
        // mivel nem numberInputot hasznalok, igy lehet megadni az attributumokat
        {...control.register('name')}
        fullWidth
        required
        margin="normal"
      />
      {errors.name && <Typography color="error">{errors.name.message}</Typography>}

      <TextField
        label={t('description')}
        type="string"
        {...control.register('description')}
        fullWidth
        required
        margin="normal"
      />
      {errors.description && <Typography color="error">{errors.description.message}</Typography>}

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: '10px' }}>
        {initialData ? t('buttonSaveChanges') : t('buttonAddExtra')}
      </Button>
    </Box>
  );
}
