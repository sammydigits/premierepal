"use client";

import React, { useCallback, useState } from "react";
import { ReactTags } from "react-tag-autocomplete";
import { Tabs, Tab, Button, User } from "@nextui-org/react";
import { useRouter } from "next/navigation";

function prepareImage(image: string) {
  if (image) {
    return image.replace(/[/]|.jpg/g, "");
  }
  return "";
}

function debounce(
  fn: { (value: any): Promise<void>; (arg0: any): void },
  delay = 100
) {
  let timeoutID: string | number | NodeJS.Timeout | undefined;

  return function (...args: any) {
    const newArgs = [...args];
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn(newArgs), delay);
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
          .map((item: { id: any; name: any; profile_path: any }) => ({
            value: `${departmentAbbreviation}_${prepareImage(
              item.profile_path
            )}_${item.id}`,
            label: item.name,
          }));
      }
      return data.results.map(
        (item: { id: any; name: any; poster_path: any }) => ({
          value: `${departmentAbbreviation}_${prepareImage(item.poster_path)}_${
            item.id
          }`,
          label: item.name,
        })
      );
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
  const [reviewMode, setReviewMode] = useState(false);
  const [selected, setSelected] = useState([
    {
      value: "A_zmvK1jJ6UZpAAeMMgdEOWir0kQN_1245",
      label: "Scarlett Johansson",
    },
    {
      value: "A_jj2Gcobpopokal0YstuCQW0ldJ4_5292",
      label: "Denzel Washington",
    },
    {
      value: "A_wo2hJpn04vbtmh0B9utCFdsQhxM_6193",
      label: "Leonardo DiCaprio",
    },
    {
      value: "D_1gjcpAa99FAOWGnrUvHEXXsRs7o_1245",
      label: "Quentin Tarantino",
    },
    {
      value: "D_9U9Y5GQuWX3EZy39B8nkk4NY01S_1032",
      label: "Martin Scorsese",
    },
    { value: "T_l220jMmURQUTzgkFuf6u8YpYs84_1245", label: "Lupin" },
    {
      value: "T_iorStu3DHuscNfQiIyQomvMyO0h_97084",
      label: "Dave",
    },
  ]);
  const [suggestions, setSuggestions] = useState([]);

  const router = useRouter();

  // function to save selections and redirect to /sign-up
  const handleSaveSelections = () => {
    console.log("Saving selections...");
    //redirect to /sign-up
    // router.push("/checkout");
    router.push("sign-up?redirect_url=%2Fcheckout");
  };

  const handleSetReviewMode = () => {
    setReviewMode(true);
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
      {!reviewMode && (
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
        </>
      )}

      {type === "A" && !reviewMode && (
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

      {type === "D" && !reviewMode && (
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

      {type === "T" && !reviewMode && (
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
            onClick={handleSetReviewMode}
          >
            Review my selections
          </Button>
        </>
      )}
      {reviewMode && (
        <>
          <p className="text-base font-semibold leading-6 text-indigo-600 text-center">
            Get notified about this selection for $0.99/month
          </p>
          <p className="text-gray-400 text-center text-sm">
            Add more at any time for no extra cost
          </p>
          <div className="overflow-scroll h-52">
            <ul className="user-selections mt-5">
              {selected.map((item) => {
                const image = item.value.split("_")[1];
                return (
                  <li key={item.value} className="mb-3">
                    <User
                      name={item.label}
                      avatarProps={{
                        src: `https://image.tmdb.org/t/p/w45/${image}.jpg`,
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <Button
            fullWidth
            color="primary"
            className="flex-none mt-5 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={handleSaveSelections}
          >
            Sign up and pay
          </Button>
        </>
      )}
    </>
  );
}
