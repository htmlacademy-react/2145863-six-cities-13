/**
 * Cравнение строк для TS требует возврата чисел
 */
function stringCompare(a: string, b: string): number {
	a = a.toLowerCase();
	b = b.toLowerCase();

	if (a < b) {
		return -1;
	}
	if (a > b) {
		return 1;
	}
	return 0;
}

/**
 * Фильтрация дубликатов
 */
function filterDuplicates<T>(value: T, index: number, self: T[]): boolean {
	return self.indexOf(value) === index;
}

export {stringCompare, filterDuplicates};

