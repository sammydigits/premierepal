"use client";

import React, { useState } from "react";
import { Tabs, Tab, Textarea, Button, Card, CardBody } from "@nextui-org/react";

export default function SearchForm() {
  const [selected, setSelected] = useState<string | React.Key>("login");

  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-[450px] h-[350px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="lg"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(e) => setSelected(e)}
            color="default"
          >
            <Tab key="actor" title="Actors">
              <form className="flex flex-col gap-4">
                <Textarea
                  label="Type actor names:"
                  labelPlacement="outside"
                  placeholder=""
                  minRows={7}
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    onClick={() => setSelected("director")}
                  >
                    Next &rarr;
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="director" title="Directors">
              <form className="flex flex-col gap-4">
                <Textarea
                  label="Type director names:"
                  labelPlacement="outside"
                  placeholder=""
                  minRows={7}
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    onClick={() => setSelected("tv")}
                  >
                    Next &rarr;
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="tv" title="TV Shows">
              <form className="flex flex-col gap-4">
                <Textarea
                  label="Type TV show names:"
                  labelPlacement="outside"
                  placeholder=""
                  minRows={7}
                />

                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Subscribe to these selections
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
