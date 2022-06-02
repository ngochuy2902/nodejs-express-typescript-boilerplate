import { Request } from 'express';
import { ClassConstructor } from 'class-transformer';

export default interface ICreateValidatorMiddleware<T> {
  objectGetter: (req: Request) => any;
  dtoClass: ClassConstructor<T>;
}
