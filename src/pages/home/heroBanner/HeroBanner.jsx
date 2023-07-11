import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import Image from "../../../components/CustomCompoments/Image";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useSelector } from "react-redux";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/upcoming");
  const { url } = useSelector((state) => state.home);
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * data?.results?.length)]
        ?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const handleSearchQuery = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  const handleSearch = () => {};

  return (
    <div className="hero-banner">
      <div className="backdrop-img">
        {!loading && <Image src={background} />}
      </div>

      <div className="opacity-layer">

      </div>
      <ContentWrapper>
        <div className="hero-banner-content">
          <span className="title">Welcome.</span>
          <span className="sub-title">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="search-input">
            <input
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={(event) => handleSearchQuery(event)}
              type="text"
              placeholder="Search for a movie or TV show..."
            />
            <button onClick={() => handleSearch}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
