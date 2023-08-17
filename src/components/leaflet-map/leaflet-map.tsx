import 'leaflet/dist/leaflet.css';
import type { ServerOffer } from '../../types/offer';
import { Icon, LayerGroup, Marker } from 'leaflet';
import { useEffect, useRef } from 'react';
import { useAppSelector, useMap } from '../../hooks';
import { CitiesGPS, NameSpace } from '../../constants';

type LeafletMapProps = {
	block: string;
	neighborhoodOffers?: ServerOffer[];
}

const pinIcon = new Icon({
	iconUrl: './img/pin.svg',
	iconSize: [27, 39],
	iconAnchor: [13, 39],
});

const pinIconActive = new Icon({
	iconUrl: './img/pin-active.svg',
	iconSize: [27, 39],
	iconAnchor: [13, 39],
});

function LeafletMap({block, neighborhoodOffers}: LeafletMapProps): React.JSX.Element {
	const currentCity = useAppSelector((state) => state[NameSpace.Offers].city);
	const location = CitiesGPS[currentCity];
	let offers = useAppSelector((state) => state[NameSpace.Offers].offerList);

	const mapRef = useRef(null);

	const mapInstance = useMap(mapRef, location);

	const activeCard = useAppSelector((state) => state[NameSpace.Offers].activeOffer);

	if (block === 'offer' && neighborhoodOffers) {
		offers = neighborhoodOffers;
	}


	// смена вида при смене города
	useEffect(() => {
		if (mapInstance) {
			mapInstance.setView([
				location.latitude,
				location.longitude,
			],
			location.zoom,
			// (block === 'offer' ? 12 : 11),
			);
		}
	}, [mapInstance, location, block]);

	// отрисовка пинов
	useEffect(() => {
		if (mapInstance) {
			const markerLayer = new LayerGroup().addTo(mapInstance);

			offers.forEach((offer) => {
				const marker = new Marker({
					lat: offer.location.latitude,
					lng: offer.location.longitude,
				});

				marker
					.setIcon(
						offer.id === activeCard
							? pinIconActive
							: pinIcon
					)
					.addTo(markerLayer);

			});

			return () => {
				mapInstance.removeLayer(markerLayer);
			};
		}

	}, [mapInstance, offers, location, activeCard]);

	return (
		<section
			className={`${block}__map map`}
			ref={mapRef}
			style={{
				height: '100%',
				minHeight: '500px',
				width: '100%',
				maxWidth: '1144px',
				marginRight: 'auto',
				marginLeft: 'auto',
			}}
		/>
	);
}

export default LeafletMap;
