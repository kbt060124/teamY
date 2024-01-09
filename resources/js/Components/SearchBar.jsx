import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Box, TextField, Button } from "@mui/material";

const SearchBar = () => {
    const { data, setData, get } = useForm({
        search: "",
    });

    const handleChange = (e) => {
        setData("search", e.target.value);
        console.log(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.search.trim()) {
            return;
        }
        get(route("search"));
    };

    return (
        <div className="w-full flex items-center">
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="relative">
                    <label htmlFor="Search" className="sr-only">
                        {" "}
                        Search{" "}
                    </label>

                    <input
                        type="text"
                        id="Search"
                        placeholder="Search for..."
                        className="w-full border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
                        onChange={handleChange}
                    />

                    <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                        <Button
                            type="submit"
                            className="text-gray-600 hover:text-gray-700"
                        >
                            <span className="sr-only">Search</span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>
                        </Button>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
