import { describe, it, expect } from 'vitest';
import  { calculateTotal } from './calculateTotal';

describe('calculateTotal', () => {
    it('should sum numbers separated by commas', () => {
        const input = '10, 20, 30';
        const result = calculateTotal(input);
        expect(result).toBe(60);
    });

    it('should sum numbers separated by newlines', () => {
        const input = '10\n20\n30';
        const result = calculateTotal(input);
        expect(result).toBe(60);
    });

    it('should sum numbers separated by both commas and newlines', () => {
        const input = '10, 20\n30';
        const result = calculateTotal(input);
        expect(result).toBe(60);
    });

    it('should ignore empty strings and non-numeric values', () => {
        const input = '10, , abc, 20\n30, def';
        const result = calculateTotal(input);
        expect(result).toBe(60);
    });

    it('should handle decimal numbers', () => {
        const input = '10.5, 20.25\n30.25';
        const result = calculateTotal(input);
        expect(result).toBe(61);
    });

    it('should return 0 for an empty string', () => {
        const input = '';
        const result = calculateTotal(input);
        expect(result).toBe(0);
    });

    it('should return 0 for string with no valid numbers', () => {
        const input = 'abc, def, ghi';
        const result = calculateTotal(input);
        expect(result).toBe(0);
    });

    it('should handle strings with extra spaces', () => {
        const input = '  10 ,  20  ,  30  ';
        const result = calculateTotal(input);
        expect(result).toBe(60);
    });
});