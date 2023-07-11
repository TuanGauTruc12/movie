import { useState } from "react";
import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);
  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setSelectedTab(index);
    onTabChange(tab, index);
  };

  return (
    <div className="switching-tabs">
      <div className="tab-items">
        {data?.map((tab, index) => {
          return (
            <span
              className={`tab-item ${selectedTab === index ? "active": ""}`}
              key={index}
              onClick={() => activeTab(tab, index)}
            >
              {tab}
            </span>
          );
        })}
        <span className="moving-bg" style={{ left }}></span>
      </div>
    </div>
  );
};

export default SwitchTabs;
