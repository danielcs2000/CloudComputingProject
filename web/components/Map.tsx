import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { randomId } from "@mantine/hooks";

const Map = (props: any) => {
    const dataObs: { position: [number, number], text: string }[] = props.dataObs;
    console.log(dataObs)

    return (
        <MapContainer center={[-10.104302, -76.536488]} zoom={5} scrollWheelZoom={false} style={{ height: 400, width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=YiKw6bFSudP9pkasedPq"
            />
            {dataObs.map((data) => (
                <Marker key={randomId()} position={data.position} icon={new Icon({ iconUrl: "/marker-icon.png", iconSize: [16, 25], iconAnchor: [8, 0] })}>
                    <Popup>
                        {data.text}
                    </Popup>
                </Marker>
            ))}
        </MapContainer >
    )
}

export default Map