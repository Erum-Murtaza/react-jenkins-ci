import React from "react";
import TopBar from "../components/TopBar";
import GenreCard from "../components/GenreCard";
import "./GenrePage.css";

function GenrePage({ genreData, setActivePage, setEditIndex }) {
  const handleEditGenre = (index) => {
    setEditIndex(index);
    setActivePage("editGenre");
  };

  return (
    <div className="genre-page">
      <TopBar title="" />
      <div className="genre-header-container">
        <h2 className="genre-heading">Genres</h2>
        <button
          onClick={() => setActivePage("addGenre")}
          className="add-genre-btn"
        >
          Add New Genre
        </button>
      </div>

      <div className="genre-grid">
        {genreData.map((genre, index) => (
          <GenreCard
            key={index}
            title={genre.title}
            items={genre.items}
            onEdit={() => handleEditGenre(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default GenrePage;
