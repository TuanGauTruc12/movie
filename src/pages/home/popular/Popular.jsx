import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/popular`);
  const handleTabsChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carousel-section">
      <ContentWrapper>
        <span className="carousel-title">What's Popular</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={handleTabsChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} 
      endpoint={endpoint}/>
    </div>
  );
};

export default Popular;
