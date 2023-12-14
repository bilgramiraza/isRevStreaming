import useStreamStatus from "./components/useStreamStatus";
import style from './app.module.css';
import TwitchDiv from "./components/TwitchDiv";
import Footer from "./components/Footer";
import StatusDiv from "./components/StatusDiv";

function App() {
  const { isOnline, data, error, loading } = useStreamStatus();
  return (
    <div className={ style.page }>
      <div className={ style.main }>
        <div className={ style.statusDiv }>
          <h1 className={ style.pageTitle }>Is Reverse094 Online?</h1>
          {
            loading 
            ? <span className={ style.loader }></span>
            : <StatusDiv isOnline={isOnline}/>
          }
          {error && <p className={ style.error }>{"Ope, Something Messed Up, Either wait a few Mins and try again and if that doesn't help Contact Me"}</p>}
        </div>
        <div className={ style.twitchDiv }>
          {
            loading 
            ? <span className={ style.loader }></span>
            : isOnline && <TwitchDiv data={data}/>
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
