import axios from "axios";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../Loading";
import Note from "./Note";

const NoteList = ({ search, searchList = false }) => {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    axios
      .get("/api/notes", {
        params: {
          search: search,
        },
      })
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [search]);

  if (!notes) return <Loading />;

  return (
    <div
      className={classNames("inline-block w-full overflow-y-auto note-list", {
        "h-[93.6vh]": !searchList,
        "h-[86.81vh]": searchList,
      })}
    >
      {notes.length === 0 ? (
        <div className="mt-4 text-center text-white">
          No notes found...
        </div>
      ) : (
        notes.map((note, index) => (
          <Note
            uid={note.uid}
            title={note.title}
            body={note.body}
            date={note.created_at}
            type={1}
            key={note.uid}
          />
        ))
      )}
    </div>
  );
};

export default NoteList;
