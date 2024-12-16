import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex items-center justify-center">
        <div className="h-16 w-16 border-4 border-primary border-t-transparent animate-spin rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
