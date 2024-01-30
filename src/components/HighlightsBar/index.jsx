import React, { useState } from "react";
import "./index.css";
import HighlightCard from "../HighlightsCard";
import HighlightForm from "../HighlightForm";
import { useMemoryWallContext } from "../../contexts/MemoryWallContexts";

const HighlightsBar = ({
  role,
  wallPermissions, //comes from the Auth
  memoryWallId,
  onAddHighlight,
  index,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { memoryWalls } = useMemoryWallContext();
  const highlightsNews = memoryWalls[index].highlightsNews;

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="highlights-bar">
      {role === "admin" ||
      (role === "partialAccess" &&
        wallPermissions.find((id) => id == memoryWallId)) ? (
        <div className="plus-btn-container">
          <button className="plus-btn" onClick={toggleFormVisibility}>
            <div className="plus-btn-text">הוספת עדכונים</div>
            <span className="plus-span">+</span>
          </button>
        </div>
      ) : null}

      {isFormVisible && (
        <HighlightForm
          highlightsNews={highlightsNews}
          memoryWallId={memoryWallId}
          // highLightUpdate={highLightUpdate}
          onAddHighlight={onAddHighlight}
          index={index}
          toggleFormVisibility={toggleFormVisibility}
        />
      )}

      {highlightsNews
        .slice()
        .reverse()
        .map((item, index) => (
          <HighlightCard
            key={item.id}
            img={item.img}
            date={item.date}
            text={item.text}
            title={item.title}
            eventKey={index}
          />
        ))}
    </div>
  );
};

export default HighlightsBar;
