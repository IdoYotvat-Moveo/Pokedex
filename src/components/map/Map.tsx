import { BicyclingLayer, DirectionsRenderer, GoogleMap, MarkerF, TransitLayer } from "@react-google-maps/api";
import MoveoLogo from '../../assets/images/moveo logo!.svg'
import { Coords } from "../../services/poke.service";
import { useState } from "react";
import { StyledLayerBtn, StyledMapActions } from "./styles";

interface MapComponentProps {
    center: {
        lat: number
        lng: number
    };
    zoom: number
    customMarker: string,
    MoveoOfficeLocation: Coords
    directions: any
}


const Map = ({ center, zoom, customMarker, MoveoOfficeLocation, directions }: MapComponentProps) => {
    const [showTransit, setShowTransit] = useState<boolean>(false)
    const [showBicycling, setShowBicycling] = useState<boolean>(false)

    return (
        <>
            <StyledMapActions>
                <StyledLayerBtn onClick={() => setShowTransit(prev=>!prev)}>Transit</StyledLayerBtn>
                <StyledLayerBtn onClick={() => setShowBicycling(prev=>!prev)}>Bicycling</StyledLayerBtn>
            </StyledMapActions>
            <GoogleMap
                mapContainerStyle={{ height: '400px', width: '70%', marginInline: 'auto', marginBottom: '10px' }}
                center={center}
                zoom={zoom}
            >
                <MarkerF position={center} icon={{ url: customMarker, scaledSize: new window.google.maps.Size(70, 70) }} />
                <MarkerF position={MoveoOfficeLocation} icon={{ url: MoveoLogo, scaledSize: new window.google.maps.Size(70, 70) }} />
                {directions && <DirectionsRenderer
                    directions={directions}
                />}
                {showTransit && <TransitLayer />}
                {showBicycling && <BicyclingLayer />}
            </GoogleMap>
        </>
    )
}

export default Map
