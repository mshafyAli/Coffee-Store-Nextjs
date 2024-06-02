'use client';

import React from 'react'
import Banner from './banner.client'
import UseTrackLocation from '@/hooks/use-track-location'

const NearByCoffeeStore = () => {
  const {handleTrackLocation,isFindingLocation,latLong,locationError} = UseTrackLocation();


  const handleOnClick = () => {
    handleTrackLocation();
  };
  return (
    <div>
        <Banner handleOnClick={handleOnClick} buttonText={isFindingLocation ? 'Locating..' : 'View Stores Nearby'} />
        <div>
         {locationError && <p>{locationError}</p>}
        </div>

    </div>
  )
}

export default NearByCoffeeStore