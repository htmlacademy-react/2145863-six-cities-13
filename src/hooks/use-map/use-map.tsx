import type { ServerLocation } from '../../types/offer';
import { Map as LeafletMap, TileLayer } from 'leaflet';
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { TILE_COPYRIGHT, TILE_LAYER } from '../../constants';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, location: ServerLocation) {
	const [leafletMapState, setLeafletMapState] = useState<LeafletMap | null>(null);
	const isRendered = useRef(false);

	useEffect(() => {
		if (mapRef.current !== null && !isRendered.current) {
			const mapInstance = new LeafletMap(mapRef.current, {
				center: {
					lat: location.latitude,
					lng: location.longitude,
				},
				zoom: location.zoom,
			});

			const layer = new TileLayer( TILE_LAYER, {
				attribution: TILE_COPYRIGHT,
			});

			layer.addTo(mapInstance);
			setLeafletMapState(mapInstance);
			isRendered.current = true;
		}
	}, [mapRef, location]);

	return leafletMapState;
}

export {useMap};
