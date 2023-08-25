import { ServerOffer } from '../../types/offer';
import Card from '../card/card';

type NeighbourPlacesProps = {
	places: ServerOffer[];
}

function NeighbourPlaces({ places }: NeighbourPlacesProps): React.JSX.Element {

	return (
		<section className="near-places places">
			<h2 className="near-places__title">
				Other places in the neighbourhood
			</h2>
			<div className="near-places__list places__list">
				{places.map((place) =>
					<Card block='near-places' offer={place} key={place.id} />
				)}
			</div>
		</section>
	);
}

export default NeighbourPlaces;
