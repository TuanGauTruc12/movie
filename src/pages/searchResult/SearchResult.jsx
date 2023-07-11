import "./style.scss";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import noResult from "../../assets/no-results.png";
import { useParams } from "react-router-dom";
import MovieCard from "../../components/movieCard/MovieCard";
import Sprinner from "../../components/spinner/Spinner";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (response) => {
        setData(response);
        setPageNum((prev) => prev++);
        setLoading(false);
      }
    );
  };

  const fetchNextData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (response) => {
        if (data?.results) {
          setData({ ...data, results: [...data.results, ...response.results] });
        } else {
          setData(response);
        }

        setPageNum((prev) => prev++);
      }
    );
  };

  useEffect(() => {
    fetchInitialData();
  }, [query]);

  return (
    <div className="search-results-page">
      {loading && <Sprinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="page-title">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Sprinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard data={item} fromSearch={true} key={index} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <div className="not-result">

            <img src={noResult} />
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
