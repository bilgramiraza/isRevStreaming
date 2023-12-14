import useStreamStatus from "./components/useStreamStatus";
import './app.css';
import TwitchDiv from "./components/TwitchDiv";
import Footer from "./components/Footer";
import StatusDiv from "./components/StatusDiv";

function App() {
  const { isOnline, data, error, loading } = useStreamStatus();
  return (
    <div className="page">
      <div className="main">
        <div className="statusDiv">
          <h1 className="pageTitle">Is Reverse094 Online?</h1>
          {
            loading 
            ? <span className="loader"></span>
            : <StatusDiv isOnline={isOnline}/>
          }
          {error && <p className="error">{"Ope, Something Messed Up, Either wait a few Mins and try again and if that doesn't help Contact Me"}</p>}
        </div>
        <div className='twitchDiv'>
          {
            loading 
            ? <span className="loader"></span>
            : isOnline && <TwitchDiv data={data}/>
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
