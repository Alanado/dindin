import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string({ required_error: 'email is required.' })
    .email({ message: 'invalid email format.' }),
  password: z.string({ required_error: 'password is required.' }),
});

export class LoginDTO extends createZodDto(loginSchema) {}
