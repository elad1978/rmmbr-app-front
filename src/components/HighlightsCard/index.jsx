import React, { useState } from "react";
import styled from "styled-components";
import "./index.css";

const AccordionWrapper = styled.div`
  border: 1px solid #ccc;
  margin: 5px;
`;

const AccordionHeader = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  cursor: pointer;
`;

const AccordionContent = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  display: ${({ open }) => (open ? "block" : "none")};
`;

const Date = styled.div`
  background-color: inherit;
  color: black;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  margin-bottom: 10px;
`;
const Text = styled.div`
  background-color: inherit;
  color: black;
  display: flex;
  flex-direction: column;
`;

const HighlightsCard = ({ title, date, img, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionWrapper>
      <AccordionHeader onClick={toggleAccordion}>
        {date ? <Date className="date">{date}</Date> : null}
        {title}
      </AccordionHeader>
      <AccordionContent open={isOpen}>
        {text ? (
          <Text>
            {img ? (
              <Image src={img} alt="this is a news image" className="img" />
            ) : null}
            {text}
          </Text>
        ) : null}
      </AccordionContent>
    </AccordionWrapper>
  );
};

export default HighlightsCard;
