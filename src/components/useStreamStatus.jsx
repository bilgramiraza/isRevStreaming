import { useEffect, useState } from "react";

const getData = async (handleIsOnline, handleData, handleError, handleLoading) => {
  try{
    const response = await fetch('https://twitchapi.onrender.com/api/reverse094');
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

export default function useStreamStatus(){
  const [ data, setData ] = useState({});
  const [ isOnline, setIsOnline ] = useState(false);
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(true);

  useEffect(()=>{
    getData(setIsOnline, setData, setError, setLoading);
  },[]);
  return { isOnline, data, error, loading };
}
