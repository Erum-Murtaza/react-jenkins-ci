import React, { useState } from "react";
import TopBar from "../components/TopBar";
import "./AddGenrePage.css";

function AddGenrePage({ genreData, setGenreData, setActivePage }) {
  const [packName, setPackName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!packName.trim()) return;

    const newGenre = {
      title: packName,
      items: description.split(",").map((item) => item.trim()),
    };

    setGenreData([...genreData, newGenre]);
    setActivePage("genre"); // ✅ go back after saving
  };

  return (
    <div className="add-genre-container">
      <div className="header-section">
        <TopBar title="" />
      </div>
      <div className="heading22">
        <h2>Add a New Genre</h2>
      </div>
      <div className="add-genre-content">
        <form
          className="genre-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="form-group">
            <label>Genre Title</label>
            <input
              type="text"
              placeholder="e.g. Hip Hop / R&B"
              value={packName}
              onChange={(e) => setPackName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Comma-separated items</label>
            <input
              type="text"
              placeholder="e.g. Trap, 808s, Vocals"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="genre-form-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setActivePage("genre")} // ✅ go back on cancel
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddGenrePage;
