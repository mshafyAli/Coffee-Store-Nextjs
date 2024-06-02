'use client';

import { useState } from "react";


type PositionType ={
    coords:{
        latitude: number; longitude: number
    };
};

const UseTrackLocation = ()=>{
    const [isFindingLocation,setIsFindingLocation] = useState(false);
    const [latLong,setLatLong] = useState('');
    const [locationError,setLocationError] = useState('');



    function success(position:PositionType) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
    

        setLatLong(`${latitude},${longitude}`);
        setIsFindingLocation(false);
        setLocationError('');

         console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
      }
    
      function error() {
          setIsFindingLocation(false);
          setLocationError('Unable to retrieve your location')

          console.error("Unable to retrieve your location");
      }

      const handleTrackLocation = () =>{

        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser');
            console.log("Geolocation is not supported by your browser");
          } else {
              setIsFindingLocation(true);
              console.log("Locating…");
              navigator.geolocation.getCurrentPosition(success, error);
          }
      }
    
    
    return {
        locationError,
        latLong,
        isFindingLocation,
        handleTrackLocation,
    }
}

export default UseTrackLocation;