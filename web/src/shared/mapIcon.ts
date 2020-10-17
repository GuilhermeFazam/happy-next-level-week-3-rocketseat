import Leaflet from 'leaflet';
import Point from '../images/point.svg';

const mapIcon = Leaflet.icon({
    iconUrl: Point,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60],
});

export default mapIcon;
