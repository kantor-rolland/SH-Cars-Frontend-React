import { MenuItem, Select, InputLabel, SelectChangeEvent, Typography } from '@mui/material';
import { t } from 'i18next';
import { Controller, Control } from 'react-hook-form';
import { AddCarDataExtended } from '../../../formValidation/validationSchemas';
import { FieldName } from '../../../util/Types';

interface SelectControllerProps {
  name: FieldName;
  control: Control<AddCarDataExtended>;
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: string[];
  error?: string;
}

function SelectController({ name, control, label, value, onChange, options, error = '' }: SelectControllerProps) {
  return (
    <>
      <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            labelId={`${name}-select-label`}
            value={value}
            onChange={(event: SelectChangeEvent<string>) => {
              onChange(event);
              field.onChange(event);
            }}
            fullWidth
            required
          >
            {options.map((option) => (
              <MenuItem key={`${option}`} value={option}>
                {t(`${option}`)}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {error && <Typography color="error">{error}</Typography>}
    </>
  );
}

export default SelectController;
