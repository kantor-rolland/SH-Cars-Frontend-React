import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { registrationSchema, RegisterFormData } from '../formValidation/validationSchemas';

export default function RegisterPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(); // nemzetkoziesiteshez

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registrationSchema),
  });

  // TODO: ha majd osszejon a bejelentkezes
  const onSubmit = (data: RegisterFormData) => {
    console.log('Form Data:', data);
    // alert('Registration successful');
    // alert(t('registerMessageSuccessfully'));
    console.info('Registration succesful');
    // goToLogin;
    navigate('/login');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
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
          {t('registration')}
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
          label={t('email_form')}
          fullWidth
          margin="normal"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
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
            // the password is visible or not
            input: {
              endAdornment: (
                <Button onClick={() => setPasswordVisible(!passwordVisible)} sx={{ minWidth: 0 }}>
                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                </Button>
              ),
            },
          }}
        />

        <TextField
          label={t('confirmPassword_form')}
          type="password"
          fullWidth
          margin="normal"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {t('registration')}
        </Button>

        <Button onClick={goToLogin} variant="text" color="primary" fullWidth sx={{ mt: 2 }}>
          {t('loginHereMessage')}
        </Button>
      </Box>
    </Box>
  );
}
