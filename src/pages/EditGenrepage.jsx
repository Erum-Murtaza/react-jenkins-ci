import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import "./EditGenrePage.css";

function EditGenrePage({ genreData, setGenreData, genreIndex, setActivePage }) {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const genre = genreData[genreIndex];
    if (genre) {
      setTitle(genre.title);
      setItems(genre.items);
    }
  }, [genreData, genreIndex]);

  const handleItemChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    setItems(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, ""]);
  };

  const handleSave = () => {
    const updatedGenre = {
      title: title.trim(),
      items: items.map((item) => item.trim()).filter(Boolean),
    };
    const updatedData = [...genreData];
    updatedData[genreIndex] = updatedGenre;
    setGenreData(updatedData);
    setActivePage("genre");
  };

  return (
    <div className="edit-genre-page">
      <TopBar title="" />
      <h2 className="heading11">Edit Genre</h2>

      <div className="edit-genre-form-container">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Subgenre Items</label>
        {items.map((item, index) => (
          <div className="item-row" key={index}>
            <input
              type="text"
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
            />
            <button className="remove-item" onClick={() => handleRemoveItem(index)}>
              Remove
            </button>
          </div>
        ))}

        <button className="add-item-btn" onClick={handleAddItem}>
          + Add Item
        </button>

        <div className="form-buttons">
          <button className="cancel-btn" onClick={() => setActivePage("genre")}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditGenrePage;
