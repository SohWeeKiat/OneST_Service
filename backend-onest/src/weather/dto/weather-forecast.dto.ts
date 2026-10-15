import { IsNotEmpty, IsString, Length } from "class-validator";

export class WeatherForecastDto {
    @IsString({
        message: 'Area must be a string',
    })
    @IsNotEmpty({
        message: 'Area must not be empty',
    })
    @Length(1, 100, {
        message: 'Area must be between 1 and 100 characters long',
    })
    readonly area: string;
};