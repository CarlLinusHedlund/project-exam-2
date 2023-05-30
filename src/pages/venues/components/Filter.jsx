import { useCallback, useEffect, useRef, useState } from "react";
import "./map.css";
import PropTypes from "prop-types";
import RangeSlider from "../../../components/search/PriceRange";
import { supabase } from "../../../utils/Supabase";
import axios from "axios";
import { LocationSvg, SearchSvg } from "../../../components/DynamicSvgs";

export default function Filter({ setSearchQuery, minValue, maxValue }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [prices, setPrices] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1); // Track selected suggestion index
  const inputRef = useRef(null); // Reference to the input element

  const [maxNumber, setMaxNumber] = useState();
  const [minNumber, setMinNumber] = useState();
  console.log("minNumber:", minNumber, "maxNumber:", maxNumber);

  useEffect(() => {
    async function fetchVenuesPrice() {
      const { data, error } = await supabase
        .from("venues")
        .select("price_per_night");
      if (error) {
        console.log(error);
      }
      const price = data.map((venue) => venue.price_per_night);
      setPrices(price);
      setMaxPrice(Math.max(...price));
    }
    fetchVenuesPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bucketSize = maxPrice / 20;
  // console.log("BucketSize: ", bucketSize);
  const buckets = new Array(20).fill(0);

  useEffect(() => {
    if (inputValue.length >= 2) {
      const url = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${inputValue}&limit=5&access_token=${
        import.meta.env.VITE_MAPBOX_KEY
      }&session_token=`;
      axios
        .get(url)
        .then((response) => {
          // Handle the response data here
          setSuggestions(response.data.suggestions);
          // You can update the searchQuery or perform any other necessary operations based on the response
          // setSearchQuery(response.data.features[0].geometry.coordinates);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [inputValue]);

  const handleSuggestionClick = useCallback(
    (selectedSuggestion) => {
      const locationId = selectedSuggestion.mapbox_id;
      // Make the GET request to retrieve location details
      axios
        .get(
          `https://api.mapbox.com/search/searchbox/v1/retrieve/${locationId}?access_token=${
            import.meta.env.VITE_MAPBOX_KEY
          }&session_token=`
        )
        .then((response) => {
          // Handle the response data here
          setSearchQuery(response.data.features[0].geometry.coordinates);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [setSearchQuery]
  );

  useEffect(() => {
    const handleKeyboardNavigation = (event) => {
      const { key } = event;
      const suggestionCount = suggestions.length;

      if (key === "ArrowDown" && suggestionCount > 0) {
        event.preventDefault();
        setSelectedSuggestionIndex((prevIndex) =>
          prevIndex < suggestionCount - 1 ? prevIndex + 1 : 0
        );
      } else if (key === "ArrowUp" && suggestionCount > 0) {
        event.preventDefault();
        setSelectedSuggestionIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : suggestionCount - 1
        );
      } else if (key === "Escape") {
        event.preventDefault();
        inputRef.current.blur(); // Remove focus from the input element
        setSuggestions([]); // Clear suggestions
        setSelectedSuggestionIndex(-1); // Reset selected suggestion index
      }
      if (key === "Enter" && selectedSuggestionIndex !== -1) {
        event.preventDefault();
        const selectedSuggestion = suggestions[selectedSuggestionIndex];
        handleSuggestionClick(selectedSuggestion); // Call the suggestion click handler
      }
    };

    // Add event listener for keyboard navigation
    window.addEventListener("keydown", handleKeyboardNavigation);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyboardNavigation);
    };
  }, [
    suggestions,
    setSearchQuery,
    selectedSuggestionIndex,
    handleSuggestionClick,
  ]);

  prices.forEach((price) => {
    const bucketIndex = Math.floor(price / bucketSize);
    if (bucketIndex === 20) {
      buckets[19]++;
    } else {
      buckets[bucketIndex]++;
    }
  });
  // console.log("Buckets :", buckets);

  return (
    <div
      className={` overflow-hidden py-2 px-5 md:px-0 rounded-[10px] smd:rounded-none duration-500 flex flex-col gap-10 items-start shadow-lg smd:shadow-none font-poppins ${
        openFilter ? "h-[450px]" : "h-12"
      } smd:h-screen w-full bg-primaryWhite smd:border-r-2 smd:border-none border-gray-300 smd:w-[400px] relative smd:sticky smd:top-24 smd:bottom-0 `}
    >
      <div
        onClick={() => setOpenFilter(!openFilter)}
        className=" h-10 text-[20px] font-semibold w-full flex justify-between items-center"
      >
        Filter
        <img className="h-5 w-5" src="../filter.svg" alt="filter icon" />
      </div>
      <div
        className={` h-[350px] smd:h-full flex flex-col gap-10 w-full px-1  `}
      >
        <div className="w-full relative">
          <label
            className=" relative font-medium text-[14px]"
            id="searchBox"
            htmlFor="searchBox"
          >
            Search Location
            <label
              className="w-full h-10 px-2 border-gray-300 border-2 rounded-md flex gap-2 items-center"
              htmlFor="searchBox"
            >
              <SearchSvg color="#252525" />
              <input
                ref={inputRef}
                placeholder="New York, USA"
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setSuggestions([])} // Clear suggestions when input is focused
                type="text"
                className="w-full h-full outline-none bg-primaryWhite text-primaryDark placeholder:text-gray-300 placeholder:text-[12px]"
              />
            </label>
          </label>
          {suggestions.length > 0 && (
            <div className="w-full overflow-hidden mt-5 h-fit flex flex-col rounded-[10px] bg-primaryWhite shadow-lg">
              {suggestions &&
                suggestions.map((result, index) => (
                  <div
                    onClick={() => handleSuggestionClick(result)} // Handle suggestion selection
                    className={`w-full group hover:bg-gray-100 hover:scale-[1.02] cursor-pointer group border-b-2 items-center duration-300 flex gap-2 justify-between px-3 py-3 border-gray-300 ${
                      index === selectedSuggestionIndex
                        ? "bg-gray-100 scale-[1.02] "
                        : "" // Apply different background for selected suggestion
                    }`}
                    key={index}
                  >
                    <div className="flex flex-nowrap gap-2 items-center">
                      <div className="hidden bg-primaryCoral h-fit w-fit p-2 rounded-full">
                        <LocationSvg
                          color="#252525"
                          width="13px"
                          height="13px"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-[14px]  font-semibold">
                          {result.name}
                        </p>
                        <p className="text-[12px] whitespace-normal text-gray-300">
                          {result.full_address}
                        </p>
                      </div>
                    </div>
                    <div className="min-w-[10px]">
                      <img
                        className={` ${
                          index === selectedSuggestionIndex
                            ? " translate-x-[5px] "
                            : " translate-x-0"
                        } duration-300 -rotate-[90deg] `}
                        src="../arrow.svg"
                        alt=""
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="w-full mt-10">
          <p className="font-medium text-[14px]">Price</p>
          <div className="flex gap-[2px] justify-between items-end pb-1 h-20">
            {buckets.map((count, index) => (
              <div
                className={` w-full rounded-t-[4px] bg-primaryCoral max-h-14`}
                style={{
                  maxHeight: "60px",
                  height: `${count * 10}px`,
                  opacity: `1`,
                  transition: "opacity 1s ease-in, height 1s ease-in",
                }}
                key={index}
              ></div>
            ))}
          </div>
          <RangeSlider
            setMinNumber={setMinNumber}
            setMaxNumber={setMaxNumber}
            minValue={minValue}
            maxValue={maxValue}
            initialMin={1000}
            initialMax={3000}
            min={0}
            max={maxPrice + 1}
            step={100}
            priceCap={1000}
          />
        </div>
      </div>
    </div>
  );
}

Filter.propTypes = {
  minValue: PropTypes.number,
  setSearchQuery: PropTypes.func,
  maxValue: PropTypes.number,
};
