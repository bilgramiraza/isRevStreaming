import { useEffect, useState } from "react";

//If the Main Fetch Takes over 2 Seconds we call an alternative Source for a Online status, 
//If The Streamer is Offline, We abort the original Fetch call. 
const getStreamData = async (handleIsOnline, handleData, handleError, handleLoading) => {
  try{
    handleLoading(true);
    const controller = new AbortController();
    const abortSignal = controller.signal;
    const altSourceTimer = setTimeout(()=>{
      getOnlineStatus(handleIsOnline, handleError, controller);
    },2000);

    const url = `${import.meta.env.VITE_PRIMARY_API_URI}/api/${import.meta.env.VITE_STREAMER_USERNAME}`;
    const response = await fetch(url ,{ abortSignal, mode:'cors' });

    if(!abortSignal.aborted){
      clearTimeout(altSourceTimer);
      const data = await response.json();
      handleIsOnline(data.isLive);
      //Early Return when the streamer is Offline
      if(!data.isLive) return;

      handleData({
        userName: data.userName,
        streamTitle: data.streamTitle,
        game: data.game,
        viewerCount: data.viewerCount,
        startedAt: data.startedAt,
        latestThumbnail:data.latestThumbnail,
        tags: data.tags,
        updatedAt: data.updatedAt,
      });
    }
  }catch(err){
    handleError(err);
  }finally{
    handleLoading(false);
  }
}

const getOnlineStatus = async (handleIsOnline, handleError, controller)=>{
  try{
    const url = `${import.meta.env.VITE_SECONDARY_API_URI}/${import.meta.env.VITE_STREAMER_USERNAME}`;
    const response = await fetch(url, { mode:'cors' });
    const data = await response.text();
    if(!data.includes('is offline')) controller.abort();
    
    handleIsOnline(!data.includes('is offline'));
  }catch(err){
    handleError(err);
  }
}

export default function useStreamStatus(){
  const [ data, setData ] = useState({});
  const [ isOnline, setIsOnline ] = useState(false);
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(true);
  useEffect(()=>{
    getStreamData(setIsOnline, setData, setError, setLoading);
  },[]);
  return { isOnline, data, error, loading };
}
