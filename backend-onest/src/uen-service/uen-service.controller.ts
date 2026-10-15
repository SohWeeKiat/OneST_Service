import { Body, Controller, Post } from '@nestjs/common';
import { ValidateUENDto } from './dto/validate.dto.js';
import { isValidUEN } from '@OneST/uen_validator/dist/format-validator.js';

@Controller({
    path: 'uen-service',
    version: '1',
})
export class UenServiceController {

    @Post('validate')
    validateUEN(@Body() dto: ValidateUENDto) {
        if (isValidUEN(dto.uen)) {
            return { status: 'success', message: 'UEN is valid' };
        }
        return { status: 'error', message: 'UEN is invalid' };
    }
}
