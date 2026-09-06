import React from 'react'

function ProductPagination({
    totalItems,
    itemsPerPage,
    currentPage,
    setCurrentPage,
}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    const getPages = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }

        let start = Math.max(1, currentPage - 1);
        let end = Math.min(totalPages, currentPage + 1);

        if (currentPage <= 2) {
            start = 1;
            end = 3;
        }

        if (currentPage >= totalPages - 1) {
            start = totalPages - 2;
            end = totalPages;
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const btnBase = "px-3 py-1 border";
    const activeClass = "bg-blue-500 text-white border-blue-500";
    const normalClass = "hover:bg-gray-100";

    return (
        <div className="flex justify-center my-10">

            <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${btnBase} rounded-l border-r-0 ${normalClass} disabled:opacity-40`}
            >
                First
            </button>

            {totalPages > 5 && currentPage > 2 && (
                <span className="px-2 py-1">...</span>
            )}

            {getPages().map((page, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentPage(page)}
                    className={`${btnBase} border-r-0 ${currentPage === page ? activeClass : normalClass}`}
                >
                    {page}
                </button>
            ))}

            {totalPages > 5 && currentPage < totalPages - 1 && (
                <span className="px-2 py-1">...</span>
            )}

            <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${btnBase} rounded-r ${normalClass} disabled:opacity-40`}
            >
                Next
            </button>

        </div>
    )
}

export default ProductPagination