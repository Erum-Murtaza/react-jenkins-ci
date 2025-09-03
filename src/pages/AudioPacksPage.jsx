import React, { useState, useEffect, useRef } from "react";
import AddAudioPackForm from "./AddAudioPackForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import TopBar from "../components/TopBar";
import "./AudioPacksPage.css";
import { FaSearch, FaSlidersH } from "react-icons/fa";

const AudioPacksPage = ({ audioPacks, setAudioPacks, setActivePage, setEditPackId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    genre: [],
    type: [],
    bpm: { min: "", max: "", exact: false },
    instruments: [],
    keys: [],
    scales: [],
  });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [packToDeleteId, setPackToDeleteId] = useState(null);
  const [openDropdown, setOpenDropdown] = useState({
    genre: false,
    type: false,
    bpm: false,
    instruments: false,
    keys: false,
  });
  const [activeKeyTab, setActiveKeyTab] = useState("flat");
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const audioRef = useRef(null);

  const genreOptions = ["Hip Hop", "Electronic", "Rock", "Pop", "R&B", "Jazz"];
  const typeOptions = ["Loops", "One-Shots"];
  const instrumentOptions = [
    { name: "Drums", count: 204 },
    { name: "Percussion", count: 54 },
    { name: "Claps", count: 28 },
    { name: "Hats", count: 25 },
    { name: "Snares", count: 25 },
    { name: "Synth", count: 14 },
  ];
  const keyOptions = {
    flatKeys: ["Db", "Eb", "Gb", "Ab", "Bb", "C", "D", "E"],
    sharpKeys: ["C#", "D#", "F#", "G#", "A#", "C", "D", "E"],
    scales: ["MAJOR", "MINOR"],
  };

  const toggleFilterDropdown = (category) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const filteredAudioPacks = audioPacks.filter((pack) => {
    const matchesSearch =
      !searchTerm ||
      pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pack.label.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = filters.genre.length === 0 || filters.genre.includes(pack.genre);

    const matchesType =
      filters.type.length === 0 ||
      (pack.audioFiles &&
        pack.audioFiles.some((file) => filters.type.includes(file.type)));

    let matchesBpm = true;
    if (filters.bpm.min || filters.bpm.max) {
      matchesBpm =
        pack.audioFiles &&
        pack.audioFiles.some((file) => {
          const fileBpm = parseInt(file.bpm);
          const minBpm = parseInt(filters.bpm.min);
          const maxBpm = parseInt(filters.bpm.max);

          if (filters.bpm.exact) {
            return fileBpm === minBpm;
          } else {
            return (
              (isNaN(minBpm) || fileBpm >= minBpm) &&
              (isNaN(maxBpm) || fileBpm <= maxBpm)
            );
          }
        });
    }

    const matchesInstruments =
      filters.instruments.length === 0 ||
      (pack.audioFiles &&
        pack.audioFiles.some((file) =>
          filters.instruments.some((instr) =>
            file.instruments && file.instruments.includes(instr)
          )
        ));

    const matchesKeys =
      filters.keys.length === 0 ||
      (pack.audioFiles &&
        pack.audioFiles.some((file) =>
          filters.keys.includes(file.key)
        ));

    const matchesScales = 
        filters.scales.length === 0 ||
        (pack.audioFiles &&
            pack.audioFiles.some((file) => 
                filters.scales.includes(file.keyMode)
            ));

    return (
      matchesSearch &&
      matchesGenre &&
      matchesType &&
      matchesBpm &&
      matchesInstruments &&
      matchesKeys &&
      matchesScales
    );
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      if (filterType === "genre") {
        const updatedGenres = prev.genre.includes(value) ? prev.genre.filter((t) => t !== value) : [...prev.genre, value];
        return { ...prev, genre: updatedGenres };
      } else if (filterType === "type") {
        const updatedTypes = prev.type.includes(value) ? prev.type.filter((t) => t !== value) : [...prev.type, value];
        return { ...prev, type: updatedTypes };
      } else if (filterType === "bpm") {
        return { ...prev, bpm: { ...prev.bpm, ...value } };
      } else if (filterType === "instruments") {
        const updatedInstruments = prev.instruments.includes(value) ? prev.instruments.filter((i) => i !== value) : [...prev.instruments, value];
        return { ...prev, instruments: updatedInstruments };
      } else if (filterType === "keys") {
        const updatedKeys = prev.keys.includes(value) ? prev.keys.filter((k) => k !== value) : [...prev.keys, value];
        return { ...prev, keys: updatedKeys };
      } else if (filterType === "scales") {
        const updatedScales = prev.scales.includes(value) ? prev.scales.filter((s) => s !== value) : [...prev.scales, value];
        return { ...prev, scales: updatedScales };
      }
      return prev;
    });
  };

  const handleBpmClear = () => {
    setFilters((prev) => ({
      ...prev,
      bpm: { min: "", max: "", exact: false },
    }));
  };

  const handleBpmSave = () => {
    setOpenDropdown((prev) => ({ ...prev, bpm: false }));
  };

  const showDeleteModalForPack = (id) => {
    setActiveDropdown(null);
    setPackToDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (packToDeleteId) {
      setAudioPacks(audioPacks.filter((pack) => pack.id !== packToDeleteId));
      setPackToDeleteId(null);
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setPackToDeleteId(null);
    setShowDeleteModal(false);
  };

  const handleEdit = (pack) => {
    setActiveDropdown(null);
    setEditPackId(pack.id);
    setActivePage("editAudioPack");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown !== null && !event.target.closest(".actions-dropdown")) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const togglePackDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleKeyClick = (key) => {
    handleFilterChange("keys", key);
  };

  const handleScaleClick = (scale) => {
    handleFilterChange("scales", scale);
  };
  
  const handlePlayPause = (pack) => {
    if (!pack.previewAudioUrl) {
        console.log("No preview audio URL available for this pack.");
        return;
    }

    if (playingAudioId === pack.id) {
        // Pause if the same audio is already playing
        if (audioRef.current) {
            audioRef.current.pause();
        }
        setPlayingAudioId(null);
    } else {
        // Stop any currently playing audio before starting a new one
        if (audioRef.current) {
            audioRef.current.pause();
        }

        const audio = new Audio(pack.previewAudioUrl);
        audio.play().then(() => {
            setPlayingAudioId(pack.id);
        }).catch(error => {
            console.error("Error playing audio:", error);
        });

        audio.onended = () => {
            setPlayingAudioId(null);
        };
        audioRef.current = audio;
    }
  };

  return (
    <div className="audio-packs-container">
      <TopBar />
      <h1 className="main-header">Audio Packs</h1>
      <div className="controls-bar">
        <div className="search-and-add">
          <div className="search-bar-container">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button className="filter-button" onClick={() => setShowFilters(!showFilters)}>
              <FaSlidersH className="filter-icon-in-bar" />
            </button>
          </div>
          <button className="add-pack-button" onClick={() => setActivePage("addAudioPack")}>
            ADD NEW AUDIO PACK
          </button>
        </div>
        {showFilters && (
          <div className="horizontal-filters-container">
            <div className="filter-categories">
              <div className="filter-category">
                <button className="filter-category-header" onClick={() => toggleFilterDropdown("genre")}>
                  <h4>Genre</h4>
                  <span className="dropdown-arrow">{openDropdown.genre ? "▲" : "▼"}</span>
                </button>
                {openDropdown.genre && (
                  <div className="filter-dropdown-content">
                    {genreOptions.map((genre) => (
                      <div key={genre} className="genre-option">
                        <input type="checkbox" id={`genre-${genre}`} checked={filters.genre.includes(genre)} onChange={() => handleFilterChange("genre", genre)} />
                        <label htmlFor={`genre-${genre}`}>{genre}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="filter-category">
                <button className="filter-category-header" onClick={() => toggleFilterDropdown("type")}>
                  <h4>Type</h4>
                  <span className="dropdown-arrow">{openDropdown.type ? "▲" : "▼"}</span>
                </button>
                {openDropdown.type && (
                  <div className="filter-dropdown-content">
                    {typeOptions.map((type) => (
                      <div key={type} className="type-option">
                        <input type="checkbox" id={`type-${type}`} checked={filters.type.includes(type)} onChange={() => handleFilterChange("type", type)} />
                        <label htmlFor={`type-${type}`}>{type}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="filter-category">
                <button className="filter-category-header" onClick={() => toggleFilterDropdown("bpm")}>
                  <h4>BPM</h4>
                  <span className="dropdown-arrow">{openDropdown.bpm ? "▲" : "▼"}</span>
                </button>
                {openDropdown.bpm && (
                  <div className="filter-dropdown-content">
                    <div className="bpm-radio-options">
                      <div className="bpm-radio-option">
                        <input type="radio" id="exact-bpm-radio" name="bpm-type" checked={filters.bpm.exact} onChange={() => handleFilterChange("bpm", { exact: true })} />
                        <label htmlFor="exact-bpm-radio">Exact</label>
                        {filters.bpm.exact && <input type="number" placeholder="BPM" value={filters.bpm.min} onChange={(e) => handleFilterChange("bpm", { min: e.target.value })} />}
                      </div>
                      <div className="bpm-radio-option">
                        <input type="radio" id="range-bpm-radio" name="bpm-type" checked={!filters.bpm.exact} onChange={() => handleFilterChange("bpm", { exact: false })} />
                        <label htmlFor="range-bpm-radio">Range</label>
                        {!filters.bpm.exact && (
                          <div className="bpm-range">
                            <input type="number" placeholder="Min" value={filters.bpm.min} onChange={(e) => handleFilterChange("bpm", { min: e.target.value })} />
                            <span>-</span>
                            <input type="number" placeholder="Max" value={filters.bpm.max} onChange={(e) => handleFilterChange("bpm", { max: e.target.value })} />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="bpm-filter-actions">
                      <button onClick={handleBpmClear} className="clear-bpm-button">
                        Clear
                      </button>
                      <button onClick={handleBpmSave} className="save-bpm-button">
                        SAVE
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="filter-category">
                <button className="filter-category-header" onClick={() => toggleFilterDropdown("instruments")}>
                  <h4>Instruments</h4>
                  <span className="dropdown-arrow">{openDropdown.instruments ? "▲" : "▼"}</span>
                </button>
                {openDropdown.instruments && (
                  <div className="filter-dropdown-content">
                    {instrumentOptions.map((instr) => (
                      <div key={instr.name} className="instrument-option">
                        <input type="checkbox" id={`instr-${instr.name}`} checked={filters.instruments.includes(instr.name)} onChange={() => handleFilterChange("instruments", instr.name)} />
                        <label htmlFor={`instr-${instr.name}`}>
                          {instr.name} <span>({instr.count})</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="filter-category">
                <button className="filter-category-header" onClick={() => toggleFilterDropdown("keys")}>
                  <h4>Keys</h4>
                  <span className="dropdown-arrow">{openDropdown.keys ? "▲" : "▼"}</span>
                </button>
                {openDropdown.keys && (
                  <div className="filter-dropdown-content">
                    <div className="key-tabs">
                      <button className={`key-tab ${activeKeyTab === 'flat' ? 'active' : ''}`} onClick={() => setActiveKeyTab('flat')}>
                        Flat Keys
                      </button>
                      <button className={`key-tab ${activeKeyTab === 'sharp' ? 'active' : ''}`} onClick={() => setActiveKeyTab('sharp')}>
                        Sharp Keys
                      </button>
                    </div>
                    <div className="key-grid">
                      {(activeKeyTab === 'flat' ? keyOptions.flatKeys : keyOptions.sharpKeys).map((key) => (
                        <div key={key} className={`key-button ${filters.keys.includes(key) ? 'selected' : ''}`} onClick={() => handleKeyClick(key)}>
                          {key}
                        </div>
                      ))}
                  </div>
                    <div className="scale-buttons">
                      {keyOptions.scales.map((scale) => (
                        <div key={scale} className={`scale-button ${filters.scales.includes(scale) ? 'selected' : ''}`} onClick={() => handleScaleClick(scale)}>
                          {scale}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <h2 className="pack-count">Audio Packs ({filteredAudioPacks.length})</h2>
      <div className="audio-packs-grid">
        {filteredAudioPacks.map((pack) => (
          <div key={pack.id} className="audio-pack-card">
              <div className="audio-pack-image-container">
                <img src={pack.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"} alt={pack.name} className="audio-pack-image" />
                <button
                  className="play-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayPause(pack);
                  }}
                >
                  {playingAudioId === pack.id ? <div className="pause-button-icon"></div> : <div className="play-button-icon"></div>}
                </button>
              </div>
            <div className="pack-info">
              <h3>{pack.name}</h3>
              <p>{pack.label}</p>
              <div className="pack-meta">
                <span>{pack.genre}</span>
                <span>{pack.bpm} BPM</span>
              </div>
            </div>
            <div className="actions-dropdown">
              <button
                className="dropdown-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePackDropdown(pack.id);
                }}
              >
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </button>
              {activeDropdown === pack.id && (
                <div className="dropdown-menu">
                  <button
                    className="dropdown-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(pack);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      showDeleteModalForPack(pack.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
          </div>
        </div>
        ))}
      </div>
      {showDeleteModal && (
        <DeleteConfirmationModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default AudioPacksPage;