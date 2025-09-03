import React, { useState, useRef } from "react";
import TopBar from "../components/TopBar";
import "./AddAudioPackForm.css";

const AddAudioPackForm = ({ onSave, onCancel, initialData, showHeader=true }) => {
  const [audioPackName, setAudioPackName] = useState(initialData?.name || "");
  const [genre, setGenre] = useState(initialData?.genre || "");
  const [coverPhotoFile, setCoverPhotoFile] = useState(null);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState(initialData?.imageUrl || "");
  const [previewAudioFile, setPreviewAudioFile] = useState(null);
  const [previewAudioFileName, setPreviewAudioFileName] = useState(initialData?.previewAudioFileName || "");
  const [sampleBPM, setSampleBPM] = useState(initialData?.bpm || "");
  const [description, setDescription] = useState(initialData?.description || "");

  const [audioFiles, setAudioFiles] = useState(
    initialData?.audioFiles || [
      {
        fileName: "",
        selectedFile: null,
        selectedFileDisplayName: "",
        type: "",
        bpm: "",
        bpmType: "Exact",
        bpmRange: { min: "", max: "" },
        instruments: [],
        key: "",
        keyMode: "",
        download: "",
      },
    ]
  );

  const [keyTab, setKeyTab] = useState("Flat Keys");
  const [openDropdown, setOpenDropdown] = useState(null);

  const coverPhotoInputRef = useRef(null);
  const previewAudioInputRef = useRef(null);
  const audioFileInputRefs = useRef([]);

  const instrumentOptions = [
    { name: "Drums", count: 204 },
    { name: "Percussion", count: 54 },
    { name: "Claps", count: 28 },
    { name: "Hats", count: 25 },
    { name: "Snares", count: 25 },
    { name: "Synth", count: 14 },
    { name: "Kicks", count: 16 },
  ];

  const flatKeys = ["Db", "Eb", "Gb", "Ab", "Bb", "C", "D", "E"];
  const sharpKeys = ["C", "C#", "D", "E", "F#", "G#", "A#"];

  const handleCoverPhotoSelect = (event) => {
    const file = event.target.files[0];
    setCoverPhotoFile(file);
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setCoverPhotoUrl(fileUrl);
    } else {
      setCoverPhotoUrl("");
    }
  };

  const handlePreviewAudioSelect = (event) => {
    const file = event.target.files[0];
    setPreviewAudioFile(file);
    setPreviewAudioFileName(file ? file.name : "");
  };

  const handleAudioFileChange = (index, field, value) => {
    const newAudioFiles = [...audioFiles];
    newAudioFiles[index][field] = value;
    setAudioFiles(newAudioFiles);
  };

  const handleDynamicFileSelect = (index, event) => {
    const file = event.target.files[0];
    const newAudioFiles = [...audioFiles];
    newAudioFiles[index].selectedFileDisplayName = file ? file.name : "";
    newAudioFiles[index].selectedFile = file;
    setAudioFiles(newAudioFiles);
  };

  const handleAddFile = () => {
    setAudioFiles([
      ...audioFiles,
      {
        fileName: "",
        selectedFile: null,
        selectedFileDisplayName: "",
        type: "",
        bpm: "",
        bpmType: "Exact",
        bpmRange: { min: "", max: "" },
        instruments: [],
        key: "",
        keyMode: "",
        download: "",
      },
    ]);
  };

  const handleRemoveFile = (index) => {
    const newAudioFiles = audioFiles.filter((_, i) => i !== index);
    setAudioFiles(newAudioFiles);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const renderCustomDropdown = (dropdownName, triggerLabel, content) => (
    <div className="custom-dropdown-wrapper">
      <div className={`custom-select-trigger ${openDropdown === dropdownName ? "active" : ""}`} onClick={() => toggleDropdown(dropdownName)}>
        <span>{triggerLabel}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="select-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {openDropdown === dropdownName && <div className="dropdown-content">{content}</div>}
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPackData = {
      name: audioPackName,
      label: genre,
      genre: genre,
      bpm: sampleBPM,
      description,
      coverPhotoFile: coverPhotoFile,
      previewAudioFile: previewAudioFile,
      audioFiles: audioFiles.map((file) => ({
        ...file,
        file: file.selectedFile,
      })),
    };

    onSave(newPackData);
  };

  return (
    <div className="container">
      <div>
        <TopBar/>
      </div>
      
      {/* Added heading container */}
      {showHeader &&(
      <div className="form-header-container">
        <h1 className="form-main-header">Audio Packs > Add New Audio Pack</h1>
      </div>
      )}
      <form className="form-section" onSubmit={handleSubmit}>
        <div className="form-row first-input-row">
          <div className="input-group">
            <label>Audio Pack Name</label>
            <input type="text" placeholder="Type here..." className="text-input" value={audioPackName} onChange={(e) => setAudioPackName(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Upload cover photo</label>
            <div className="input-with-button">
              <input type="text" placeholder="Choose file to upload" className="text-input file-display-input" readOnly value={coverPhotoFile ? coverPhotoFile.name : initialData?.imageUrl ? "Existing Image" : ""} />
              <button type="button" className="browse-button" onClick={() => coverPhotoInputRef.current.click()}>
                Browse Files
              </button>
              <input type="file" ref={coverPhotoInputRef} style={{ display: "none" }} onChange={handleCoverPhotoSelect} accept="image/*" />
            </div>
          </div>
        </div>

        <div className="form-row second-input-row">
          <div className="input-group">
            <label>Select Genre</label>
            <select className="select-input" value={genre} onChange={(e) => setGenre(e.target.value)} required>
              <option value="">Select</option>
              <option value="Hip Hop">Hip Hop</option>
              <option value="Electronic">Electronic</option>
              <option value="Rock">Rock</option>
              <option value="Pop">Pop</option>
            </select>
          </div>
          <div className="input-group">
            <label>Preview Audio</label>
            <div className="input-with-button">
              <input type="text" placeholder="Choose file to upload" className="text-input file-display-input" readOnly value={previewAudioFileName || (initialData?.audioUrl ? "Existing Audio" : "")} />
              <button type="button" className="browse-button" onClick={() => previewAudioInputRef.current.click()}>
                Browse Files
              </button>
              <input type="file" ref={previewAudioInputRef} style={{ display: "none" }} onChange={handlePreviewAudioSelect} accept="audio/*" />
            </div>
          </div>
          <div className="input-group">
            <label>Sample BPM</label>
            {renderCustomDropdown(
              `sample-bpm`,
              sampleBPM || "Select",
              <>
                <div className="bpm-options">
                  <label className="radio-option">
                    <input type="radio" name={`sample-bpm-type`} value="Exact" checked={typeof sampleBPM === "string" && !sampleBPM.includes("-")} onChange={() => setSampleBPM("")} />
                    <span className="radio-custom"></span>Exact
                    {typeof sampleBPM === "string" && !sampleBPM.includes("-") && <input type="number" placeholder="Enter BPM" className="bpm-input" value={sampleBPM} onChange={(e) => setSampleBPM(e.target.value)} />}
                  </label>
                  <label className="radio-option">
                    <input type="radio" name={`sample-bpm-type`} value="Range" checked={typeof sampleBPM === "string" && sampleBPM.includes("-")} onChange={() => setSampleBPM("-")} />
                    <span className="radio-custom"></span>Range
                    {typeof sampleBPM === "string" && sampleBPM.includes("-") && (
                      <div className="bpm-range-inputs">
                        <input type="number" placeholder="Min" className="bpm-range-input" value={sampleBPM.split("-")[0]} onChange={(e) => setSampleBPM(`${e.target.value}-${sampleBPM.split("-")[1] || ""}`)} />
                        <span>-</span>
                        <input type="number" placeholder="Max" className="bpm-range-input" value={sampleBPM.split("-")[1]} onChange={(e) => setSampleBPM(`${sampleBPM.split("-")[0] || ""}-${e.target.value}`)} />
                      </div>
                    )}
                  </label>
                </div>
                <div className="bpm-action-buttons">
                  <button
                    type="button"
                    className="clear-button"
                    onClick={() => {
                      setSampleBPM("");
                      setOpenDropdown(null);
                    }}
                  >
                    Clear
                  </button>
                  <button type="button" className="save-button-small" onClick={() => toggleDropdown(`sample-bpm`)}>
                    SAVE
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="form-row description-row">
          <div className="input-group description-group">
            <label>Description</label>
            <textarea placeholder="Type here..." rows="4" className="textarea-input" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>
        </div>

        <div className="audio-files-section">
          <div className="audio-file-header">
            <div>Audio File Name</div>
            <div>Select File</div>
            <div>Instruments</div>
            <div>BPM</div>
            <div>Key</div>
            <div>Download</div>
            <div>Type</div>
            <div></div>
          </div>

          {audioFiles.map((file, index) => (
            <div key={index} className="audio-file-row">
              <div className="audio-file-field">
                <input type="text" placeholder="Type here..." className="text-input" value={file.fileName} onChange={(e) => handleAudioFileChange(index, "fileName", e.target.value)} required />
              </div>

              <div className="audio-file-field">
                <div className="input-with-button">
                  <input type="text" placeholder="Select File" className="text-input file-display-input" readOnly value={file.selectedFileDisplayName || (file.file ? "Existing File" : "")} />
                  <button type="button" className="browse-button" onClick={() => audioFileInputRefs.current[index].click()}>
                    Browse Files
                  </button>
                  <input type="file" ref={(el) => (audioFileInputRefs.current[index] = el)} style={{ display: "none" }} onChange={(e) => handleDynamicFileSelect(index, e)} accept="audio/*, image/png, image/jpeg, image/jpg" />
                </div>
              </div>

              <div className="audio-file-field">
                {renderCustomDropdown(
                  `instruments-${index}`,
                  file.instruments.length > 0 ? file.instruments.join(", ") : "Select",
                  <>
                    {instrumentOptions.map((option) => (
                      <label key={option.name} className="checkbox-option">
                        <input
                          type="checkbox"
                          value={option.name}
                          checked={file.instruments.includes(option.name)}
                          onChange={(e) => {
                            let newInstruments;
                            if (e.target.checked) {
                              newInstruments = [...file.instruments, option.name];
                            } else {
                              newInstruments = file.instruments.filter((item) => item !== option.name);
                            }
                            handleAudioFileChange(index, "instruments", newInstruments);
                          }}
                        />
                        <span className="checkbox-custom"></span>
                        {option.name} <span className="instrument-count">{option.count}</span>
                      </label>
                    ))}
                  </>
                )}
              </div>

              <div className="audio-file-field">
                {renderCustomDropdown(
                  `bpm-${index}`,
                  file.bpmType === "Exact" ? file.bpm || "Select" : file.bpmRange.min || file.bpmRange.max ? `${file.bpmRange.min || ""} - ${file.bpmRange.max || ""}` : "Select",
                  <>
                    <div className="bpm-options">
                      <label className="radio-option">
                        <input type="radio" name={`bpm-type-${index}`} value="Exact" checked={file.bpmType === "Exact"} onChange={() => handleAudioFileChange(index, "bpmType", "Exact")} />
                        <span className="radio-custom"></span>Exact
                        {file.bpmType === "Exact" && <input type="number" placeholder="Enter BPM" className="bpm-input" value={file.bpm} onChange={(e) => handleAudioFileChange(index, "bpm", e.target.value)} />}
                      </label>
                      <label className="radio-option">
                        <input type="radio" name={`bpm-type-${index}`} value="Range" checked={file.bpmType === "Range"} onChange={() => handleAudioFileChange(index, "bpmType", "Range")} />
                        <span className="radio-custom"></span>Range
                        {file.bpmType === "Range" && (
                          <div className="bpm-range-inputs">
                            <input
                              type="number"
                              placeholder="Min"
                              className="bpm-range-input"
                              value={file.bpmRange.min}
                              onChange={(e) =>
                                handleAudioFileChange(index, "bpmRange", {
                                  ...file.bpmRange,
                                  min: e.target.value,
                                })
                              }
                            />
                            <span>-</span>
                            <input
                              type="number"
                              placeholder="Max"
                              className="bpm-range-input"
                              value={file.bpmRange.max}
                              onChange={(e) =>
                                handleAudioFileChange(index, "bpmRange", {
                                  ...file.bpmRange,
                                  max: e.target.value,
                                })
                              }
                            />
                          </div>
                        )}
                      </label>
                    </div>
                    <div className="bpm-action-buttons">
                      <button
                        type="button"
                        className="clear-button"
                        onClick={() => {
                          handleAudioFileChange(index, "bpm", "");
                          handleAudioFileChange(index, "bpmRange", {
                            min: "",
                            max: "",
                          });
                          handleAudioFileChange(index, "bpmType", "Exact");
                        }}
                      >
                        Clear
                      </button>
                      <button type="button" className="save-button-small" onClick={() => toggleDropdown(`bpm-${index}`)}>
                        SAVE
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="audio-file-field">
                {renderCustomDropdown(
                  `key-${index}`,
                  file.key ? `${file.key} ${file.keyMode || ""}` : "Select",
                  <>
                    <div className="key-tabs">
                      <button type="button" className={`key-tab-button ${keyTab === "Flat Keys" ? "active" : ""}`} onClick={() => setKeyTab("Flat Keys")}>
                        Flat Keys
                      </button>
                      <button type="button" className={`key-tab-button ${keyTab === "Sharp Keys" ? "active" : ""}`} onClick={() => setKeyTab("Sharp Keys")}>
                        Sharp Keys
                      </button>
                    </div>
                    <div className="key-buttons-grid">
                      {keyTab === "Flat Keys" &&
                        flatKeys.map((key) => (
                          <button type="button" key={key} className={`key-button ${file.key === key ? "selected" : ""}`} onClick={() => handleAudioFileChange(index, "key", key)}>
                            {key.replace("b", "♭")}
                          </button>
                        ))}
                      {keyTab === "Sharp Keys" &&
                        sharpKeys.map((key) => (
                          <button type="button" key={key} className={`key-button ${file.key === key ? "selected" : ""}`} onClick={() => handleAudioFileChange(index, "key", key)}>
                            {key.replace("#", "♯")}
                          </button>
                        ))}
                    </div>
                    <div className="key-modes">
                      <button type="button" className={`key-mode-button ${file.keyMode === "MAJOR" ? "active" : ""}`} onClick={() => handleAudioFileChange(index, "keyMode", "MAJOR")}>
                        MAJOR
                      </button>
                      <button type="button" className={`key-mode-button ${file.keyMode === "MINOR" ? "active" : ""}`} onClick={() => handleAudioFileChange(index, "keyMode", "MINOR")}>
                        MINOR
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="audio-file-field">
                {renderCustomDropdown(
                  `download-${index}`,
                  file.download || "Select",
                  <>
                    <label className="radio-option">
                      <input type="radio" name={`download-type-${index}`} value="Free" checked={file.download === "Free"} onChange={() => handleAudioFileChange(index, "download", "Free")} />
                      <span className="radio-custom"></span>Free
                    </label>
                    <label className="radio-option">
                      <input type="radio" name={`download-type-${index}`} value="Paid" checked={file.download === "Paid"} onChange={() => handleAudioFileChange(index, "download", "Paid")} />
                      <span className="radio-custom"></span>Paid
                    </label>
                  </>
                )}
              </div>

              <div className="audio-file-field">
                {renderCustomDropdown(
                  `type-${index}`,
                  file.type || "Select",
                  <>
                    <label className="radio-option">
                      <input type="radio" name={`type-radio-${index}`} value="Loops" checked={file.type === "Loops"} onChange={() => handleAudioFileChange(index, "type", "Loops")} />
                      <span className="radio-custom"></span>Loops
                    </label>
                    <label className="radio-option">
                      <input type="radio" name={`type-radio-${index}`} value="One-Shots" checked={file.type === "One-Shots"} onChange={() => handleAudioFileChange(index, "type", "One-Shots")} />
                      <span className="radio-custom"></span>One-Shots
                    </label>
                  </>
                )}
              </div>

              <div className="audio-file-field">
                <button type="button" onClick={() => handleRemoveFile(index)} className="remove-button">
                  &times;
                </button>
              </div>
            </div>
          ))}

          <button type="button" onClick={handleAddFile} className="add-file-button">
            ADD FILE
          </button>
        </div>

        <div className="save-button-container">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAudioPackForm;