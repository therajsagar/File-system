import React, { useEffect, useState } from "react";
import { fetchData } from "../../utils";
import FilesList from "../FilesList";

const Filesystem = () => {
  const [state, setState] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      const data = await fetchData();
      setState(data);
    })();
  }, []);

  return (
    <div className="main-wrapper">
      <input
        type="text"
        placeholder="Search files..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <FilesList list={state} searchTerm={searchTerm} />
    </div>
  );
};

export default Filesystem;
