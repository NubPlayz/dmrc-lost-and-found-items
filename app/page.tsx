"use client";
import Image from "next/image"
import { useState, useEffect } from "react";
import dmrcLogo from './asset/dmrc-logo.png';
import dmrcGirl from './asset/dmrcGirl.jpg';


import lastUpdateData from '../script/lastUpdated.json' assert { type: 'json' };

import { Analytics } from "@vercel/analytics/next"
const updateInfo = lastUpdateData as { date: string };

type LostItem = {
  id: number;
  item_name: string;
  description: string;
  quantity: string;
  station: string;
  receiving_date: string;
  receiving_time: string;
};
//

export default function Home() {

  const [station, setStation] = useState("");
  const [date, setDate] = useState("");
  const [line, setLine] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentState, setCurrentState] = useState('NOT_STARTED')

  const [results, setResults] = useState<LostItem[]>([]);


  async function searchItems(pageNumber: number = 1) {
    const params = new URLSearchParams();

    if (station) params.append("station", station);
    if (date) params.append("date", date);
    if (line) params.append("line", line);
    params.append("page", pageNumber.toString());

    try {
      setCurrentState("LOADING");
      setResults([]);
      const [res] = await Promise.all([
        fetch(`/api/items?${params.toString()}`),
        new Promise((resolve) => setTimeout(resolve, 600))
      ]);
      const data = await res.json();

      setCurrentState(() => {
        if (data.filteredItems1.length == 0) {
          return "NO_RESULT"
        }
        return "LOADED"
      })
      setResults(data.filteredItems1 || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
      setCurrentState("ERROR")
    }
  }


  const handleSearchClick = () => {
    setPage(1);
    searchItems(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchClick();
    }
  };


  return (
    <>
      <header className="hero-section">
        <div className="hero-image">
          <Image
            src="/banner.png"
            alt="Delhi Metro Banner"
            width={1920}
            height={600}
            className="hero-img"
          />
        </div>

        <div className="hero-content">
          <h1 className="title">D<span className="M">M</span>RC: Lost and Found</h1>
          <p className="subtitle">Find lost items in Delhi Metro</p>
        </div>
      </header>


      <main className="main">


        <div className="searchbox" onKeyDown={handleKeyDown}>
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
              type="text"
              className="input"
              placeholder="dd-mm-yyyy"
              value={date}
              onFocus={(e) => e.target.type = "date"}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text"
              }}
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


        <div className="status-container">


          {currentState === "NOT_STARTED" && (
            <div className="info-card">
              <div className="image-frame">
                <img src={dmrcGirl.src} alt="Guide" className="guide-img" />
              </div>
              <div className="text-content">
                <h2>Welcome to Metro Finder</h2>
                <p>Please enter details above to find lost items.</p>
              </div>
            </div>
          )}


          {currentState === "NO_RESULT" && (
            <div className="no-results-card">
              <p>🚫 No items found matching your criteria.</p>
              <span>Try changing the station or selecting a different date.</span>


            </div>

          )}



          {currentState === "ERROR" && (
            <div className="status-message error">
              ⚠️ Something went wrong. Please try again later.
            </div>

          )}



          {currentState === "LOADING" && (
            <div className="status-container">
              <div className="loading-state">
                <div className="logo-wrapper">

                  <img src={dmrcLogo.src} alt="DMRC Logo" className="metro-logo" />
                  <div className="loader-ring"></div>
                </div>
                <p>Searching the metro archives...</p>
              </div>
            </div>
          )}
        </div>






      </main>

      {results?.length > 0 && (
        <div className="table-wrapper">
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

      <footer className="disclaimer-footer">

        <p className="last-updated-text">
          Data last synced: <strong> {new Date(updateInfo.date).toLocaleString()}</strong>
        </p>
        <p>
          <strong>Disclaimer:</strong> This is an unofficial project. All logos,
          images, and characters are the property of Delhi Metro Rail Corporation (DMRC).
          This site is for informational purposes only.

        </p>

        <a href="https://github.com/NubPlayz/MetroFinder-Lost-Items" target="_blank" rel="noopener noreferrer">
          <svg className="github-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </footer>

      <Analytics />
    </>
  );
}
