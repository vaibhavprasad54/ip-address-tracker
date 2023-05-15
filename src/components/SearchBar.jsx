import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BiChevronRight } from 'react-icons/bi';
import  "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer } from 'react-leaflet'
import LocationMarker from './LocationMarker';



const SearchBar = () => {

    const [locationData, setLocationData] = useState(null);                         // To set location data in DOM
    const [searchedIpAddress, setSearchedIpAddress] = useState('');                 // State to search for entered I Address
    const [isFirstRender, setIsFirstRender] = useState(true);                       // State to check if screen rendered for the first time
    const [shouldFetchData, setShouldFetchData] = useState(false);                  // State to check if API should fetch default user's data or custom searched data.

    const apiKey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
      let isMounted = true;

      const fetchData = async () => {
        if(shouldFetchData && searchedIpAddress && searchedIpAddress !== ''){
          try {
            const response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_tzRhaux1YPnysADooCrs3cNZp6Giv&ipAddress=${searchedIpAddress}`);
            setLocationData(response.data);
          } catch (error) {
            console.log(`Error occured! ${error}`)
          }
        } else if(isFirstRender){
          try {
            const response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_tzRhaux1YPnysADooCrs3cNZp6Giv&`)
            setLocationData(response.data);
          } catch (error) {
            console.log(`Error occured! ${error}`)
          }
        }
      }

      fetchData();

      return () => {
        isMounted = false;
      }

    },[shouldFetchData, searchedIpAddress, isFirstRender]);           


      const handleSearch = () => {
        setIsFirstRender(false); // Set first render flag to false on search
        setShouldFetchData(true); // Set shouldFetchData to true to trigger API search
      };

      const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSearch();
        }
      };


  return (
    <>
    <div className="input-section w-full pt-7 h-64 bg-[url('https://i.ibb.co/xYtdSMJ/pattern-bg-mobile.png')] sm:bg-[url('https://i.ibb.co/q0rNkVY/pattern-bg-desktop.png')] bg-no-repeat bg-cover bg-center">
      <div className="flex items-center justify-center flex-col">
        <h2 className='text-white font-semibold text-2xl sm:text-3xl'>IP Address Tracker</h2>
        <div className='flex items-center justify-center mt-7'>
          <input
           value={searchedIpAddress} onChange={(e) => setSearchedIpAddress(e.target.value)} onKeyDown={handleKeyDown}
           type="text" 
           placeholder='Search for an IP Address' 
           className='w-[18.5rem] sm:w-[24rem] py-4 px-7 font-semibold outline-none border-none rounded-l-xl' />
          <div onClick={handleSearch} className='bg-black -ml-1 rounded-r-xl py-4 px-3 cursor-pointer hover:bg-gray-700'>
            <BiChevronRight className='text-white text-2xl' />
          </div>
        </div>
        <div className="location-data w-[21rem] mx-2 sm:w-auto bg-white rounded-2xl px-10 py-8 sm:px-7 sm:py-10 mt-7 flex items-center justify-center sm:items-start sm:justify-start  flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-24 shadow-md z-50">
          {locationData ? (
            <>
            <div className="ip text-center sm:text-left">
            <p className='text-gray-400 font-bold text-xs tracking-wider pb-1'> IP ADDRESS </p>
            <h1 className='text-black font-bold text-xl sm:text-2xl'> {locationData.ip} </h1>
          </div>
          <div className="adrress text-center sm:text-left sm:border-l-2 sm:pl-7">
          <p className='text-gray-400 font-bold text-xs tracking-wider pb-1'>LOCATION </p>
            <h1 className='text-black font-bold text-xl sm:text-2xl'> {locationData.location.region}, {locationData.location.country} </h1>
          </div>
          <div className="zip text-center sm:text-left sm:border-l-2 sm:pl-7">
          <p className='text-gray-400 font-bold text-xs tracking-wider pb-1'> TIMEZONE </p>
            <h1 className='text-black font-bold text-xl sm:text-2xl'> {locationData.location.timezone} </h1>
          </div>
          <div className="city text-center sm:text-left sm:border-l-2 sm:pl-7">
          <p className='text-gray-400 font-bold text-xs tracking-wider pb-1'> ISP </p>
            <h1 className='text-black font-bold text-xl sm:text-2xl'> {locationData.isp} </h1>
          </div>
            </>
          ) : (
            <div className="city text-center">
              <h1 className='text-black font-bold text-xl'> Oops! Data not available! </h1>
          </div>
          )}
        </div>
      </div>
    </div>

    {locationData && locationData.location && (
        <MapContainer
          center={[locationData.location.lat, locationData.location.lng]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "500px", width: "100vw" }}
          className='z-0'
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker locationData={locationData} />
        </MapContainer>
      )}
    </>
  )
}

export default SearchBar