import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import mapIcon from '../../shared/mapIcon';

import './styles.css';

interface OrphanegesParams {
    id: string;
}

interface Images {
    id: string;
    url: string;
}

interface Orphanege {
    latitude: number;
    longitude: number;
    name: string;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
    // images: Images[];
    images: Array<Images>;
}
const Orphanage: React.FC = () => {
    const params = useParams<OrphanegesParams>();

    const [orphanege, setOrphanege] = useState<Orphanege>();

    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        api.get(`orphanages/${params.id}`).then(response => {
            setOrphanege(response.data);
        });
    }, [params.id]);

    if (!orphanege) {
        return <p>Carregando...</p>;
    }

    return (
        <div id="page-orphanage">
            <Sidebar />
            <main>
                <div className="orphanage-details">
                    <img
                        src={orphanege.images[activeImageIndex].url}
                        alt={orphanege.name}
                    />

                    <div className="images">
                        {orphanege.images.map((image, index) => {
                            return (
                                <button
                                    key={image.id}
                                    className={
                                        activeImageIndex === index
                                            ? 'active'
                                            : ''
                                    }
                                    type="button"
                                    onClick={() => setActiveImageIndex(index)}
                                >
                                    <img src={image.url} alt={orphanege.name} />
                                </button>
                            );
                        })}
                    </div>

                    <div className="orphanage-details-content">
                        <h1>{orphanege.name}</h1>
                        <p>{orphanege.about}</p>
                        <div className="map-container">
                            <Map
                                center={[
                                    orphanege.latitude,
                                    orphanege.longitude,
                                ]}
                                zoom={16}
                                style={{ width: '100%', height: 280 }}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                            >
                                <TileLayer
                                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                                />
                                <Marker
                                    interactive={false}
                                    icon={mapIcon}
                                    position={[
                                        orphanege.latitude,
                                        orphanege.longitude,
                                    ]}
                                />
                            </Map>

                            <footer>
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${orphanege.latitude},${orphanege.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ver rotas no Google Maps
                                </a>
                            </footer>
                        </div>

                        <hr />

                        <h2>Instruções para visita</h2>
                        <p>{orphanege.instructions}</p>

                        <div className="open-details">
                            <div className="hour">
                                <FiClock size={32} color="#15B6D6" />
                                Segunda à Sexta
                                <span>{orphanege.opening_hours}</span>
                            </div>

                            {orphanege.open_on_weekends ? (
                                <div className="open-on-weekends">
                                    <FiInfo size={32} color="#39CC83" />
                                    Atendemos
                                    <span>fim de semana</span>
                                </div>
                            ) : (
                                <div className="open-on-weekends dont-open">
                                    <FiInfo size={32} color="#FF669D" />
                                    Não atendemos
                                    <span>fim de semana</span>
                                </div>
                            )}
                        </div>

                        {/* <button type="button" className="contact-button">
                            <FaWhatsapp size={20} color="#FFF" />
                            Entrar em contato
                        </button> */}
                    </div>
                </div>
            </main>
        </div>
    );
};
export default Orphanage;
