import { ServerReview } from "../types/offer";

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

/**
 * Забрать случайные элементы из массива
 */
function getRandomUniqueElementsFromArray(array: any[], count: number) {
	const shuffledArray = array.slice();
	const randomElements = [];

	while (randomElements.length < count && shuffledArray.length > 0) {
			const randomIndex = Math.floor(Math.random() * shuffledArray.length);
			randomElements.push(shuffledArray[randomIndex]);
			shuffledArray.splice(randomIndex, 1);
	}

	return randomElements;
}

/**
 * Возвращает случайных индекс
 */
function getRandomInteger(max: number): number {
	return Math.floor(Math.random() * max);
}

/**
 * сортировка по убыванию даты для reviews
 */
function sortByDecDate(a: ServerReview, b: ServerReview): number {
	const result = (new Date(a.date)) < (new Date(b.date)) ? 1 : -1;
	return result;
}

export {
	stringCompare,
	filterDuplicates,
	getRandomUniqueElementsFromArray,
	sortByDecDate,
	getRandomInteger,
};

