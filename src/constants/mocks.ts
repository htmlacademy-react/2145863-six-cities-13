// Максимальный радиус от точки вокруг которой создаются моковые локации
const LOCATION_RADIUS = 5;

const enum TemporalData {
	offerAmount = 15,
	favoriteCount = 5,
	comment_max_amount = 5,
	comment_min_date = '2023-01-01T00:00:00.000Z',
	comment_max_date = '2023-07-13T21:04:55.781Z',
};

const CitiesGPS = {
	Paris: 			{latitude: 48.8588255, longitude: 2.2646344},
	Amsterdam: 	{latitude: 52.3545510, longitude: 4.7391540},
	Cologne:	 	{latitude: 50.9575869, longitude: 6.8025155},
	Brussels: 	{latitude: 50.8550950, longitude: 4.2930166},
	Hamburg: 		{latitude: 53.5581189, longitude: 9.5981879},
	Dusseldorf: {latitude: 51.2383390, longitude: 6.6495435},
} as const;

export {LOCATION_RADIUS, TemporalData, CitiesGPS};
