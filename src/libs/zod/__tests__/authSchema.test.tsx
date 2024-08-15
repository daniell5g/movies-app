import { z } from 'zod';

import { authSchema } from '../user';

describe('authSchema', () => {
  it('should validate correct data', () => {
    const validData = {
      username: 'validUser',
      password: '123456',
    };

    expect(() => authSchema.parse(validData)).not.toThrow();
  });

  it('should fail when username is too short', () => {
    const invalidData = {
      username: 'ab',
      password: '123456',
    };

    expect(() => authSchema.parse(invalidData)).toThrowError(z.ZodError);
    try {
      authSchema.parse(invalidData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        expect(error.errors).toContainEqual(
          expect.objectContaining({
            message: 'O usuário deve ter no mínimo 3 caracteres',
            path: ['username'],
          })
        );
      }
    }
  });

  it('should fail when password is too short', () => {
    const invalidData = {
      username: 'validUser',
      password: '12',
    };

    expect(() => authSchema.parse(invalidData)).toThrowError(z.ZodError);
    try {
      authSchema.parse(invalidData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        expect(error.errors).toContainEqual(
          expect.objectContaining({
            message: 'A senha deve ter no mínimo 3 caracteres',
            path: ['password'],
          })
        );
      }
    }
  });

  it('should fail when password is not numeric', () => {
    const invalidData = {
      username: 'validUser',
      password: 'abc123',
    };

    expect(() => authSchema.parse(invalidData)).toThrowError(z.ZodError);
    try {
      authSchema.parse(invalidData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        expect(error.errors).toContainEqual(
          expect.objectContaining({
            message: 'A senha deve ser numérica',
            path: ['password'],
          })
        );
      }
    }
  });

  it('should fail when username is missing', () => {
    const invalidData = {
      password: '123456',
    };

    expect(() => authSchema.parse(invalidData)).toThrowError(z.ZodError);
    try {
      authSchema.parse(invalidData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        expect(error.errors).toContainEqual(
          expect.objectContaining({
            message: 'Usuário é obrigatório',
            path: ['username'],
          })
        );
      }
    }
  });

  it('should fail when password is missing', () => {
    const invalidData = {
      username: 'validUser',
    };

    expect(() => authSchema.parse(invalidData)).toThrowError(z.ZodError);
    try {
      authSchema.parse(invalidData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        expect(error.errors).toContainEqual(
          expect.objectContaining({
            message: 'Senha é obrigatória',
            path: ['password'],
          })
        );
      }
    }
  });
});
