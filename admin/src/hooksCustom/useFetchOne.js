import { useEffect, useState } from "react";

export default function useFetchOne(path, config = {}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(path, config);
        const res = await response.json();
        setData(res.data || []);
      } catch (error) {
        console.error("FetchOne error:", error);
        setData([]);
      }
    };

    fetchItem();
  }, [path, JSON.stringify(config)]);

  return data;
}
