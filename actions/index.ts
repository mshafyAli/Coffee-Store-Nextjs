
'use server'



import { updateCoffeeStore } from '@/lib/airtable'

type State ={
    id:string;
}


export const upVoteAction = async(prevSate:State) => {


    console.log('UpVoteAction')

    const {id} = prevSate;

    const data = await updateCoffeeStore(id)
    console.log({data})

    if(data){
        return {
            voting: data.length>0 ? data[0].voting : 0,
            id
        }
    }
}
    
