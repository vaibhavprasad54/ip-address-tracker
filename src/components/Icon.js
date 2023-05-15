import L from "leaflet"
import { Icon } from 'leaflet';
import icon from "../assets/icon-location.svg"

export const customIcon = new Icon({
  iconUrl: icon,
  iconSize: [32, 40],
  // Other optional properties...
});
