import PropTypes from 'prop-types';
import './twitch.css';
import { formatDistance, parseISO } from 'date-fns';

const TwitchDiv = ({ data }) => {
  const { 
    latestThumbnail, 
    userName, 
    streamTitle, 
    game, 
    tags,
    viewerCount, 
    startedAt,
    updatedAt
  } = data;
  const streamTimer = formatDistance(parseISO(startedAt), parseISO(updatedAt));
  const tagDivs = tags?.map(tag=><span className='tag' key={ tag }>{ tag }</span>);//Fix CSS
  return (
    <>
      <h2 className='twitchDivTitle'>Stream Preview</h2>
      <img src={ latestThumbnail } alt='Latest Thumbnail' className='thumbnailImage'/>
      <div className='twitchData'>
        <div className='topPanel'>
          <div className='leftPanel'>
            <h3 className='topLevelText'>
              <a href={ `https://www.twitch.tv/${userName}` } target='_blank' rel='noreferrer'>{ userName }</a>
            </h3>
          </div>
          <div className='rightPanel'>
            <h4 className='lowLevelText'>Viewer Count: { viewerCount }</h4>
            <h4 className='lowLevelText'>Stream Time: { streamTimer }</h4>
          </div>
        </div>
        <div className='bottomPanel'>
          <h4 className='midLevelText'>Title: { streamTitle }</h4>
          <h5 className='lowLevelText'>Category: { game }</h5>
          <p className='tagsDiv'>Tags: { tagDivs }</p>
        </div>
      </div>
    </>
  );
};

export default TwitchDiv;

TwitchDiv.propTypes = {
  data: PropTypes.object,
};
