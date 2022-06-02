import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';
import { ValidatorException } from '../error/validator.exception';
import ICreateValidatorMiddleware from '../type/create-validator-middleware.type';

export function paramValidator<T extends object>(dtoClass: ClassConstructor<T>) {
  return createValidatorMiddleware({
    objectGetter: (req) => req.params,
    dtoClass,
  });
}

export function queryValidator<T extends object>(dtoClass: ClassConstructor<T>) {
  return createValidatorMiddleware({
    objectGetter: (req) => req.query,
    dtoClass,
  });
}

export function bodyValidator<T extends object>(dtoClass: ClassConstructor<T>) {
  return createValidatorMiddleware({
    objectGetter: (req) => req.body,
    dtoClass,
  });
}

function createValidatorMiddleware<T extends object>({ objectGetter, dtoClass }: ICreateValidatorMiddleware<T>) {
  return function (req: Request, res: Response, next: NextFunction) {
    const params = objectGetter(req) ?? {};
    const dto = plainToInstance(dtoClass, params, {
      exposeUnsetFields: false,
    });

    validateOrReject(dto)
      .then(() => {
        next();
      })
      .catch((error) => {
        const errors: Array<any> = [];
        error.forEach((err: ValidationError) => {
          const { property, constraints } = err;
          errors.push({ property, constraints });
        });
        next(new ValidatorException(error, errors));
      });
  };
}
