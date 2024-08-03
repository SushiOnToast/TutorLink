import React, { useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  color: #406170;
  display: inline-block;
  margin: 5px;
  font-size: 13px;
  transition-duration: 0.4s;
`;

const DropdownButton = styled.button`
  color: #406170;
  background-color: #CCC8B2;
  padding: 2px 25px;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  border-radius: 50px;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  background-color: #CCC8B2;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 100%;
`;

const DropdownItem = styled.label`
  display: block;
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }

  input {
    margin-right: 7px;
  }
`;

function SingleSelectDropdown({
  items,
  selectedItem,
  onSelectItem,
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleItemClick = (value, e) => {
    e.stopPropagation();
    onSelectItem(value);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={handleButtonClick}>
        {selectedItem ? items.find((item) => item.id === selectedItem).name : placeholder}
      </DropdownButton>
      <DropdownContent show={isOpen}>
        {items.map((item) => (
          <DropdownItem key={item.id} onClick={(e) => handleItemClick(item.id, e)}>
            <input
              type="radio"
              name="single-select"
              value={item.id}
              checked={selectedItem === item.id}
              readOnly
            />
            {item.name}
          </DropdownItem>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
}

export default SingleSelectDropdown;
