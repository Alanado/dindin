import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  email: z.string().email({ message: 'invalid email format.' }),
  password: z.string({ required_error: 'Password is required.' }),
});

export class CreateUserDTO extends createZodDto(createUserSchema) {}

export const responseUserCreated = createUserSchema.omit({ password: true });

// export type ResponseUserCreated = z.infer<typeof responseUserCreated>;
