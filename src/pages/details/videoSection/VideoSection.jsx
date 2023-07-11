import { useState } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../../../components/CustomCompoments/PlayIcon";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Image from "../../../components/CustomCompoments/Image";

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="sk-item">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <>
      {data?.results?.length > 0 && (
        <div className="videos-section">
          <ContentWrapper>
            <div className="section-heading">Official Videos</div>
            {!loading ? (
              <div className="videos">
                {data?.results?.map((video) => (
                  <div
                    key={video.id}
                    className="video-item"
                    onClick={() => {
                      setVideoId(video.key);
                      setShow(true);
                    }}
                  >
                    <div className="video-thumbnail">
                      <Image
                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                      />
                      <PlayIcon />
                    </div>
                    <div className="video-title">{video.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="video-skeleton">
                {loadingSkeleton()}
                {loadingSkeleton()}
                {loadingSkeleton()}
                {loadingSkeleton()}
              </div>
            )}
          </ContentWrapper>

          <VideoPopup
            show={show}
            setShow={setShow}
            videoId={videoId}
            setVideoId={setVideoId}
          />
        </div>
      )}
    </>
  );
};

export default VideosSection;