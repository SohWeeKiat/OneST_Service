
import {isValidUEN} from './format-validator';

describe('UEN Validator', () => {
    test.each([
        ['12345678A', true],
        ['199012345X', true],
        ['T08LL1234A', true],
        ['S08LL1234A', true],
        ['R08LL1234A', true],
    ])('isValidUEN(%s) should return %s', (uen, expected) => {
        expect(isValidUEN(uen)).toBe(expected);
    });

    test.each([
        ['1234567A', false],
        ['12345678!', false],
        ['1234567890A', false],
        ['T08LL1234', false],
        ['S08LL1234', false],
        ['R08LL1234', false],
    ])('isValidUEN(%s) should return %s', (uen, expected) => {
        expect(isValidUEN(uen)).toBe(expected);
    });

    it('should return false for UENs with invalid characters', () => {
        expect(isValidUEN('12345678!')).toBe(false);
    });

    it ('should return false for UENs exceeding more than 10 characters', () => {
        expect(isValidUEN('1234567890A')).toBe(false);
    });

    it ('should return false for UENs less than 9 characters', () => {
        expect(isValidUEN('1234567A')).toBe(false);
    });
});