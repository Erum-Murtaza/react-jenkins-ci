import React, { useState, useEffect } from "react";
import AddAudioPackForm from "./AddAudioPackForm";

const EditAudioPackPage = ({ audioPacks, onSave, onCancel, id }) => {
  const [packToEdit, setPackToEdit] = useState(null);

  useEffect(() => {
    if (id) {
      const pack = audioPacks.find((p) => p.id === id);
      if (pack) {
        // Correct the audio URL key for the form
        const correctedPack = {
          ...pack,
          previewAudioUrl: pack.previewAudioUrl || pack.audioUrl,
        };
        setPackToEdit(correctedPack);
      }
    } else {
      const packName = new URLSearchParams(window.location.search).get("name");
      const pack = audioPacks.find((p) => p.name === packName);
      if (pack) {
        // Correct the audio URL key for the form
        const correctedPack = {
          ...pack,
          id: `pack-${Date.now()}`,
          previewAudioUrl: pack.previewAudioUrl || pack.audioUrl,
        };
        setPackToEdit(correctedPack);
      }
    }
  }, [id, audioPacks]);

  const handleEditSave = (updatedPack) => {
    onSave({ ...updatedPack, id: packToEdit.id });
  };

  if (!packToEdit) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-audio-pack-page">
      <AddAudioPackForm
        onSave={handleEditSave}
        onCancel={onCancel}
        initialData={packToEdit}
        showHeader={false}
      />
    </div>
  );
};

export default EditAudioPackPage;