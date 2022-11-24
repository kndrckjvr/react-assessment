import axios from "axios";
import classNames from "classnames";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../app/features/note/noteSlice";
import Loading from "../Loading";
import Note from "./Note";

const NoteList = ({ search, searchList = false }) => {
  const dispatch = useDispatch();
  const { noteItems, isLoading } = useSelector((state) => state.note);

  useEffect(() => {
    dispatch(getNotes(search));
  }, [search, dispatch]);

  if (isLoading) return <Loading />;

  return (
    <div
      className={classNames("inline-block w-full overflow-y-auto note-list", {
        "h-[93.6vh]": !searchList,
        "h-[86.81vh]": searchList,
      })}
    >
      {noteItems.length === 0 ? (
        <div className="mt-4 text-center text-white">No notes found...</div>
      ) : (
        noteItems.map((note, index) => (
          <Note {...note} type={1} key={note.uid} />
        ))
      )}
    </div>
  );
};

export default NoteList;
