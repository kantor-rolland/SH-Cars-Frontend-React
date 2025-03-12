import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { LoginFormData, loginSchema } from '../formValidation/validationSchemas';

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(); // nemzetkoziesiteshez

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Form Data:', data);
    // alert('Login successful');
    // alert(t('loginMessageSuccessfully'));
  };

  const goToRegister = () => {
    navigate('/registration');
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: 400,
          p: 4,
          borderRadius: 2,
          backgroundColor: '#fff',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          {t('login')}
        </Typography>

        <TextField
          label={t('username_form')}
          fullWidth
          margin="normal"
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          label={t('password_form')}
          type={passwordVisible ? 'text' : 'password'}
          fullWidth
          margin="normal"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          slotProps={{
            input: {
              endAdornment: (
                <Button onClick={() => setPasswordVisible(!passwordVisible)} sx={{ minWidth: 0 }}>
                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                </Button>
              ),
            },
          }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {t('login')}
        </Button>

        <Button onClick={goToRegister} variant="text" color="primary" fullWidth sx={{ mt: 2 }}>
          {t('registerHereMessage')}
        </Button>
      </Box>
    </Box>
  );
}
