import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ValidateUENDto {
    @IsString({
        message: 'UEN must be a string',
    })
    @IsNotEmpty({
        message: 'UEN must not be empty',
    })
    @Length(9, 10, {
        message: 'UEN must be between 9 and 10 characters long',
    })
    readonly uen: string;
}