import 'leaflet/dist/leaflet.css';
import type { ServerLocation, ServerOffer } from '../../types/offer';
import { Icon, LayerGroup, Marker } from 'leaflet';
import { useEffect, useRef } from 'react';
import { useMap } from '../../hooks';

type LeafletMapProps = {
	block: string;
	location: ServerLocation;
	offers: ServerOffer[];
	activeCard: null | string;
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

function LeafletMap({block, location, offers, activeCard}: LeafletMapProps): React.JSX.Element {
	const mapRef = useRef(null);
	const mapInstance = useMap(mapRef, location);

	// смена вида при смене города
	useEffect(() => {
		if (mapInstance) {
			mapInstance.setView([
					location.latitude,
					location.longitude,
				],
				location.zoom,
			);
		}
	}, [mapInstance, location]);

	// отрисовка пинов
	useEffect(() => {
		if (mapInstance) {
			const markerLayer = new LayerGroup().addTo(mapInstance);

			offers.forEach((offer) => {
				const marker = new Marker({
					lat: offer.location.latitude,
					lng: offer.location.longitude,
				})

				marker
					.setIcon(
						offer.id === activeCard
							? pinIconActive
							: pinIcon
					)
					.addTo(markerLayer);

				return () => {
					mapInstance.removeLayer(markerLayer);
				}
			})
		}

  }, [mapInstance, offers, activeCard]);

	return (
    // *** Карта ***
		<section
			className={`map__${block} map`}
			ref={mapRef}
			style={{
				height: '100%',
				minHeight: '500px',
				width: '100%',
				maxWidth: '1144px',
				margin: '0 auto',
			}}
		/>
	);
}

export default LeafletMap;
