"use client";

import React, { useCallback, useState } from "react";
import { ReactTags } from "react-tag-autocomplete";
import { Tabs, Tab, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

function debounce(
  fn: { (value: any): Promise<void>; (arg0: any): void },
  delay = 100
) {
  let timeoutID: string | number | NodeJS.Timeout | undefined;

  return function (...args: any) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn(...args), delay);
  };
}

async function fetchData(
  value: string | number | boolean,
  departmentAbbreviation: string,
  personOrTV: string
) {
  console.log("---fetchData", value, departmentAbbreviation, personOrTV);
  try {
    const query = encodeURIComponent(value);
    const response = await fetch(
      `https://api.themoviedb.org/3/search/${personOrTV}?query=${query}&include_adult=false&language=en-US&page=1&api_key=46a294decd2cace870667ba55dff0d0f`
    );

    if (response.ok) {
      const data = await response.json();
      const department =
        departmentAbbreviation === "A" ? "Acting" : "Directing";
      if (personOrTV === "person") {
        return data.results
          .filter(
            (item: { known_for_department: string }) =>
              item.known_for_department === department
          )
          .map((item: { id: any; name: any }) => ({
            value: `${departmentAbbreviation}_${item.id}`,
            label: item.name,
          }));
      }
      return data.results.map((item: { id: any; name: any }) => ({
        value: `${departmentAbbreviation}_${item.id}`,
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

export default function SearchAutocomplete() {
  const [isBusy, setIsBusy] = useState(false);
  const [type, setType] = useState("A");
  const [personOrTV, setPersonOrTV] = useState("person");
  const [selected, setSelected] = useState([
    { value: "A_1245", label: "Scarlett Johansson" },
    { value: "A_5292", label: "Denzel Washington" },
    { value: "A_6193", label: "Leonardo DiCaprio" },
    { value: "D_1245", label: "Quentin Tarantino" },
    { value: "T_1245", label: "Lupin" },
    { value: "T_1244", label: "Lupin2" },
    { value: "T_1246", label: "Lupin3" },
    { value: "T_124834", label: "Heartstopper" },
  ]);
  const [suggestions, setSuggestions] = useState([]);

  const router = useRouter();

  // function to save selections and redirect to /sign-up
  const handleSaveSelections = () => {
    console.log("Saving selections...");
    //redirect to /sign-up
    router.push("/notifications");
  };

  const onAdd = useCallback(
    (newTag: any) => {
      setSelected([...selected, newTag]);
      setSuggestions([]);
    },
    [selected]
  );

  const onDelete = useCallback(
    (index: number) => {
      const itemsToDeleteFrom = selected.filter(
        (item) => item.value.split("_")[0] === type
      );
      const itemsNotToDeleteFrom = selected.filter(
        (item) => item.value.split("_")[0] !== type
      );
      const typeWithItemsRemoved = itemsToDeleteFrom.filter(
        (_, i) => i !== index
      );
      const newItems = [...itemsNotToDeleteFrom, ...typeWithItemsRemoved];
      setSelected(newItems);
    },
    [selected, type]
  );

  const onInput = useCallback(
    debounce(async (value: any) => {
      if (isBusy) return;

      setIsBusy(true);

      try {
        const suggestions = await fetchData(value, type, personOrTV);
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

  const noTVOptionsText =
    isBusy && !suggestions.length ? "Loading..." : "No shows found";

  const handleTypeChange = (type: any) => {
    console.log("type changed by user to", type, selected);
    setType(type);
    switch (type) {
      case "A":
      case "D":
        setPersonOrTV("person");
        break;
      case "T":
        setPersonOrTV("tv");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Tabs
        fullWidth
        size="lg"
        aria-label="Tabs form"
        selectedKey={type}
        onSelectionChange={(type) => handleTypeChange(type)}
        color="default"
        className="mb-5"
      >
        <Tab key="A" title="Actors" />
        <Tab key="D" title="Directors" />
        <Tab key="T" title="TV Shows" />
      </Tabs>

      {type === "A" && (
        <>
          <ReactTags
            ariaDescribedBy="actors"
            id="actors"
            labelText="Select actors"
            noOptionsText={noOptionsText}
            onAdd={onAdd}
            onDelete={onDelete}
            onInput={onInput}
            placeholderText="Start typing actor names..."
            selected={selected.filter(
              (item) => item.value.split("_")[0] === "A"
            )}
            suggestions={suggestions}
          />
          <Button
            fullWidth
            color="primary"
            className="flex-none mt-5 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() => handleTypeChange("D")}
          >
            Next &rarr;
          </Button>
        </>
      )}

      {type === "D" && (
        <>
          <ReactTags
            ariaDescribedBy="directors"
            id="directors"
            labelText="Select directors"
            noOptionsText={noOptionsText}
            onAdd={onAdd}
            onDelete={onDelete}
            onInput={onInput}
            placeholderText="Start typing director names..."
            selected={selected.filter(
              (item) => item.value.split("_")[0] === "D"
            )}
            suggestions={suggestions}
          />
          <Button
            fullWidth
            color="primary"
            className="flex-none mt-5 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() => handleTypeChange("T")}
          >
            Next &rarr;
          </Button>
        </>
      )}

      {type === "T" && (
        <>
          <ReactTags
            ariaDescribedBy="tv shows"
            id="tv shows"
            labelText="Select TV Shows"
            noOptionsText={noTVOptionsText}
            onAdd={onAdd}
            onDelete={onDelete}
            onInput={onInput}
            placeholderText="Start typing TV show names..."
            selected={selected.filter(
              (item) => item.value.split("_")[0] === "T"
            )}
            suggestions={suggestions}
          />

          <Button
            fullWidth
            color="primary"
            className="flex-none mt-5 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={handleSaveSelections}
          >
            Notify me about these selections
          </Button>
        </>
      )}
    </>
  );
}
