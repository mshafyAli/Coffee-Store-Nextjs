import Banner from "./components/banner.client";
import Card from "./components/card.server";
import {fetchCoffeeStores} from '@/lib/coffee-store'
import { CoffeeStoreType } from "@/types";
import NearByCoffeeStore from "./components/nearby-coffee-store.client";





async function getData() {
  try {
    const data = await fetchCoffeeStores();
    return data;
  } catch (error) {
    console.error('Error fetching coffee stores:', error);
    return [];
  }
}


export default async function Home() {
  const coffeeStores = await getData();
 
  return (
   
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <NearByCoffeeStore/>
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Toronto Stores
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
      </main>
    </div>
  );
}
