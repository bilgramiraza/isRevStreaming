import PropTypes from 'prop-types';
import style from './twitch.module.css';
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
  let streamTimer = '';
  if(startedAt && updatedAt)  streamTimer = formatDistance(parseISO(startedAt), parseISO(updatedAt));

  const tagDivs = tags?.map(tag=><span className={ style.tag } key={ tag }>{ tag }</span>);
  return (
    <>
      <h2 className={ style.twitchDivTitle }>Stream Preview</h2>
      <img src={ latestThumbnail } alt='Latest Thumbnail' className={ style.thumbnailImage }/>
      <div className={ style.twitchData }>
        <div className={ style.topPanel }>
          <div className={ style.leftPanel }>
            <h3 className={ style.topLevelText }>
              <a href={ `https://www.twitch.tv/${userName}` } target='_blank' rel='noreferrer'>{ userName }</a>
            </h3>
          </div>
          <div className={ style.rightPanel }>
            <h4 className={ style.lowLevelText }>Viewer Count: { viewerCount }</h4>
            <h4 className={ style.lowLevelText }>Stream Time: { streamTimer }</h4>
          </div>
        </div>
        <div className={ style.bottomPanel }>
          <h4 className={ style.midLevelText }>Title: { streamTitle }</h4>
          <h5 className={ style.lowLevelText }>Category: { game }</h5>
          <p className={ style.tagsDiv }>Tags: { tagDivs }</p>
        </div>
      </div>
    </>
  );
};

export default TwitchDiv;

TwitchDiv.propTypes = {
  data: PropTypes.object,
};
