import { useEffect, useState } from "react";

const getStreamData = async (handleIsOnline, handleData, handleError, handleLoading, altSourceTimer, abortSignal) => {
  try{
    handleLoading(true);
    const url = `${import.meta.env.VITE_PRIMARY_API_URI}/api/${import.meta.env.VITE_STREAMER_USERNAME}`;
    const response = await fetch(url ,{ abortSignal });
    //This is for the case when the Streamer is Offline AND the Server is Taking too long to load
    if(abortSignal.aborted) return;

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
  }catch(err){
    handleError(err);
  }finally{
    handleLoading(false);
  }
}

const getOnlineStatus = async (handleIsOnline, handleError, handleLoading, controller)=>{
  try{
    handleLoading(true);
    const url = `${import.meta.env.VITE_SECONDARY_API_URI}/${import.meta.env.VITE_STREAMER_USERNAME}`;
    const response = await fetch(url);
    const data = await response.text();
    if(data.includes('is offline')) controller.abort();
    
    handleIsOnline(!data.includes('is offline'));
  }catch(err){
    handleError(err);
  }finally{
    handleLoading(false);
  }
}

export default function useStreamStatus(){
  const [ data, setData ] = useState({});
  const [ isOnline, setIsOnline ] = useState(false);
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(true);
  useEffect(()=>{
    //If the Main Fetch Takes over 2 Seconds we call an alternative Source for a Online status, 
    //If The Streamer is Offline, We abort the original Fetch call. 
    const controller = new AbortController();
    const altSourceTimer = setTimeout(()=>{
      return getOnlineStatus(setIsOnline, setError, setLoading, controller)
    },2000);
    getStreamData(setIsOnline, setData, setError, setLoading, altSourceTimer, controller.signal);
  },[]);
  return { isOnline, data, error, loading };
}
