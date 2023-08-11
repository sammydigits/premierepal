"use client";

import React, { useState } from "react";
import { Tabs, Tab, Textarea, Button, Card, CardBody } from "@nextui-org/react";

export default function SearchForm() {
  const [selected, setSelected] = useState<string | React.Key>("login");

  return (
    <div className="flex flex-col w-full mt-12">
      <Card className="max-w-full w-[440px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="lg"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(e) => setSelected(e)}
          >
            <Tab key="actor" title="Actors">
              <form className="flex flex-col gap-4">
                <Textarea
                  label="Type actor names:"
                  labelPlacement="outside"
                  placeholder=""
                />
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Search
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="director" title="Directors">
              <form className="flex flex-col gap-4 h-[300px]">
                <Textarea
                  label="Type director names:"
                  labelPlacement="outside"
                  placeholder=""
                />
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Search
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="tv" title="TV Shows">
              <form className="flex flex-col gap-4 h-[300px]">
                <Textarea
                  label="Type TV show names:"
                  labelPlacement="outside"
                  placeholder=""
                />

                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Search
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
