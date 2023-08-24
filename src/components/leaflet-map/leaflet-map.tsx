import 'leaflet/dist/leaflet.css';
import type { ServerFullOffer, ServerOffer } from '../../types/offer';
import { Icon, LayerGroup, Marker } from 'leaflet';
import { useEffect, useRef } from 'react';
import { useAppSelector, useMap } from '../../hooks';
import { CitiesGPS } from '../../constants';
import { getActiveOffer, getCity } from '../../store/offers/offers.selectors';

type LeafletMapProps = {
	block: string;
	neighborhoodOffers?: ServerOffer[];
	baseOfferId?: ServerFullOffer['id'];
	baseOffer?: ServerOffer | ServerFullOffer;
	offers?: ServerOffer[];
}

const pinIcon = new Icon({
	iconUrl: '/img/pin.svg',
	iconSize: [27, 39],
	iconAnchor: [13, 39],
});

const pinIconActive = new Icon({
	iconUrl: '/img/pin-active.svg',
	iconSize: [27, 39],
	iconAnchor: [13, 39],
});

function LeafletMap({block, neighborhoodOffers, baseOfferId = '', baseOffer, offers}: LeafletMapProps): React.JSX.Element {
	const currentCity = useAppSelector(getCity);
	const mapRef = useRef(null);
	const activeCard = useAppSelector(getActiveOffer);
	const location = CitiesGPS[baseOffer?.city.name || currentCity];
	const mapInstance = useMap(mapRef, location);

	if (block === 'offer' && neighborhoodOffers && baseOffer) {
		offers = [ baseOffer as ServerOffer, ...neighborhoodOffers];
	}

	const highlightedId = (block === 'offer') ? baseOfferId : activeCard;

	// смена вида при смене города
	useEffect(() => {
		if (mapInstance) {
			mapInstance
				.flyTo([
					location.latitude,
					location.longitude,
				],
				location.zoom,
				{animate: true, duration: 1}
				);
		}
	}, [mapInstance, location, block]);

	// отрисовка пинов
	useEffect(() => {
		if (mapInstance && offers) {
			const markerLayer = new LayerGroup().addTo(mapInstance);

			offers.forEach((offer) => {
				const marker = new Marker({
					lat: offer.location.latitude,
					lng: offer.location.longitude,
				});
				marker
					.setIcon(
						offer.id === highlightedId
							? pinIconActive
							: pinIcon
					)
					.addTo(markerLayer);

			});
			return () => {
				mapInstance.removeLayer(markerLayer);
			};
		}

	}, [mapInstance, offers, location, highlightedId, neighborhoodOffers]);

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
