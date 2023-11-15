import useStreamStatus from "./components/useStreamStatus";
import './app.css';
import offline from './assets/offlineGengar.jpeg';
import online from './assets/onlineGengar.jpg';
import TwitchDiv from "./components/TwitchDiv";
import Footer from "./components/Footer";
import { TwitchSvg, TwitterSvg } from "./assets/svg";

function App() {
  const { isOnline, data, error, loading } = useStreamStatus();
  let mainContentDiv, imageDiv;
  if(loading){
    mainContentDiv = <span className="loader"></span>;
  }else if(error){
    mainContentDiv = <p className="error">{"Ope, Something Messed Up, Either wait a few Mins and try again and if that doesn't help Contact Me"}</p>;
  }else{
    if(isOnline){
      mainContentDiv = <h2 className="pageTitleReplyYes">HE IS</h2>;
      imageDiv = <img className="statusImage" src={ online } alt={ 'happyGengarImage' }/>
    }else{
      mainContentDiv = <h2 className="pageTitleReplyNo">{"HE ISN'T"}</h2>;
      imageDiv = <img className="statusImage" src={ offline } alt={ 'sadGengarImage' }/>
    }
  }
  return (
    <div className="page">
      <div className="main">
        <div className="statusDiv">
          <h1 className="pageTitle">Is Reverse094 Online?</h1>
            <div className="statusTextDiv">
              {mainContentDiv}
              {isOnline && <a className="twitchBtn" href={`https://www.twitch.tv/${data.userName}`} target="_blank" rel="noreferrer">Go There <TwitchSvg /></a>}
            </div>
          {imageDiv}
          <h4 className="socialsText">While you are here, check out his <a className="twitterBtn" href="https://twitter.com/reverse094" target="_blank" rel="noreferrer">Twitter <TwitterSvg /></a></h4>
        </div>
        {isOnline && <TwitchDiv data={data}/>}
      </div>
      <Footer />
    </div>
  );
}

export default App;
