import { useEffect, useState } from "react";

const useFetchList = (path, query, config = {}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
        const queryString = new URLSearchParams(query).toString();
      const response = await fetch(path,query,config);
    //   const response = await fetch(`${path}/search?${queryString}`, config);
      const res = await response.json();
      setData(res.data || []);
    };
    fetchAPI();
  }, [path, JSON.stringify(query), JSON.stringify(config)]);
  return data;
};

export default useFetchList;
