import useStreamStatus from "./components/useStreamStatus";
import './app.css';
import offline from './assets/offlineGengar.jpeg';
import online from './assets/onlineGengar.jpg';

function App() {
  const { isOnline, error, loading } = useStreamStatus();
  let mainContentDiv, imageDiv;
  if(loading){
    mainContentDiv = <span className="loader"></span>;
  }else if(error){
    mainContentDiv = <p>{"Ope, Something Messed Up, Either wait a few Mins and try again and if that doesn't help Contact Me"}</p>;
  }else{
    mainContentDiv = <h2>{isOnline?'HE IS':"HE ISN'T"}</h2>;
    imageDiv = <img src={isOnline?online:offline} alt={isOnline?'happyGengarImage':'sadGengarImage'} width={300} height={200}/>
  }
  return (
    <div>
      <h1>Is Reverse094 Online?</h1>
      {mainContentDiv}
      {isOnline && <a href="https://www.twitch.tv/reverse094" target="_blank" rel="noreferrer">Go There</a>}
      {imageDiv}
      <h4>While you are here, check out his <a href="https://twitter.com/reverse094" target="_blank" rel="noreferrer">Twitter</a></h4>
    </div>
  );
}

export default App;
