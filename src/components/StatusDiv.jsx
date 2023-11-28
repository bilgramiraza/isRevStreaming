import offline from '../assets/offlineGengar.jpeg';
import online from '../assets/onlineGengar.jpg';
import { TwitchSvg, TwitterSvg } from "../assets/svg";
import PropTypes from 'prop-types';
import './status.css';

const StatusDiv= ({ isOnline })=>{
  let mainContentDiv, imageDiv;
  if(isOnline){
    mainContentDiv = <h2 className="pageTitleReplyYes">HE IS</h2>;
    imageDiv = <img className="statusImage" src={ online } alt={ 'happyGengarImage' }/>
  }else{
    mainContentDiv = <h2 className="pageTitleReplyNo">{"HE ISN'T"}</h2>;
    imageDiv = <img className="statusImage" src={ offline } alt={ 'sadGengarImage' }/>
  }
  
  return (
    <>
      <div className="statusTextDiv">
        {mainContentDiv}
        {isOnline && <a className="twitchBtn" href={`https://www.twitch.tv/${import.meta.env.VITE_STREAMER_USERNAME}`} target="_blank" rel="noreferrer">Go There <TwitchSvg /></a>}
      </div>
      {imageDiv}
      <h4 className="socialsText">While you are here, check out his <a className="twitterBtn" href="https://twitter.com/reverse094" target="_blank" rel="noreferrer">Twitter <TwitterSvg /></a></h4>
    </>
  );
}

export default StatusDiv;

StatusDiv.propTypes = {
  loading: PropTypes.bool, 
  isOnline: PropTypes.bool, 
  error: PropTypes.object, 
};
