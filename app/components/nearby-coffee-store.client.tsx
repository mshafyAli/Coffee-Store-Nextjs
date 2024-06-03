'use client';

import React, { useEffect, useState } from 'react'
import Banner from './banner.client'
import UseTrackLocation from '@/hooks/use-track-location'
import { CoffeeStoreType } from '@/types';
import Card from './card.server';

const NearByCoffeeStore = () => {
  const {handleTrackLocation,isFindingLocation, longLat,locationError} = UseTrackLocation();


  const [coffeeStores,setCoffeeStores]= useState([])

  const handleOnClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    const coffeeStoreByLocation = async() =>{
      if (longLat) {
        try {
          const limit = 10;
          const response = await fetch(
            `/api/getCoffeeStoresByLocation?longLat=${longLat}&limit=${limit}`
          );
          const coffeeStores = await response.json();
          setCoffeeStores(coffeeStores);
        } catch (error) {
          console.error(error);
        }
      }
    }
    coffeeStoreByLocation();

  },[longLat]);

  const truncateName = (name: string, maxLength: number) => {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  };

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
            name={truncateName(element.name, 20)}  // Truncate the name to 20 characters
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



// 'use client';

// import React, { useEffect, useState } from 'react';
// import Banner from './banner.client';
// import useTrackLocation from '@/hooks/use-track-location';
// import Card from './card.server';
// import { CoffeeStoreType } from '@/types';

// export default function NearbyCoffeeStores() {
//   const { handleTrackLocation, isFindingLocation, longLat, locationError } =
//     useTrackLocation();

//   const [coffeeStores, setCoffeeStores] = useState([]);

//   const handleOnClick = () => {
//     handleTrackLocation();
//   };

//   useEffect(() => {
//     async function coffeeStoresByLocation() {
//       if (longLat) {
//         try {
//           const limit = 10;
//           const response = await fetch(
//             `/api/getCoffeeStoresByLocation?longLat=${longLat}&limit=${limit}`
//           );
//           const coffeeStores = await response.json();
//           setCoffeeStores(coffeeStores);
//           console.log(coffeeStores);
//         } catch (error) {
//           console.error(error);
//         }
//       }
//     }

//     coffeeStoresByLocation();
//   }, [longLat]);

//   return (
//     <div>
//       <Banner
//         handleOnClick={handleOnClick}
//         buttonText={isFindingLocation ? 'Locating...' : 'View stores nearby'}
//       />
//       {locationError && <p>Error: {locationError}</p>}

//       {coffeeStores.length > 0 && (
//         <div className="mt-20">
//           <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
//             Stores near me
//           </h2>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
//             {coffeeStores.map((coffeeStore: CoffeeStoreType) => (
//               <Card
//                 key={`${coffeeStore.name}-${coffeeStore.id}`}
//                 name={coffeeStore.name}
//                 imgUrl={coffeeStore.imgUrl}
//                 href={`/coffee-store/${coffeeStore.id}`}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }