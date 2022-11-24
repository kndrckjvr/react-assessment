import { useState, useEffect } from "react";
import NoteList from "./note/NoteList";

const Search = () => {
  // rework with redux
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setQuery(search);
    }, 500);
    return () => clearTimeout(timeOut);
  }, [search]);

  return (
    <div>
      <div className="px-2 my-2">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search title here"
          className="input w-full"
        />
      </div>
      <NoteList search={query} searchList={true} />
    </div>
  );
};

export default Search;
