import "./style.scss";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Image from "../../../components/CustomCompoments/Image";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);
  
  const skeleton = () => {
    return (
      <div className="sk-item">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="cast-section">
      <ContentWrapper>
        <div className="section-heading">Top Cast</div>
        {!loading ? (
          <div className="list-items">
            {data?.map((item, index) => {
              let imageUrl = item.profile_path ? url.profile + item.profile_path : avatar;
              return (
                <div key={index} className="list-item">
                  <div className="profile-img">
                    <Image src={imageUrl} />
                  </div>
                  <div className="name">
                    {item.name}
                  </div>
                  <div className="character">
                    {item.character}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="cast-skeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
