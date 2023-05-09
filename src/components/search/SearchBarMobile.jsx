import { useState, useEffect, useRef } from "react";
import { SearchSvg } from "../DynamicSvgs";
import { supabase } from "../../Supabase";
import "./index.css";
import RangeSlider from "./PriceRange";

export default function SearchBarMobile() {
  const [openSearch, setOpenSearch] = useState(false);
  const isMobile = window.innerWidth < 768;
  const searchModalRef = useRef(null);
  const [maxPrice, setMaxPrice] = useState(0);
  const [prices, setPrices] = useState([]);
  console.log("prices", prices);

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

  prices.forEach((price) => {
    const bucketIndex = Math.floor(price / bucketSize);
    if (bucketIndex === 20) {
      buckets[19]++;
    } else {
      buckets[bucketIndex]++;
    }
  });
  console.log("Buckets :", buckets);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchModalRef.current &&
        !searchModalRef.current.contains(event.target)
      ) {
        setOpenSearch(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchModalRef]);

  if (!isMobile) {
    return null; // if screen size is not mobile, return nothing
  }

  const handleSearch = () => {
    // console.log("Search!");
    setOpenSearch(false);
  };
  const OpenSearchModal = () => {
    setOpenSearch(true);
    // console.log("open Search!: ", openSearch);
  };

  const CloseSearchModal = (event) => {
    event.stopPropagation();
    setOpenSearch(false);
    // console.log("close Search!: ", openSearch);
  };

  return (
    <>
      {isMobile && (
        <div className="w-full h-fit absolute left-0 right-0 top-5 mx-auto px-3 xs:px-10 md:hidden z-10 ">
          <div
            ref={searchModalRef}
            className="w-full h-full text-primaryDark bg-primaryWhite drop-shadow-lg rounded-[10px] px-4 py-5 font-poppins flex flex-col "
          >
            <div
              onClick={OpenSearchModal}
              className="w-full flex justify-between items-center"
            >
              <div className="flex flex-col w-[90%]">
                <p className=" font-semibold ">Location</p>
                <input
                  placeholder="Where a you going?"
                  type="text"
                  className="text-sm bg-primaryWhite px-1 py-2 outline-none text-gray-500 "
                />
              </div>
              <div
                className={`h-9 w-9 duration-200 flex justify-center items-center rounded-full ${
                  openSearch ? "bg-primaryWhite" : "bg-primaryCoral"
                }`}
              >
                {openSearch ? (
                  <img
                    onClick={CloseSearchModal}
                    className="w-4 h-4"
                    src="../close.svg"
                    alt=""
                  />
                ) : (
                  <SearchSvg color="#252525" />
                )}
              </div>
            </div>
            <div
              className={`bg-primaryWhite overflow-hidden w-full duration-500 flex flex-col gap-5 justify-between ${
                openSearch ? "h-[350px] pt-10 " : "h-0 py-0"
              }`}
            >
              {prices.length > 0 && (
                <div
                  className={`duration-500 delay-75 flex flex-col w-full ${
                    openSearch ? "opacity-100" : "opacity-0"
                  } `}
                >
                  <div className="w-full">
                    <h3>Price range</h3>
                  </div>
                  <div className="flex gap-[2px] justify-between items-end pb-1 h-20">
                    {buckets.map((count, index) => (
                      <div
                        className={` w-full rounded-t-[4px] bg-primaryCoral max-h-14`}
                        style={{
                          height: `${openSearch ? count * 10 : 0}px`,
                          opacity: `${openSearch ? "0.8" : "0"}`,
                          transition:
                            "opacity 1s ease-in-out, height 1s ease-in",
                        }}
                        key={index}
                      ></div>
                    ))}
                  </div>
                  <RangeSlider
                    initialMin={1500}
                    initialMax={3000}
                    min={0}
                    max={maxPrice + 1}
                    step={100}
                    priceCap={1000}
                  />
                </div>
              )}

              <button
                onClick={handleSearch}
                className={`w-full py-2 bg-primaryCoral delay-300 rounded-[10px] duration-1000 ${
                  openSearch
                    ? "translate-y-0 opacity-100 "
                    : " opacity-0 translate-y-10 "
                }  `}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
