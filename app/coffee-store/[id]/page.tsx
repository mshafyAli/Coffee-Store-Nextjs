import React from 'react'
import Link from 'next/link'
import { fetchCoffeeStore, fetchCoffeeStores } from '@/lib/coffee-store';
import Image from 'next/image';
import { CoffeeStoreType } from '@/types';

async function getData(id: string,queryId:string) {
  //mapbox api
  return await fetchCoffeeStore(id,queryId);
}

const generateStaticParams = async()=>{
  const TORONTO_LONG_LATE = '-79.3789680885594%2C43.653833032607096';
  const coffeeStores = await fetchCoffeeStores(TORONTO_LONG_LATE);
  return coffeeStores.map((coffeeStore:CoffeeStoreType)=>({
    id: coffeeStore.id.toString()
  }))
}



const page=async(props: {
  params: { id: string };
  searchParams: { id: string };
}) => {
  const {
    params: { id },
    searchParams: { id: queryId },
  } = props;


  const coffeeStore = await getData(id, queryId);

  const {name = '',address = '', imgUrl = ''} = coffeeStore;

  return (
    <div className="h-full pb-80">
    <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
      <div className="">
        <div className="mb-2 mt-24 text-lg font-bold">
          <Link href="/">← Back to home</Link>
        </div>
        <div className="my-4">
          <h1 className="text-4xl">{name}</h1>
        </div>
        <Image
          src={
            imgUrl 
          }
          width={740}
          height={360}
          className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 sepia lg:max-w-[470px] "
          alt={'Coffee Store Image'}
        />
      </div>

      <div className={`glass mt-12 flex-col rounded-lg p-4 lg:mt-48`}>
        {address && (
          <div className="mb-4 flex">
            <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt="places icon"
              />
            <p className="pl-2">{address}</p>
          </div>
        )}
      </div>
    </div>
  </div>
  )
}

export default page

