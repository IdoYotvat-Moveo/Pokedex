import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";


interface MapComponentProps {
    apiKey: string
    center: {
        lat: number
        lng: number
    };
    zoom: number
}

const Map = ({ apiKey, center, zoom }: MapComponentProps) => {

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={{ height: '400px', width: '80%',marginInline:'auto',marginBlock:'10px' }}
                center={center}
                zoom={zoom}
                >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    )
}

export default Map
