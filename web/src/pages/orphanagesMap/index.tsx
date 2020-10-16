import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';
import Point from '../../images/point.svg';

import './styles.css';
import 'leaflet/dist/leaflet.css';

const OrphanagesMap: React.FC = () => {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={Point} alt="Happy" />

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
                center={[-22.9196874, -47.1038653]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
            </Map>

            <Link to="/" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    );
};

export default OrphanagesMap;
