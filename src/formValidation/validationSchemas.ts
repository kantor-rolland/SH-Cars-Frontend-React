import { z } from 'zod';

const currentYear = new Date().getFullYear();

// TODO: meg tobb ellenorzest betenni
// TODO: a hibauzeneteket is betteni a locales-ba
// TODO: KERDES: ha beallitjuk itt a validaciot es adunk min/max erteket a formban, akkor szukseges e mindketto
export const loginSchema = z.object({
  username: z
    .string()
    .nonempty()
    .min(6, { message: 'The username must be at least 6 characters' })
    .email({ message: 'Invalid email address' }),

  password: z.string().nonempty().min(3, { message: 'Password must be at least 3 characters' }),
});

export const registrationSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: 'Username must be at least 6 characters' })
      .nonempty({ message: 'Username is required' }),

    email: z.string().email({ message: 'Invalid email address' }).nonempty({ message: 'Email is required' }),

    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .nonempty({ message: 'Password is required' }),

    confirmPassword: z
      .string()
      .min(6, { message: 'Password confirmation must be at least 6 characters' })
      .nonempty({ message: 'Password confirmation is required' }),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });

export const addCarSchema = z.object({
  brand: z
    .string()
    .nonempty({ message: 'Brand is required' })
    .refine((value) => value !== 'None', {
      message: "Brand cannot be 'None'", // minden csa nem None
    }),

  // model: z
  name: z
    .string()
    .nonempty({ message: 'Model is required' })
    .refine((value) => value !== 'None', {
      message: "Model cannot be 'None'",
    }),
  price: z.number().positive(),

  year: z
    .number()
    .positive()
    .max(currentYear, { message: `The year cannot exceed ${currentYear}.` }),
});

// TODO: esetleg a validaciokat meg kiegesziteni
export const addCarSchemaExtended = z.object({
  brand: z
    .string()
    .nonempty({ message: 'Brand is required' })
    .refine((value) => value !== 'None', {
      message: "Brand cannot be 'None'", // minden csa nem None
    }),

  // model: z
  name: z
    .string()
    .nonempty({ message: 'Model is required' })
    .refine((value) => value !== 'None', {
      message: "Model cannot be 'None'",
    }),
  price: z.number().positive({ message: 'This field must be a positive number' }),

  year: z
    .number()
    .positive({ message: 'This field must be a positive number' })
    .max(currentYear, { message: `The year cannot exceed ${currentYear}.` }),

  mileage: z
    .number()
    .positive({ message: 'This field must be a positive number' })
    .max(1000000, { message: 'The value of this field must not exceed 1.000.000' }),

  cubicCapacity: z.number().positive({ message: 'This field must be a positive number' }),

  carPower: z
    .number()
    .positive({ message: 'This field must be a positive number' })
    .max(2000, { message: 'The value of this field must not exceed 2000' }),

  fuelType: z.string().nonempty(),

  transmission: z.string().nonempty(),
});

export const addExtraSchema = z.object({
  name: z.string().max(50).nonempty({ message: 'Extra name is required' }),

  description: z.string().max(500).nonempty({ message: 'Extra description is required' }),
});

export type RegisterFormData = z.infer<typeof registrationSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type AddCarData = z.infer<typeof addCarSchema>;
export type AddCarDataExtended = z.infer<typeof addCarSchemaExtended>;
export type AddExtraData = z.infer<typeof addExtraSchema>;
