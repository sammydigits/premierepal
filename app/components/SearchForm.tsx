"use client";

import { Card, CardBody } from "@nextui-org/react";
import SearchAutocomplete from "./SearchAutocomplete";

export default function SearchForm() {
  return (
    <div className="flex flex-col w-full mb-6">
      <Card className="max-w-full w-[450px] h-[375px]">
        <CardBody>
          <SearchAutocomplete />
        </CardBody>
      </Card>
    </div>
  );
}
