import { Index } from 'typeorm';

export function SoftUnique(): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    Index([propertyKey as string], {
      unique: true,
      where: 'deletedAt IS NULL',
    })(target.constructor);
  };
}
