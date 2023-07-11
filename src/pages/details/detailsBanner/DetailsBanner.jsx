import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Image from "../../../components/CustomCompoments/Image";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../../../components/CustomCompoments/PlayIcon";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const directors = crew?.filter((c) => c.job === "Director");
  const writers = crew?.filter(
    (c) => c.job === "Screenplay" || c.job === "Story" || c.job === "Writer"
  );

  const { url } = useSelector((state) => state.home);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const _genres = data?.genres?.map((genre) => genre.id);

  return (
    <div className="details-banner">
      {!loading ? (
        <>
          {!!data && (
            <>
              <div className="backdrop-img">
                <Image src={url.backdrop + data?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data?.poster_path ? (
                      <Image
                        src={url.backdrop + data?.backdrop_path}
                        className={"poster-img"}
                      />
                    ) : (
                      <Image src={PosterFallback} className={"poster-img"} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data?.name || data?.title} (${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data?.tagline}</div>
                    <Genres data={_genres} />
                    <div className="row">
                      <CircleRating rating={data?.vote_average.toFixed(1)} />
                      <div className="play-btn" onClick={() => {
                        setShow(true);
                        setVideoId(video.key);
                      }}>
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data?.overview}</div>
                    </div>
                    <div className="info">
                      {data?.status && (
                        <div className="info-item">
                          <span className="text bold">Status: </span>
                          <div className="text">{data?.status}</div>
                        </div>
                      )}

                      {data?.release_date && (
                        <div className="info-item">
                          <span className="text bold">Release Date: </span>
                          <div className="text">
                            {dayjs(data?.release_date).format("D-MM-YYYY")}
                          </div>
                        </div>
                      )}

                      {data?.runtime && (
                        <div className="info-item">
                          <span className="text bold">Runtime: </span>
                          <div className="text">{data?.runtime}</div>
                        </div>
                      )}
                    </div>
                    {directors?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director:</span>
                        <span className="text">
                          {directors?.map((director, index) => (
                            <span key={index}>
                              {director.name}
                              {directors?.length - 1 !== index && (
                                <span>{","}</span>
                              )}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writers?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer:</span>
                        <span className="text">
                          {writers?.map((writer, index) => (
                            <span key={index}>
                              {writer.name}
                              {writers?.length - 1 !== index && (
                                <span>{","}</span>
                              )}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator:</span>
                        <span className="text">
                          {data?.created_by?.map((create, index) => (
                            <span key={index}>
                              {create.name}
                              {data?.created_by?.length - 1 !== index && (
                                <span>{","}</span>
                              )}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup 
                  show={show}
                  setShow={setShow}
                  setVideoId={setVideoId}
                  videoId={videoId}
                />
              </ContentWrapper>
            </>
          )}
        </>
      ) : (
        <div className="details-banner-skeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
