import { AirTableType, CoffeeStoreType } from "@/types";

var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base('appkdWg9BDi0PJCIu');

const table = base('coffee-store');


//find the record

const getMinifiedRecords = (records: Array<AirTableType>) => {
    return records.map((record: AirTableType) => {
      return {
        recordId: record.id,
        ...record.fields,
      };
    });
  };
  


const findRecordByFilter = async(id:string) =>{
    const findRecords = await table.select({
       filterByFormula: `id = "${id}"`
    }).firstPage();

    return getMinifiedRecords(findRecords);
}


//create the record if not found

export const createCoffeeStore = async (
    coffeeStore: CoffeeStoreType,
    id: string
  ) => {
    const { name, address, voting = 0, imgUrl } = coffeeStore;
  
    try {
      if (id) {
        const records = await findRecordByFilter(id);
        if (records.length === 0) {
          const createRecords = await table.create([
            {
              fields: {
                id,
                name,
                address,
                voting,
                imgUrl,
              },
            },
          ]);
          if (createRecords.length > 0) {
            console.log('Created a store with id', id);
            return getMinifiedRecords(createRecords);
          }
        } else {
          console.log('Coffee store exists');
          return records;
        }
      } else {
        console.error('Store id is missing');
      }
    } catch (error) {
      console.error('Error creating or finding a store', error);
    }
  };

  export const updateCoffeeStore = async (id: string) => {
    try {
      if (id) {
        const records = await findRecordByFilter(id);
        if (records.length !== 0) {
          const record = records[0];
          const updatedVoting = record.voting + 1;
  
          const updatedRecords = await table.update([
            {
              id: record.recordId,
              fields: {
                voting: updatedVoting,
              },
            },
          ]);
  
          if (updatedRecords.length > 0) {
            console.log('Created a store with id', id);
            return getMinifiedRecords(updatedRecords);
          }
        } else {
          console.log('Coffee store does not exist');
        }
      } else {
        console.error('Store id is missing');
      }
    } catch (error) {
      console.error('Error upvoting a coffee store', error);
    }
  };


