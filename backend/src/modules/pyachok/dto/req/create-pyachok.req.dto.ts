import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

import { PyachokGenderEnum } from '../../enums/pyachok-gender.enum';
import { PyachokPayerEnum } from '../../enums/pyachok-payer.enum';

function IsNotPastDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNotPastDate',
      target: (object as any).constructor,
      propertyName,
      options: {
        message: 'Дата не може бути в минулому',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          if (!value) return true;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return new Date(value) >= today;
        },
      },
    });
  };
}

export class CreatePyachokReqDto {
  @IsDateString()
  @IsNotPastDate()
  date: string;

  @IsString()
  time: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsString()
  purpose?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  peopleCount?: number;

  @IsOptional()
  @IsEnum(PyachokGenderEnum)
  genderPreference?: PyachokGenderEnum;

  @IsOptional()
  @IsEnum(PyachokPayerEnum)
  payer?: PyachokPayerEnum;

  @IsOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsString()
  message?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  expectedBudget?: number;
}
