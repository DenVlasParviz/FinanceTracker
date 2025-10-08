import React from "react";

export const FilterButtons = () => {
  return (
    <section className="border-b border-gray-400">
      <ul className="flex items-center ">
        <li>
          <button className="view-button ">All</button>
        </li>
        <li>
          <button className="view-button ">Underfunded</button>
        </li>
        <li>
          <button className="view-button ">Overfunded</button>
        </li>
      </ul>
    </section>
  );
};
