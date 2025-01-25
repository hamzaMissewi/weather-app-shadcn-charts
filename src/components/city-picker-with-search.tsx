"use client";

import { City, Country, State } from "country-state-city";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPinIcon } from "lucide-react";
import { Button } from "./ui/button";
import * as React from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent } from "@/components/ui/popover";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { cn } from "@/lib/utils";

type TCountry = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;

type TState = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    isoCode: string;
  };
  label: string;
} | null;

type TCity = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label: string;
} | null;

const countries = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

export function CityPickerWithSearch() {
  const [selectedCountry, setSelectedCountry] = useState<TCountry>(null);
  const [searchCountryTerm, setSearchCountryTerm] = useState("");
  const [selectedState, setSelectedState] = useState<TState>(null);
  const [selectedCity, setSelectedCity] = useState<TCity>(null);

  const router = useRouter();

  const handleCountryChange = (countryName: string) => {
    setSearchCountryTerm(countryName);
    const country = countries.find(
      (country) => country.label === countryName,
    ) as TCountry;

    if (country) {
      setSelectedCountry(country);
      setSelectedState(null);
      setSelectedCity(null);
      // setSearchCountryTerm(country.label);
    }
  };

  // Filter countries based on search term
  const filteredCountries = useMemo(
    () =>
      countries.filter((country) =>
        country.label.toLowerCase().includes(searchCountryTerm.toLowerCase()),
      ),
    [searchCountryTerm],
  );

  // Handle keydown events (e.g., Enter key)
  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredCountries.length > 0) {
      handleCountryChange(filteredCountries[0].label); // Select the first filtered option
    }
  };
  //
  // const handleKeydownCountry = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     const selectedCountry = countries.find((c) =>
  //       c.label.toLowerCase().includes(e.currentTarget.value.toLowerCase()),
  //     );
  //
  //     if (selectedCountry) {
  //       setSelectedCountry(selectedCountry);
  //     }
  //   }
  // };

  // const [open, setOpen] = React.useState(false);

  const handleStateChange = (stateName: string) => {
    if (selectedCountry) {
      const state = State.getStatesOfCountry(
        selectedCountry.value.isoCode,
      )?.find((s) => s.name === stateName);
      if (state) {
        setSelectedState({
          value: {
            latitude: state.latitude!,
            longitude: state.longitude!,
            countryCode: state.countryCode,
            name: state.name,
            isoCode: state.isoCode,
          },
          label: state.name,
        });
      }
    }
  };

  const handleCityChange = (cityName: string) => {
    if (selectedCountry) {
      const city = City.getCitiesOfCountry(selectedCountry.value.isoCode)?.find(
        (c) => c.name === cityName,
      );
      if (city) {
        setSelectedCity({
          value: {
            latitude: city.latitude!,
            longitude: city.longitude!,
            countryCode: city.countryCode,
            name: city.name,
            stateCode: city.stateCode,
          },
          label: city.name,
        });
      }
    }
  };

  const handleContinue = () => {
    router.push(
      `/weather/${selectedCity?.value.name}/${selectedCity?.value.latitude}/${selectedCity?.value.longitude}`,
    );
  };

  return (
    <Card className="bg-green-200/40 border-none w-full lg:w-96">
      <CardHeader className="flex items-center">
        <CardTitle>
          <div className="flex items-center text-white">
            <MapPinIcon className="size-6 mr-2" />
            <h2>Select City</h2>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Country Selector */}

          {/*<PopoverTrigger asChild>*/}
          {/*  <SelectValue placeholder="Select a Country" />*/}
          {/*</PopoverTrigger>*/}
          <Select onValueChange={handleCountryChange}>
            <SelectTrigger>
              {/*<SelectValue placeholder="Select a Country" />*/}
            </SelectTrigger>
            <SelectContent>
              <Input
                placeholder="Search and select a country..."
                value={searchCountryTerm}
                onChange={(e) => handleCountryChange(e.target.value)}
                // selectedCountry ? selectedCountry.label : searchCountryTerm
                // onChange={(e) => setSearchCountryTerm(e.target.value)}
                // onKeyDown={handleKeydown}
                className="mb-2"
                autoFocus
              />
              {/*<div className="w-full p-2 cursor-pointer">*/}
              {/*<Input*/}
              {/*  placeholder="Search and select a country..."*/}
              {/*  value={searchCountryTerm}*/}
              {/*  // selectedCountry ? selectedCountry.label : searchCountryTerm*/}
              {/*  onChange={(e) => handleCountryChange(e.target.value)}*/}
              {/*  // onChange={(e) => setSearchCountryTerm(e.target.value)}*/}
              {/*  onKeyDown={handleKeydown}*/}
              {/*  className="mb-2"*/}
              {/*  autoFocus*/}
              {/*/>*/}

              <Popover>
                <PopoverContent className="w-full cursor-pointer">
                  {(filteredCountries.length > 0
                    ? filteredCountries
                    : countries
                  ).map((country, index) => (
                    <SelectItem key={index} value={country.label}>
                      {country.label}
                    </SelectItem>
                  ))}
                </PopoverContent>
              </Popover>
            </SelectContent>
          </Select>

          {/* TODO OLD SELECT COUNTRY Country Selector */}
          {/*<Select onValueChange={handleCountryChange}>*/}
          {/*    <SelectTrigger>*/}
          {/*        <SelectValue placeholder="Select a Country" />*/}
          {/*    </SelectTrigger>*/}
          {/*    <SelectContent>*/}
          {/*        {countries.map((country, index: number) => (*/}
          {/*            <SelectItem key={index} value={country.label}>*/}
          {/*                {country.label}*/}
          {/*            </SelectItem>*/}
          {/*        ))}*/}
          {/*    </SelectContent>*/}
          {/*</Select>*/}

          {/* State/District Selector */}
          <Select onValueChange={handleStateChange} disabled={!selectedCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Select a State" />
            </SelectTrigger>
            <SelectContent>
              {selectedCountry &&
                State.getStatesOfCountry(selectedCountry.value.isoCode)?.map(
                  (state, index: number) => (
                    <SelectItem key={index} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ),
                )}
            </SelectContent>
          </Select>

          {/* City Selector */}
          <Select
            onValueChange={handleCityChange}
            disabled={!selectedCountry || !selectedState}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a City" />
            </SelectTrigger>
            <SelectContent>
              {selectedCountry &&
                City.getCitiesOfCountry(selectedCountry.value.isoCode)?.map(
                  (city, index: number) => (
                    <SelectItem key={index} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ),
                )}
            </SelectContent>
          </Select>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button
          disabled={!selectedCountry || !selectedCity}
          onClick={handleContinue}
          className="bg-green-500 hover:bg-green-500/90"
        >
          Search
        </Button>
      </CardFooter>
    </Card>
  );
}
