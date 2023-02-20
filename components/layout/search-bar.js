import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import { useSelector } from "react-redux";
import Link from "next/link";

import { FilmIcon, TvIcon, XMarkIcon } from "@heroicons/react/20/solid";

export default function SearchBar({ onClose }) {
  const contentData = useSelector((state) => state.content.contents);
  const { movies, tvShows } = contentData;

  let contentList = [];

  movies.trending.map((movie) =>
    contentList.push({ title: movie.title, type: "movie", id: movie.id })
  );
  movies.topRated.map((movie) => {
    contentList.concat({ title: movie.title, type: "movie", id: movie.id });
  });
  tvShows.trending.map((tvShow) =>
    contentList.push({ title: tvShow.name, type: "tv", id: tvShow.id })
  );
  tvShows.topRated.map((tvShow) => {
    contentList.concat({ title: tvShow.name, type: "tv", id: tvShow.id });
  });
  contentList.sort((a, b) => a.title.localeCompare(b.title));

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: contentList,
    getOptionLabel: (option) => option.title,
    isOptionEqualToValue: (option, value) => option.id === value.id,
  });

  const closeHandler = () => {
    onClose();
  };

  return (
    <div className="relative bg-gray-50 text-gray-900 dark:text-white dark:bg-gray-700 ">
      <div className="sticky top-0" {...getRootProps()}>
        <input
          type="search"
          className="block w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:placeholder-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search content..."
          {...getInputProps()}
        />
        <button
          type="button"
          onClick={closeHandler}
          className="text-white absolute sm:hidden right-3 top-3 bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>
      {groupedOptions.length > 0 ? (
        <div {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <Link
              key={option.id}
              href={`/content/${option.type}/${option.id}`}
              onClick={closeHandler}
            >
              <li
                className="flex flex-row hover:bg-slate-100 dark:hover:bg-slate-600 list-none p-2 justify-between"
                {...getOptionProps({ option, index })}
              >
                <h3>{option.title}</h3>
                {option.type === "movie" ? (
                  <FilmIcon className="h-6" />
                ) : (
                  <TvIcon className="h-6" />
                )}
              </li>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );

  //   return (
  //     <Autocomplete
  //       freeSolo
  //       id="free-solo-2-demo"
  //       disableClearable
  //       options={contentList.map((option) => option.title)}
  //       renderInput={(params) => (
  //         <TextField
  //           {...params}
  //           label="Search contents..."
  //           onClick={() => {
  //             console.log("Clicked");
  //           }}
  //           size="small"
  //           InputProps={{
  //             ...params.InputProps,
  //             type: "search",
  //           }}
  //         />
  //       )}
  //     />
  //   );
}
