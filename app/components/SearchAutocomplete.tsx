import React, { useCallback, useState } from "react";
import { ReactTags } from "react-tag-autocomplete";

function debounce(fn, delay = 100) {
  let timeoutID;

  return function (...args) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn(...args), delay);
  };
}

async function fetchData(value) {
  try {
    const query = encodeURIComponent(value);
    const response = await fetch(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1&api_key=46a294decd2cace870667ba55dff0d0f`
    );

    if (response.ok) {
      const data = await response.json();
      return data.results
        .filter((item) => item.known_for_department === "Acting")
        .map((item) => ({
          value: item.id,
          label: item.name,
        }));
    } else {
      throw Error(`The API returned a ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function SearchAutocomplete({ type }: { type: string }) {
  const [isBusy, setIsBusy] = useState(false);
  const [selected, setSelected] = useState([
    { value: 880, label: "Ben Affleck" },
  ]);
  const [suggestions, setSuggestions] = useState([]);
  console.log(selected);

  const onAdd = useCallback(
    (newTag) => {
      setSelected([...selected, newTag]);
      setSuggestions([]);
    },
    [selected]
  );

  const onDelete = useCallback(
    (index) => {
      setSelected(selected.filter((_, i) => i !== index));
    },
    [selected]
  );

  const onInput = useCallback(
    debounce(async (value) => {
      if (isBusy) return;

      setIsBusy(true);

      try {
        const suggestions = await fetchData(value);
        setSuggestions(suggestions);
      } catch (error) {
        console.error(error);
      } finally {
        setIsBusy(false);
      }
    }),
    [isBusy]
  );

  const noOptionsText =
    isBusy && !suggestions.length ? "Loading..." : "No people found";

  return (
    <>
      <ReactTags
        ariaDescribedBy="async-suggestions-description"
        id="async-suggestions-demo"
        labelText="Select characters"
        noOptionsText={noOptionsText}
        onAdd={onAdd}
        onDelete={onDelete}
        onInput={onInput}
        placeholderText="Start typing actor names..."
        selected={selected}
        suggestions={suggestions}
      />
    </>
  );
}
