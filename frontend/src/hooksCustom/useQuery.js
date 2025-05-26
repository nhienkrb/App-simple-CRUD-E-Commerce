import { useState } from "react";

const useQuery = (initial) => {
    const [query, setQuery] = useState(initial);

    const updateQuery = (newQuery) => {
        setQuery((prevQuery) => {
            // Merge the new query with the previous one
            return {...prevQuery,...newQuery};  
        })
    }

    const resetQuery = () => {
        setQuery(initial);
    }
    return [query,updateQuery, resetQuery];
}
export default useQuery;