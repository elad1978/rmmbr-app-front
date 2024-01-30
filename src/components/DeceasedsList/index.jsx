import React, { useState, useEffect } from "react";
import DeceasedCard from "../DeceasedCard";
import Header from "../Header";
import { useMemoryWallContext } from "../../contexts/MemoryWallContexts";
import { deleteDataFromDatabase } from "../../services/apiFetcher";
import "./index.css";
import AddDeceasedCard from "../AddDeceasedCard";
//import { fetchDataFromDatabase } from "../../services/apiFetcher";

const DeceasedsList = ({ role, wallPermissions, memoryWallId, index }) => {
  const { memoryWalls, setMemoryWalls } = useMemoryWallContext();
  console.log(memoryWalls[index].deceasedsInfo);
  const memoryWall = memoryWalls[index];
  const [deceasedsInfo, setDeceasedsInfo] = useState(memoryWall.deceasedsInfo);
  console.log(deceasedsInfo);

  const ratingTypes = memoryWalls[index].ratingTypes;
  //console.log(memoryWallId);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const deleteDeceasedCard = async (deceasedId) => {
    const endpoint = `http://localhost:3000/api/getMemoryWallById/${memoryWallId}/deceasedsInfo/${deceasedId}/`;
    try {
      const newDeceasedList = await deleteDataFromDatabase(endpoint);
      //window.location.reload();
      setMemoryWalls((prevState) => {
        const newState = [...prevState];
        newState[index].deceasedsInfo = newDeceasedList;
        setDeceasedsInfo(newDeceasedList);
        return newState;
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const addNewDeceasedCardToMemoryWall = (newDeceased) => {
    console.log(deceasedsInfo);
    const updateDeceasedsInfo = [...deceasedsInfo, newDeceased];
    setDeceasedsInfo(updateDeceasedsInfo);
    memoryWalls[index].deceasedsInfo = updateDeceasedsInfo;
    setMemoryWalls(memoryWalls);
  };

  const deceasedsFirstPlace = memoryWalls[index].deceasedsInfo.filter(
    (d) => d.donationAmount >= ratingTypes.firstPlace.minAmount
  );
  const deceasedsSecondPlace = memoryWalls[index].deceasedsInfo.filter(
    (d) =>
      d.donationAmount >= ratingTypes.secondPlace.minAmount &&
      d.donationAmount < ratingTypes.firstPlace.minAmount
  );
  const deceasedsThirdPlace = memoryWalls[index].deceasedsInfo.filter(
    (d) =>
      d.donationAmount >= ratingTypes.thirdPlace.minAmount &&
      d.donationAmount < ratingTypes.secondPlace.minAmount
  );

  return (
    <div>
      <div className="deceaseds-btn-container">
        {role === "admin" ||
        (role === "partialAccess" &&
          wallPermissions.find((id) => id == memoryWallId)) ? (
          <button className="deceaseds-plus-btn" onClick={handleOpenModal}>
            <div className="deceaseds-plus-btn-text">הוספת כרטיס</div>
            <span className="deceaseds-plus-span">+</span>
          </button>
        ) : null}
      </div>
      {showModal && (
        <AddDeceasedCard
          handleClose={handleCloseModal}
          memoryWallId={memoryWallId}
          onCancel={() => setShowModal(false)}
          addNewDeceasedCardToMemoryWall={addNewDeceasedCardToMemoryWall}
        />
      )}

      <div>
        {deceasedsFirstPlace.length != 0 ? (
          <Header
            title={ratingTypes.firstPlace.title}
            size={"50px"}
            margin={"0 39% 0 0 "}
          />
        ) : null}
        {deceasedsFirstPlace.map((deceased, dIndex) => (
          <DeceasedCard
            deceased={deceased}
            key={deceased.id}
            role={role}
            wallPermissions={wallPermissions}
            memoryWallId={memoryWallId}
            deceasedId={deceased.id}
            deleteDeceasedCard={deleteDeceasedCard}
            index={index}
            dIndex={dIndex}
            // handleRefresh={handleRefresh}
          />
        ))}
      </div>
      <div>
        {deceasedsSecondPlace.length != 0 ? (
          <Header
            title={ratingTypes.secondPlace.title}
            size={"50px"}
            margin={"0 39% 0 0 "}
          />
        ) : null}
        {deceasedsSecondPlace.map((deceased, dIndex) => (
          <DeceasedCard
            deceased={deceased}
            key={deceased.id}
            role={role}
            wallPermissions={wallPermissions}
            memoryWallId={memoryWallId}
            deceasedId={deceased.id}
            deleteDeceasedCard={deleteDeceasedCard}
            index={index}
            dIndex={dIndex}
            // handleRefresh={handleRefresh}
          />
        ))}
      </div>
      <div>
        {deceasedsThirdPlace.length != 0 ? (
          <Header
            title={ratingTypes.thirdPlace.title}
            size={"50px"}
            margin={"0 39% 0 0 "}
          />
        ) : null}
      </div>
      {deceasedsThirdPlace.map((deceased, dIndex) => (
        <DeceasedCard
          deceased={deceased}
          key={deceased.id}
          role={role}
          wallPermissions={wallPermissions}
          memoryWallId={memoryWallId}
          deceasedId={deceased.id}
          deleteDeceasedCard={deleteDeceasedCard}
          index={index}
          dIndex={dIndex}
        />
      ))}
    </div>
  );
};

export default DeceasedsList;
