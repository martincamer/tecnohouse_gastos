export const Search = ({ search, searcher, variable }) => {
  return (
    <div className="flex justify-between items-center bg-white max-md:text-sm border-[1px] border-slate-300 rounded-xl shadow py-2 px-3 w-[450px] placeholder:text-gray-500/90 outline-none max-md:w-[250px]">
      <input
        value={search}
        onChange={searcher}
        className="w-full placeholder:text-gray-500/90 outline-none"
        placeholder={`${variable}`}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
  );
};
