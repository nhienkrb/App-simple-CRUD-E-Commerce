import useFetchList from "./useFetchList";

const API_URL = `${import.meta.env.VITE_API_URL}/categories`;

const useCategories = () => useFetchList(API_URL);

export default useCategories;
