import { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Image from "../../components/CustomCompoments/Image";
import CircleRating from "../circleRating/CircleRating";
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const navigation = (dir) => {
    const container = carouselContainer.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({ left: scrollAmount, behavior: "smooth" });
  };

  const skItem = () => {
    return (
      <div className="skeleton-item">
        <div className="poster-block skeleton">
          <div className="text-block">
            <div className="title skeleton"></div>
            <div className="date skeleton"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      {data?.length > 0 && (
        <ContentWrapper>
          {title && <div className="carousel-title">{title}</div>}
          <BsFillArrowLeftCircleFill
            color="white"
            className="arrow carousel-left-nav"
            onClick={() => navigation("left")}
          />

          <BsFillArrowRightCircleFill
            color="white"
            className="arrow carousel-right-nav"
            onClick={() => navigation("right")}
          />

          {!loading ? (
            <>
              <div className="carousel-items" ref={carouselContainer}>
                {data?.map((item) => {
                  const posterUrl = item?.poster_path
                    ? url.poster + item?.poster_path
                    : PosterFallback;
                  return (
                    <div
                      key={item.id}
                      className="carousel-item"
                      onClick={() =>
                        navigate(`/${item?.media_type || endpoint}/${item?.id}`)
                      }
                    >
                      <div className="poster-block">
                        <Image src={posterUrl} />
                        <CircleRating rating={item?.vote_average?.toFixed(1)} />
                        <Genres data={item?.genre_ids?.slice(0, 2)} />
                      </div>
                      <div className="text-block">
                        <span className="title">{item?.title || item?.name}</span>
                        <span className="date">
                          {dayjs(item?.release_Date).format("D MMM YYYY")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="loading-skeleton">
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default Carousel;
