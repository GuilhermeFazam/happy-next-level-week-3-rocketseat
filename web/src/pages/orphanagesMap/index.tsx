import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import interalLogo from '../../images/point.svg';

import 'leaflet/dist/leaflet.css';

import './styles.css';
import mapIcon from '../../shared/mapIcon';
import api from '../../services/api';

interface Orphanege {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

const OrphanagesMap: React.FC = () => {
    const [positionDefault, setPositionDefault] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [orphaneges, setOrphaneges] = useState<Orphanege[]>([]);

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphaneges(response.data);
        });

        navigator.geolocation.getCurrentPosition(geolocation => {
            setPositionDefault({
                latitude: geolocation.coords.latitude,
                longitude: geolocation.coords.longitude,
            });
        });
    }, []);
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={interalLogo} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <div className="location">
                        <strong>Campinas</strong>
                        <span>São Paulo</span>
                    </div>
                </footer>
            </aside>
            <Map
                center={[positionDefault.latitude, positionDefault.longitude]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {orphaneges.map(orphanege => {
                    return (
                        <Marker
                            key={orphanege.id}
                            icon={mapIcon}
                            position={[orphanege.latitude, orphanege.longitude]}
                        >
                            <Popup
                                minWidth={240}
                                maxWidth={240}
                                closeButton={false}
                                className="map-popup"
                            >
                                {orphanege.name}
                                <Link to={`/orphanges/${orphanege.id}`}>
                                    <FiArrowRight size={20} color="#fff" />
                                </Link>
                            </Popup>
                        </Marker>
                    );
                })}
            </Map>

            <Link to="/orphanges/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    );
};

export default OrphanagesMap;

//  <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
