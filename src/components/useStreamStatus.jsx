import { useEffect, useState } from "react";

const getStreamData = async (handleIsOnline, handleData, handleError, handleLoading, altSourceTimer) => {
  try{
    handleLoading(true);
    const response = await fetch(`${import.meta.env.VITE_PRIMARY_API_URI}/api/${import.meta.env.VITE_STREAMER_USERNAME}`);
    clearTimeout(altSourceTimer);
    const data = await response.json();
    handleIsOnline(data.isLive);
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

const getOnlineStatus = async (handleIsOnline, handleData, handleError, handleLoading)=>{
  try{
    handleLoading(true);
    const response = await fetch(`${import.meta.env.VITE_SECONDARY_API_URI}/${import.meta.env.VITE_STREAMER_USERNAME}`);
    const data = await response.text();
    handleIsOnline(!data.includes('is offline'));
    handleData({});
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
    const altSourceTimer = setTimeout(()=>{
      return getOnlineStatus(setIsOnline, setData, setError, setLoading)
    },1000);
    getStreamData(setIsOnline, setData, setError, setLoading, altSourceTimer);
  },[]);
  return { isOnline, data, error, loading };
}
