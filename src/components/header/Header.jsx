import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const handleOpenMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const handleSearchQuery = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const handleNavigate = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  const controlNavbar = (lastScrollY) => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header className={`header ${mobileMenu ? "mobile-view" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="logo" onClick={() => navigate("/")} />
        </div>
        <ul className="menu-items">
          <li className="menu-item" onClick={() => handleNavigate("movie")}>
            Movies
          </li>
          <li className="menu-item" onClick={() => handleNavigate("tv")}>
            TV Shows
          </li>
          <li className="menu-item">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <div className="mobile-menu-items">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose
              onClick={() => {
                setMobileMenu(false);
              }}
            />
          ) : (
            <SlMenu onClick={handleOpenMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="search-bar">
          <ContentWrapper>
            <div className="search-input">
              <input
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={(event) => handleSearchQuery(event)}
                type="text"
                placeholder="Search for a movie or TV show..."
              />
              <VscChromeClose
                onClick={() => {
                  setShowSearch(false);
                }}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
