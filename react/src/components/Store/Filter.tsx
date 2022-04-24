import React from 'react';

export const StorefrontFilter: React.VFC = () => {
  return (
    <aside className=" flex flex-col">
      <h2>Filter</h2>

      <div>
        <details className="cursor-pointer">
          <summary>Details</summary>
          Something small enough to escape casual notice.
        </details>
      </div>
    </aside>
  );
};
