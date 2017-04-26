const { getRange,
				getLetterRange } = require('../array-util');

describe('array-util', () => {
	describe('getRange()', () => {
		it('produce a valid range starting with 0', () => {
			expect(getRange(0,5)).toEqual([0, 1, 2, 3, 4, 5]);
		});
		it('produce a valid range starting with 1', () => {
			expect(getRange(1,5)).toEqual([1, 2, 3, 4, 5]);
		});
		it('produce a valid range of negative numbers', () => {
			expect(getRange(-10,-7)).toEqual([-10, -9, -8, -7]);
		});
	});
	describe('getLetterRange()', () => {
		it('produce a valid single letter Range', () => {
			expect(getLetterRange('Q', 1)).toEqual(['Q']);
		});
		it('produce a valid multi letter Range starting at A', () => {
			expect(getLetterRange('A', 4)).toEqual(['A', 'B', 'C', 'D']);
		});
		it('produce a valid multi letter Range', () => {
			expect(getLetterRange('Q', 4)).toEqual(['Q', 'R', 'S', 'T']);
		});
	});
});