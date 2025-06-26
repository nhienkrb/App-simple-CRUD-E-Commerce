import { useEffect, useState } from "react";

const useFetchList = (path, query = {}, config = {}) => {
  const [data, setData] = useState([]);

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
        setData([]); // fallback khi lỗi
      }
    };

    fetchAPI();
  }, [path, JSON.stringify(query), JSON.stringify(config)]);

  return data; // ✅ chỉ return mảng data
};

export default useFetchList;
