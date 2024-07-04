import { DirectionsRenderer, GoogleMap, MarkerF } from "@react-google-maps/api";
import MoveoLogo from '../../assets/images/moveo logo!.svg'
import { Coords } from "../../services/poke.service";

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


    return (
        <>
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
            </GoogleMap>
        </>
    )
}

export default Map
