import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import HeroSection from "../components/HeroSection";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
  Drawer,
} from "flowbite-react";

import {
  add as addCountries,
  setLoading,
  setError,
} from "../store/countriesSlice";
import {
  add as addSelectedCountry,
  remove,
} from "../store/selectedCountriesSlice";
import { Link } from "react-router-dom";

export default function Countries({ isOpen, setIsOpen }) {
  const { selectedCountriesSlice, countriesSlice } = useSelector(
    (store) => store
  );
  const { selectedCountries } = selectedCountriesSlice;
  const { countries, loading, error } = countriesSlice;

  const dispatch = useDispatch();

  const customTheme = {
    root: {
      base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
      shadow:
        "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
      wrapper: "relative",
    },
    body: {
      base: "group/body",
      cell: {
        base: "px-6 py-3 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
      },
    },
    head: {
      base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400 text-white",
      cell: {
        base: "bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700 bg-red-500",
      },
    },
    row: {
      base: "group/row",
      hovered: "hover:bg-gray-50 dark:hover:bg-gray-600",
      striped:
        "odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700",
    },
  };

  useEffect(() => {
    async function fetchCountries() {
      try {
        dispatch(setLoading(true));
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        dispatch(addCountries(data.slice(0, 10)));
      } catch (error) {
        setError(error.message);
      } finally {
        dispatch(setLoading(false));
      }
    }

    fetchCountries();
  }, []);

  const selectCountry = (country) => {
    const {
      name: { common: name },
      population,
      flags: { png: flagURL },
    } = country;

    dispatch(addSelectedCountry({ name, population, flagURL }));
    setIsOpen(true);
  };

  function unSelectCountry(countryName) {
    dispatch(remove(countryName));
  }

  function countrySelected(name) {
    return selectedCountries.some((country) => country.name === name);
  }

  return (
    <div>
      <Drawer open={isOpen} position='right' onClose={() => setIsOpen(false)}>
        <Drawer.Items>
          <ul className='grid grid-cols-2 gap-4'>
            {selectedCountries.map((country, index) => (
              <li key={index}>
                <p>{country.name}</p>
                <img
                  src={country.flagURL}
                  alt={country.name}
                  className='h-[120px] w-full'
                />
              </li>
            ))}
          </ul>
        </Drawer.Items>
      </Drawer>

      <HeroSection elements={selectedCountries.slice(0, 8)} />

      <div>{loading && <p className='text-blue-500'>loading...</p>}</div>
      <div className='max-w-[1140px] mx-auto mt-4'>
        <Table striped theme={customTheme}>
          <TableHead>
            <TableHeadCell className='bg-blue-700'>Name</TableHeadCell>
            <TableHeadCell>Population</TableHeadCell>
            <TableHeadCell>Capital</TableHeadCell>
            <TableHeadCell>
              <span className='sr-only'>Edit</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className='divide-y'>
            {countries.map((c) => (
              <TableRow
                key={c.ccn3}
                className='bg-white dark:border-gray-700 dark:bg-gray-800'
              >
                <TableCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  <Link to={`/country/${c.cca2}`}>{c.name.common}</Link>
                </TableCell>
                <TableCell>{c.population}</TableCell>
                <TableCell>{c.capital}</TableCell>
                <TableCell>
                  <Button
                    color={countrySelected(c.name.common) ? "success" : "gray"}
                    onClick={
                      countrySelected(c.name.common)
                        ? () => unSelectCountry(c.name.common)
                        : () => selectCountry(c)
                    }
                  >
                    {countrySelected(c.name.common) ? "O'chirish" : "Tanlash"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
