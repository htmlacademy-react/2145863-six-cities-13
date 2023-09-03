import { describe } from 'vitest';
import { filterDuplicates, stringCompare } from './common';

describe('Module common.ts', () => {
	describe('Function: stringCompare', () => {
		const biggerString = 'Zorro';
		const smalleString = 'Apollo';

		it('Should return 1 when a > b', () => {
			const a = biggerString;
			const b = smalleString;

			const result = stringCompare(a, b);

			expect(result).toBe(1);
		});

		it('Should return -1 when a < b', () => {
			const a = smalleString;
			const b = biggerString;

			const result = stringCompare(a, b);

			expect(result).toBe(-1);
		});

		it('Should return 0 when a === b', () => {
			const a = 'test';
			const b = 'test';

			const result = stringCompare(a, b);

			expect(result).toBe(0);
		});
	});

	describe('Function: filterDuplicates', () => {

		it('Should return false when self has another element with same value, but not same index ', () => {

			const self = [1, 2, 3, 1];
			const value = 1;
			const index = 3;

			const result = filterDuplicates(value, index, self);

			expect(result).toBe(false);
		});

		it('Should return true when self has another element with same value, but not same index ', () => {

			const self = [1, 2, 3, 4];
			const value = 4;
			const index = 3;

			const result = filterDuplicates(value, index, self);

			expect(result).toBe(true);
		});

	});
});
