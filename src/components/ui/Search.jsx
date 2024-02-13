export const Search = ({ search, searcher, variable }) => {
  return (
    <div>
      <input
        value={search}
        onChange={searcher}
        className="bg-white max-md:text-sm border-[1px] border-gray-300 rounded-md shadow-black/20 shadow-md py-2 px-3 w-[450px] placeholder:text-gray-500/90 outline-none"
        placeholder={`${variable}`}
      />
    </div>
  );
};
