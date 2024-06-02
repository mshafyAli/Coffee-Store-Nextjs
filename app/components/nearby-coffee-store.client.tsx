'use client';

import React, { useEffect, useState } from 'react'
import Banner from './banner.client'
import UseTrackLocation from '@/hooks/use-track-location'
import { CoffeeStoreType } from '@/types';
import Card from './card.server';
import { fetchCoffeeStores } from '@/lib/coffee-store';

const NearByCoffeeStore = () => {
  const {handleTrackLocation,isFindingLocation,latLong,locationError} = UseTrackLocation();


  const [coffeeStores,setCoffeeStores]= useState([])

  const handleOnClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    const coffeeStoreByLocation = async() =>{
      if(latLong){
        const response = await fetchCoffeeStores(latLong)
        // console.log(response);
        setCoffeeStores(response)
      }

    }
    coffeeStoreByLocation();
  },[latLong])


  return (
    <div>
        <Banner handleOnClick={handleOnClick} buttonText={isFindingLocation ? 'Locating..' : 'View Stores Nearby'} />
        <div>
         {locationError && <p>{locationError}</p>}
        </div>

        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
             Stores Near me
          </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
          {coffeeStores.map((element:CoffeeStoreType)=>(
            <Card
            key={`${element.name}-${element.id}`}
            name={element.name}
            imgUrl={element.imgUrl}
            href={`/coffee-store/${element.id}`}
          />
          ))}
          </div>
        </div>

    </div>
  )
}

export default NearByCoffeeStore