function getReviewDateString(dateISO: string): string {
	const date: Date = new Date(dateISO);
	console.log('ok - ', `${date.getMonth()} ${date.getFullYear()}`);
	return `${date.toLocaleString('en', { month: 'long' })} ${date.getFullYear()}`;
}

function getReviewDateTime(dateISO: string): string {
	return dateISO.split('T')[0];
}

export {getReviewDateString, getReviewDateTime};
