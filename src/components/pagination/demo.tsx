import { useState } from "react";
import Pagination from ".";

export function App() {
    const [currentPage, setCurrentPage] = useState(10);
    return (
        <Pagination
        currentPage={currentPage}
        totalPages={10}
        setCurrentPage={setCurrentPage}
        />
    );
}

export default App;