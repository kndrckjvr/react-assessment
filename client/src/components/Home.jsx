import { useEffect, useState } from "react";

let Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <h1>Assessment</h1>
      <p>{data ?? "loading..."}</p>
    </div>
  );
};

export default Home;
