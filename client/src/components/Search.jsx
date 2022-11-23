import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState(null);

  return (
    <div className="px-2 my-2">
      <input
        type="text"
        value={search}
        onChange={() => {setSearch(search)}}
        placeholder="Type here"
        className="input w-full"
      />
    </div>
  );
};

export default Search;
