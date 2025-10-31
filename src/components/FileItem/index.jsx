import React, { useState, useEffect } from "react";
import "./styles.css";
import FilesList from "../FilesList";

// Recursive helper: checks if this node or any child matches the search term
const hasMatchInTree = (node, searchTerm) => {
  if (!searchTerm) return false;

  const match = node.name.toLowerCase().includes(searchTerm.toLowerCase());
  if (match) return true;

  if (node.children?.length > 0) {
    return node.children.some((child) => hasMatchInTree(child, searchTerm));
  }
  return false;
};

const FileItem = ({ info, searchTerm }) => {
  const { id, name, children = [] } = info;
  const [state, setState] = useState(true);

  const hasChildren = children.length > 0;

  // Automatically expand folders that contain a match
  useEffect(() => {
    if (hasChildren && searchTerm) {
      setState(hasMatchInTree(info, searchTerm));
    }
  }, [searchTerm, info, hasChildren]);

  const isMatch =
    searchTerm && name.toLowerCase().includes(searchTerm.toLowerCase());

  const handleClick = (e) => {
    e.stopPropagation();

    if (hasChildren) {
      setState((s) => !s);
    }
  };

  return (
    <li className={`file-item-wrapper item-${id}`} onClick={handleClick}>
      <span className={`${isMatch ? "found" : ""}`}>{name}</span>
      {hasChildren ? (
        <FilesList list={children} showList={state} searchTerm={searchTerm} />
      ) : null}
    </li>
  );
};

export default FileItem;
