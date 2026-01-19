"use client";

import { useState, useEffect } from "react";


type LostItem = {
  id: number;
  item_name: string;
  description: string;
  quantity: string;
  station: string;
  receiving_date: string;
  receiving_time: string;
};


export default function Home() {

  const [station, setStation] = useState("");
  const [date, setDate] = useState("");
  const [line, setLine] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [results, setResults] = useState<LostItem[]>([]);


  async function searchItems(pageNumber: number = 1) {
    const params = new URLSearchParams();

    if (station) params.append("station", station);
    if (date) params.append("date", date);
    if (line) params.append("line", line);
    params.append("page", pageNumber.toString());

    try {
      const res = await fetch(`/api/items?${params.toString()}`);
      const data = await res.json();


      setResults(data.filteredItems1 || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    }
  }


  const handleSearchClick = () => {
    setPage(1);
    searchItems(1);
  };



  return (
    <>  <h1 className="title">Metro Finder</h1>

      <main className="main">
        <div className="searchbox">

          <div className="detail">
            <input
              type="text"
              className="input"
              placeholder="Enter Station"
              value={station}
              onChange={(e) => setStation(e.target.value)}
            />
          </div>

          <div className="detail">
            <input
              type="date"
              placeholder="YYYY-MM-DD"
              className="input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="detail">
            <select
              className="input"
              value={line}
              onChange={(e) => setLine(e.target.value)}
            >
              <option value="">Select Line</option>
              <option value="RED">RED</option>
              <option value="YELLOW">YELLOW</option>
              <option value="BLUE">BLUE</option>
              <option value="GREEN">GREEN</option>
              <option value="VIOLET">VIOLET</option>
              <option value="PINK">PINK</option>
              <option value="ORANGE">ORANGE</option>
              <option value="MAGENTA">MAGENTA</option>
              <option value="GREY">GREY</option>
              <option value="AQUA">AQUA</option>
              <option value="RAPID">RAPID METRO (GURUGRAM)</option>

            </select>
          </div>

          <button onClick={handleSearchClick} className="search-btn">
            Search
          </button>


        </div>

      </main>
      {results?.length > 0 && (
        <div className="table-wrapper ">
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Description</th>
                <th>Item Quantity</th>
                <th>Station Name</th>
                <th>Receiving Date</th>
                <th>Receiving Time</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item) => (
                <tr key={item.id}>
                  <td data-label="Item Name">{item.item_name}</td>
                  <td data-label="Description">{item.description}</td>
                  <td data-label="Item Quantity">{item.quantity}</td>
                  <td data-label="Station Name">{item.station}</td>
                  <td data-label="Receiving Date">{item.receiving_date}</td>
                  <td data-label="Receiving Time">{item.receiving_time}</td>
                </tr>
              ))}
            </tbody>
          </table>


          <div className="pagination">
            <div className="pagination-left">
              <button
                className="pager prev"
                onClick={() => {
                  const newPage = page - 1;
                  setPage(newPage);
                  searchItems(newPage);
                }}
                disabled={page === 1}
              >
                ← Previous
              </button>
            </div>

            <div className="pagination-center">
              <span className="page-info">
                Page {page} of {totalPages}
              </span>
            </div>

            <div className="pagination-right">
              <button
                className="pager next"
                onClick={() => {
                  const newPage = page + 1;
                  setPage(newPage);
                  searchItems(newPage);
                }}
                disabled={page === totalPages}
              >
                Next →
              </button>
            </div>
          </div>


        </div>
      )}
    </>
  );
}
