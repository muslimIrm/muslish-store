import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginatedButton = ({
  currentPage,
  totalPages ,
  onPageChange,
}: PaginationProps) => {
  const handlePageChange = (newPage: number) => {
    
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-3 p-2">
      <div className="flex items-center justify-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-11 h-11 p-1 bg-white shadow border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Number Buttons */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNumber = i + 1;
            const isActive = pageNumber === currentPage;

            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`flex w-11 h-11 p-1 items-center justify-center transition-colors rounded-sm shadow border ${
                  isActive
                    ? "bg-darkColor text-white hover:bg-darkColor/90"
                    : "bg-white text-darkColor hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-11 h-11 p-1 bg-white shadow border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PaginatedButton;