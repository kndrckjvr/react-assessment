import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Note from "./Note";

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    axios({
      method: "get",
      url: "/api/notes",
      data: {
        total: 10,
      },
    })
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="inline-block h-[94vh] w-full overflow-y-auto note-list">
      {notes.map((note, index) => (
        <Note
          uid={note.uid}
          title={note.title}
          body={note.body}
          date={note.created_at}
          type={1}
          key={note.uid}
        />
      ))}
    </div>
  );
};

export default NoteList;
