import imagePlaceholder from "../../images/edit-placeholder.png";
import * as dayjs from 'dayjs';


const Note = ({ uid, title, date, body, type }) => {
  return (
    <div className="border-b-[1px] border-b-slate-700 p-2 pt-3 hover:bg-slate-900 cursor-pointer">
      <div className="flex flex-row p-2 px-4">
        <img
          src={imagePlaceholder}
          alt=""
          className="rounded-full h-8 w-8 inline-block"
        />
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center ml-2">
            <div className="text-s truncate max-w-[500px]">{title}</div>
            <div className="px-2">·</div>
            <span className="text-xs font-bold text-slate-500">
              {dayjs(date).format("YYYY/MM/DD HH:mm:ss")}
            </span>

            <div className="rounded-full ml-auto text-center cursor-pointer h-7 w-7 p-1 fill-slate-200 hover:bg-slate-600 hover:fill-[#1d9bf0]">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="">
                <g>
                  <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                </g>
              </svg>
            </div>
          </div>
          <div className="mt-1 mb-2 px-2">{body}</div>
        </div>
      </div>
      {/* <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <img
            src={imagePlaceholder}
            alt=""
            className="rounded-full h-8 w-8 inline-block"
          />
          <div className="flex flex-row items-center justify-around ml-2 py-1">
            <div>abcdefghjklmnopqrstyuvwxyz</div>
            <div className="px-2">·</div>
            <span className="text-xs font-bold text-slate-500">
              03/02/1999 23:59:59
            </span>
          </div>
        </div>
        <div className="rounded-full text-center cursor-pointer h-7 w-7 p-1 fill-slate-200 hover:bg-slate-600 hover:fill-[#1d9bf0]">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="">
            <g>
              <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </g>
          </svg>
        </div>
      </div>
      <div className="my-2 px-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div> */}
    </div>
  );
};

export default Note;