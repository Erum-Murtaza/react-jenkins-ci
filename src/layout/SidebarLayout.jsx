import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import GenrePage from "../pages/GenrePage";
import AddGenrePage from "../pages/AddGenrePage";
import EditGenrePage from "../pages/EditGenrepage";
import AudioPacksPage from "../pages/AudioPacksPage";
import AddAudioPackForm from "../pages/AddAudioPackForm";
import EditAudioPackPage from "../pages/EditAudioPackPage";

function SidebarLayout() {
  const [genreData, setGenreData] = useState([
    { title: "Hip Hop / R&B", items: ["Hip Hop", "Trap", "R&B", "Soul", "Reggaetion", "Dancehall", "Moombahton", "Future Bass", "Glitch Hop"] },
    { title: "HOUSE/TECHNO", items: ["Techno", "House", "Tech House", "Deep House", "Disco", "Electro", "Minimal Techno", "Hard Techno", "Uk Garage", "Progressive House"] },
    { title: "POP/ EDM", items: ["Pop", "EDM", "Trance", "Psytrance", "Future House", "Fidget House", "Tropical House"] },
    { title: "ELECTRONIC", items: ["Downtempo", "Ambient", "Synthwave", "IDM", "Dancehall", "Moombahton", "Future Bass", "Glitch Hop"] },
    { title: "CINEMATIC/FX", items: ["Techno", "House", "Tech House", "Deep House", "Disco", "Electro", "Minimal Techno", "Hard Techno", "UK Garage", "Progressive House"] },
    { title: "LIVE SOUNDS", items: ["Downtempo", "Ambient", "Synthwave", "IDM", "Dancehall", "Moombahton", "Future Bass"] },
  ]);
  const [editIndex, setEditIndex] = useState(null);

  const [audioPacks, setAudioPacks] = useState([
    {
      id: 1,
      name: "Serum Essentials",
      label: "Xfer Records",
      genre: "Electronic",
      bpm: "128",
      description: "A versatile pack of loops and one-shots for the Serum synthesizer, perfect for modern electronic productions.",
      imageUrl: "https://images.unsplash.com/photo-1752500997837-d50181837e6a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      previewAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      audioFiles: [
        {
          fileName: "Synth Loop 1",
          selectedFileDisplayName: "loop1.wav",
          type: "Loops",
          bpm: "128",
          bpmType: "Exact",
          bpmRange: { min: "", max: "" },
          instruments: ["Synth", "Drums"],
          key: "C",
          keyMode: "MAJOR",
          download: "Paid",
        },
      ],
    },
    {
      id: 2,
      name: "Serum Essentials",
      label: "Xfer Records",
      genre: "Hip Hop",
      bpm: "90",
      description: "A hard-hitting collection of drum one-shots for classic and modern hip-hop beats.",
      imageUrl: "https://images.unsplash.com/photo-1752612561153-c853b9dc7b8e?q=80&w=1554&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      previewAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      audioFiles: [
        {
          fileName: "Drum Kit",
          selectedFileDisplayName: "drumkit.wav",
          type: "One-Shots",
          bpm: "90",
          bpmType: "Exact",
          bpmRange: { min: "", max: "" },
          instruments: ["Drums", "Claps", "Hats"],
          key: "D#",
          keyMode: "MINOR",
          download: "Free",
        },
      ],
    },
    {
      id: 3,
      name: "Serum Essentials",
      label: "Xfer Records",
      genre: "Rock",
      bpm: "140",
      description: "Powerful drum loops and fills to build a solid rock foundation for your tracks.",
      imageUrl: "https://images.unsplash.com/photo-1752892919053-ff37c4758960?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      previewAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      audioFiles: [
        {
          fileName: "Rock Drum Loop",
          selectedFileDisplayName: "rock_drums.wav",
          type: "Loops",
          bpm: "140",
          bpmType: "Exact",
          bpmRange: { min: "", max: "" },
          instruments: ["Drums", "Snares"],
          key: "E",
          keyMode: "MAJOR",
          download: "Paid",
        },
      ],
    },
    {
      id: 4,
      name: "Serum Essentials",
      label: "Xfer Records",
      genre: "Pop",
      bpm: "120",
      description: "Catchy synth melodies and bass lines to give your pop productions a polished sound.",
      imageUrl: "https://images.unsplash.com/photo-1752654977019-8578b2905411?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      previewAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      audioFiles: [
        {
          fileName: "Synth Lead",
          selectedFileDisplayName: "pop_synth.wav",
          type: "Loops",
          bpm: "120",
          bpmType: "Exact",
          bpmRange: { min: "", max: "" },
          instruments: ["Synth"],
          key: "F#",
          keyMode: "MINOR",
          download: "Free",
        },
      ],
    },
    {
      id: 5,
      name: "Serum Essentials",
      label: "Xfer Records",
      genre: "Electronic",
      bpm: "128",
      description: "A fresh set of synth one-shots for building custom melodies and chords in your tracks.",
      imageUrl: "https://images.unsplash.com/photo-1752500997837-d50181837e6a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      previewAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      audioFiles: [
        {
          fileName: "Synth One-Shot",
          selectedFileDisplayName: "synth_one.wav",
          type: "One-Shots",
          bpm: "128",
          bpmType: "Exact",
          bpmRange: { min: "", max: "" },
          instruments: ["Synth"],
          key: "F#",
          keyMode: "MAJOR",
          download: "Paid",
        },
      ],
    },
    {
      id: 6,
      name: "Serum Essentials",
      label: "Xfer Records",
      genre: "Pop",
      bpm: "120",
      description: "A bundle of synth and drum loops to create a vibrant, radio-ready pop track.",
      imageUrl: "https://images.unsplash.com/photo-1752654977019-8578b2905411?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      previewAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      audioFiles: [
        {
          fileName: "Synth & Drum Loop",
          selectedFileDisplayName: "synth_drum.wav",
          type: "Loops",
          bpm: "120",
          bpmType: "Exact",
          bpmRange: { min: "", max: "" },
          instruments: ["Synth", "Drums"],
          key: "E",
          keyMode: "MINOR",
          download: "Free",
        },
      ],
    },
    {
      id: 7,
      name: "Serum Essentials",
      label: "Xfer Records",
      genre: "Pop",
      bpm: "115",
      description: "Melodic vocal chops, synth loops, and percussion elements for dynamic pop beats.",
      imageUrl: "https://images.unsplash.com/photo-1743328008236-894ce463461e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDd8eEh4WVRNSExnT2N8fGVufDB8fHx8fA%3D%3D",
      previewAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
      audioFiles: [
        {
          fileName: "Vocal Loop",
          selectedFileDisplayName: "vocal_loop.wav",
          type: "Loops",
          bpm: "115",
          bpmType: "Exact",
          bpmRange: { min: "", max: "" },
          instruments: ["Vocals", "Synth", "Percussion"],
          key: "F",
          keyMode: "MAJOR",
          download: "Paid",
        },
      ],
    },
    {
      id: 8,
      name: "Serum Essentials",
      label: "Xfer Records",
      genre: "Electronic",
      bpm: "90",
      description: "Dark and moody bass lines and arps for creating atmospheric electronic soundscapes.",
      imageUrl: "https://images.unsplash.com/photo-1754018422199-e39850170297?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8eEh4WVRNSExnT2N8fGVufDB8fHx8fA%3D%3D",
      previewAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
      audioFiles: [
        {
          fileName: "Synth & Bass Loop",
          selectedFileDisplayName: "bass_loop.wav",
          type: "Loops",
          bpm: "90",
          bpmType: "Exact",
          bpmRange: { min: "", max: "" },
          instruments: ["Synth", "Drums", "Bass"],
          key: "C",
          keyMode: "MINOR",
          download: "Paid",
        },
      ],
    },
    {
      id: 9,
      name: "Serum Essentials",
      label: "Xfer Records",
      genre: "Pop",
      bpm: "145",
      description: "Fast-paced synth patterns and MIDI files for building energetic pop and dance tracks.",
      imageUrl: "https://images.unsplash.com/photo-1472552944129-b035e9ea3744?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmlnaHQlMjBza3l8ZW58MHx8MHx8fDA%3D",
      previewAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      audioFiles: [
        {
          fileName: "Synth Arp",
          selectedFileDisplayName: "synth_arp.mid",
          type: "MIDI",
          bpm: "145",
          bpmType: "Exact",
          bpmRange: { min: "", max: "" },
          instruments: ["Synth", "SFX", "Drums"],
          key: "G",
          keyMode: "MINOR",
          download: "Free",
        },
      ],
    },
    {
      id: 10,
      name: "Serum Essentials",
      label: "Xfer Records",
      genre: "Electronic",
      bpm: "138",
      description: "Uplifting synth arps and lush pads to create cinematic electronic soundscapes.",
      imageUrl: "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D",
      previewAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
      audioFiles: [
        {
          fileName: "Arp & Pad Loop",
          selectedFileDisplayName: "arp_pad.wav",
          type: "Loops",
          bpm: "138",
          bpmType: "Exact",
          bpmRange: { min: "", max: "" },
          instruments: ["Synth", "Arps", "Pads"],
          key: "A",
          keyMode: "MAJOR",
          download: "Paid",
        },
      ],
    },
    {
      id: 11,
      name: "Serum Essentials",
      label: "Xfer Records",
      genre: "Pop",
      bpm: "125",
      description: "A collection of clean, punchy drum and percussion one-shots for pop beats.",
      imageUrl: "https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D",
      previewAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
      audioFiles: [
        {
          fileName: "Percussion Loops",
          selectedFileDisplayName: "perc_loop.wav",
          type: "Loops",
          bpm: "125",
          bpmType: "Exact",
          bpmRange: { min: "", max: "" },
          instruments: ["Drums", "Percussion", "Claps"],
          key: "C",
          keyMode: "MAJOR",
          download: "Free",
        },
      ],
    },
    {
      id: 12,
      name: "Serum Essentials",
      label: "Xfer Records",
      genre: "Hip Hop",
      bpm: "85",
      description: "Smooth key melodies, deep bass lines, and classic hip-hop drum loops for chilled-out vibes.",
      imageUrl: "https://plus.unsplash.com/premium_photo-1674583546207-3a7a9c98baa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aWNlbGFuZHxlbnwwfHwwfHx8MA%3D%3D",
      previewAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
      audioFiles: [
        {
          fileName: "Keys & Bass Loop",
          selectedFileDisplayName: "keys_bass.wav",
          type: "Loops",
          bpm: "85",
          bpmType: "Exact",
          bpmRange: { min: "", max: "" },
          instruments: ["Keys", "Bass", "Drums"],
          key: "D",
          keyMode: "MINOR",
          download: "Free",
        },
      ],
    },
    {
      id: 13,
      name: "Serum Essentials",
      label: "Xfer Records",
      genre: "R&B",
      bpm: "78",
      description: "Soulful electric piano loops and bass grooves for creating smooth R&B instrumentals.",
      imageUrl: "https://images.unsplash.com/photo-1531019136844-d1bdacc942b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGljZWxhbmR8ZW58MHx8MHx8fDA%3D",
      previewAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
      audioFiles: [
        {
          fileName: "Electric Piano Loop",
          selectedFileDisplayName: "epiano_loop.wav",
          type: "Loops",
          bpm: "78",
          bpmType: "Exact",
          bpmRange: { min: "", max: "" },
          instruments: ["Electric Piano", "Bass", "Vocals"],
          key: "Bb",
          keyMode: "MINOR",
          download: "Paid",
        },
      ],
    },
    {
      id: 14,
      name: "Serum Essentials",
      label: "Xfer Records",
      genre: "Hip Hop",
      bpm: "140",
      description: "High-energy trap drums, 808s, and hi-hats to lay down a solid foundation for trap beats.",
      imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVldGluZ3xlbnwwfHwwfHx8MA%3D%3D",
      previewAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
      audioFiles: [
        {
          fileName: "Trap Drums",
          selectedFileDisplayName: "trap_drums.wav",
          type: "Loops",
          bpm: "140",
          bpmType: "Exact",
          bpmRange: { min: "", max: "" },
          instruments: ["Drums", "808", "Hi-Hats"],
          key: "G#",
          keyMode: "MINOR",
          download: "Free",
        },
      ],
    },
  ]);

  const [nextAudioPackId, setNextAudioPackId] = useState(15);
  const [editPackId, setEditPackId] = useState(null);
  const [activePage, setActivePage] = useState("genre");

  const handleAddAudioPack = (newPackData) => {
    const newPackWithId = {
      ...newPackData,
      id: nextAudioPackId,
      imageUrl: newPackData.coverPhotoFile ? URL.createObjectURL(newPackData.coverPhotoFile) : newPackData.imageUrl,
      // CORRECTED: Use previewAudioUrl here
      previewAudioUrl: newPackData.previewAudioFile ? URL.createObjectURL(newPackData.previewAudioFile) : newPackData.previewAudioUrl,
    };
    setAudioPacks([...audioPacks, newPackWithId]);
    setNextAudioPackId(nextAudioPackId + 1);
    setActivePage("audiopacks");
  };

  const handleEditAudioPack = (updatedPack) => {
    setAudioPacks((prevPacks) => {
      return prevPacks.map((pack) => {
        if (pack.id === updatedPack.id) {
          const newImageUrl = updatedPack.coverPhotoFile ? URL.createObjectURL(updatedPack.coverPhotoFile) : pack.imageUrl;
          const newAudioUrl = updatedPack.previewAudioFile ? URL.createObjectURL(updatedPack.previewAudioFile) : pack.previewAudioUrl;
          return {
            ...updatedPack,
            imageUrl: newImageUrl,
            // CORRECTED: Use previewAudioUrl here
            previewAudioUrl: newAudioUrl,
          };
        }
        return pack;
      });
    });
    setActivePage("audiopacks");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div style={{ backgroundColor: "white", width: "300px" }}>
        <Sidebar setActivePage={setActivePage} />
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "0px",
          backgroundColor: "#f8f4ec",
        }}
      >
        {activePage === "genre" && <GenrePage genreData={genreData} setGenreData={setGenreData} setActivePage={setActivePage} setEditIndex={setEditIndex} />}
        {activePage === "addGenre" && <AddGenrePage genreData={genreData} setGenreData={setGenreData} setActivePage={setActivePage} />}
        {activePage === "editGenre" && <EditGenrePage genreData={genreData} setGenreData={setGenreData} genreIndex={editIndex} setActivePage={setActivePage} />}
        {activePage === "audiopacks" && <AudioPacksPage audioPacks={audioPacks} setAudioPacks={setAudioPacks} setActivePage={setActivePage} setEditPackId={setEditPackId} />}
        {activePage === "addAudioPack" && <AddAudioPackForm onSave={handleAddAudioPack} onCancel={() => setActivePage("audiopacks")} />}
        {activePage === "editAudioPack" && <EditAudioPackPage audioPacks={audioPacks} onSave={handleEditAudioPack} id={editPackId} onCancel={() => setActivePage("audiopacks")} />}
      </div>
    </div>
  );
}

export default SidebarLayout;
