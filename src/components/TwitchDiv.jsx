import PropTypes from 'prop-types';
import './twitch.css';

const TwitchDiv = ({ data }) => {
  const { 
    latestThumbnail, 
    userName, 
    streamTitle, 
    game, 
    tags,
    viewerCount, 
    startedAt } = data;
  const tagDivs = tags?.map(tag=><span className='tag' key={ tag }>{ tag }</span>);
  return (
    <div className='twitchDiv'>
      <div>
        <h2>Stream Preview</h2>
      </div>
      <div>
        <img src={ latestThumbnail } height={480} width={640}/>
      </div>
      <div className='twitchData'>
        <div className='leftPanel'>
          <h3 className='topLevelText'>{ userName }</h3>
          <h4 className='midLevelText'>Title: { streamTitle }</h4>
          <h5 className='lowLevelText'>Category: { game }</h5>
          <p className='tagsDiv'>Tags: { tagDivs }</p>
        </div>
        <div className='rightPanel'>
          <h4 className='lowLevelText'>Viewer Count: { viewerCount }</h4>
          <h4 className='lowLevelText'>Stream Time: { startedAt }</h4>
        </div>
      </div>
    </div>
  );
};

export default TwitchDiv;

TwitchDiv.propTypes = {
  data: PropTypes.object,
};
