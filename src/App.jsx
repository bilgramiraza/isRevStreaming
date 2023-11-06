import useStreamStatus from "./components/useStreamStatus";
import './app.css';

function App() {
  const { isOnline, error, loading } = useStreamStatus();
  let contentDiv;
  if(loading){
    contentDiv = <span className="loader"></span>;
  }else if(error){
    contentDiv = <p>{"Ope, Something Messed Up, Either wait a few Mins and if that doesn't help Contact Me"}</p>;
  }else{
    contentDiv = <h2>{isOnline?'HE IS':"HE ISN'T"}</h2>;
  }
  return (
    <div>
      <h1>Is Reverse094 Online?</h1>
      {contentDiv}
    </div>
  );
}

export default App;
