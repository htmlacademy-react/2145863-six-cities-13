const enum NameSpace {
  User = 'USER',
  Offers = 'OFFERS',
	Offer = 'OFFER',
	Favorites = 'FAVORITES',
	// этого тоже нет
	Error = 'ERROR',
	// этого нет
	Data = 'DATA',
	// еще есть NearPlaces (думаю его можно поместить в offer вместе с reviews)
}

export {NameSpace};
