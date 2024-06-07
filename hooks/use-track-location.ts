'use client';

import { useState } from "react";
import { useReducer } from 'react';


interface State {
    voting: number;
    id: string;
  }
  
  interface Action {
    type: string;
    payload?: any;
  }



type PositionType ={
    coords:{
        latitude: number; longitude: number
    };
};

export function useFormState(initialState: State) {
    function reducer(state: State, action: Action) {
      switch (action.type) {
        case 'UPVOTE':
          return { ...state, voting: state.voting + 1 };
        default:
          return state;
      }
    }
  
    return useReducer(reducer, initialState);
  }
  
  // Custom hook: useFormStatus
  export function useFormStatus() {
    const [pending, setPending] = useState(false);
  
    return {
      pending,
      setPending,
    };
  }

const UseTrackLocation = ()=>{
    const [isFindingLocation,setIsFindingLocation] = useState(false);
    const [longLat,setLongLate] = useState('');
    const [locationError,setLocationError] = useState('');



    function success(position:PositionType) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
    

        setLongLate(`${latitude},${longitude}`);
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
        longLat,
        isFindingLocation,
        handleTrackLocation,
    }
}

export default UseTrackLocation;