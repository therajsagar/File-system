import React from "react";
import "./styles.css";
import FileItem from "../FileItem";

const FilesList = ({ list, showList = true, searchTerm = "" }) => {
  return (
    <ul className={`list-wrapper ${!showList && "hide-section"}`}>
      {list.map((item) => (
        <FileItem key={item.id} info={item} searchTerm={searchTerm} />
      ))}
    </ul>
  );
};

export default FilesList;
