import { Icon } from 'leaflet'
import React, { useEffect } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import SearchBar from './SearchBar'
import { customIcon } from './Icon'

const LocationMarker = ({ locationData }) => {

    const position = [locationData.location.lat, locationData.location.lng];
    const map = useMap();

    useEffect(() => {
      map.flyTo(position, 13, {
        animate: true,
      })
    }, [map, position])

  return (
    <div>
        <Marker icon={customIcon} position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    </div>
  )
}

export default LocationMarker