import { useEffect, useState } from "react";

const useFetchList = (path, query = {}, config = {}) => {
  const [data, setData] = useState([]);
  const [refetchIndex, setRefetchIndex] = useState(0);

  // Đặt refetch ở đây trước khi return
  const refetch = () => {
    setRefetchIndex((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const queryString = new URLSearchParams(query).toString();
        const url = queryString ? `${path}?${queryString}` : path;

        const response = await fetch(url, config);
        const res = await response.json();

        setData(res.data || []);
      } catch (error) {
        console.error("Fetch error:", error);
        setData([]);
      }
    };

    fetchAPI();
  }, [path, JSON.stringify(query), JSON.stringify(config), refetchIndex]);

  return { data, refetch }; 
};

export default useFetchList;
