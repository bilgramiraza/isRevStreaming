import useStreamStatus from "./components/useStreamStatus";
import './app.css';
import offline from './assets/offlineGengar.jpeg';
import online from './assets/onlineGengar.jpg';
import TwitchDiv from "./components/TwitchDiv";
import Footer from "./components/Footer";

function App() {
  const { isOnline, data, error, loading } = useStreamStatus();
  let mainContentDiv, imageDiv;
  if(loading){
    mainContentDiv = <span className="loader"></span>;
  }else if(error){
    mainContentDiv = <p>{"Ope, Something Messed Up, Either wait a few Mins and try again and if that doesn't help Contact Me"}</p>;
  }else{
    mainContentDiv = <h2>{isOnline?'HE IS':"HE ISN'T"}</h2>;
    imageDiv = <img src={isOnline ? online : offline } alt={isOnline?'happyGengarImage':'sadGengarImage'} width={300} height={200}/>
  }
  return (
    <div className="page">
      <div className="main">
        <div className="statusDiv">
          <h1>Is Reverse094 Online?</h1>
          {mainContentDiv}
          {isOnline && <h2><a href={`https://www.twitch.tv/${data.userName}`} target="_blank" rel="noreferrer">Go There</a></h2>}
          {imageDiv}
          <h4>While you are here, check out his <a href="https://twitter.com/reverse094" target="_blank" rel="noreferrer">Twitter</a></h4>
        </div>
        {isOnline && <TwitchDiv data={data}/>}
      </div>
      <Footer />
    </div>
  );
}

export default App;
