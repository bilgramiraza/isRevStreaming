import { useEffect, useState } from "react";

const getData = async (handleIsOnline, handleError, handleLoading) => {
  try{
    const response = await fetch('https://decapi.me/twitch/uptime/reverse094');
    const data = await response.text();
    handleIsOnline(!data.includes('is offline'));
  }catch(err){
    handleError(err);
  }finally{
    handleLoading(false);
  }
}

export default function useStreamStatus(){
  const [ isOnline, setIsOnline ] = useState(false);
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(true);

  useEffect(()=>{
    getData(setIsOnline, setError, setLoading);
  },[]);
  return { isOnline, error, loading };
}
