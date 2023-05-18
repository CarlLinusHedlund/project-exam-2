import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

function AnimatedImg({ image, index }) {
  const [img, inView] = useInView({
    // triggerOnce: true,
    rootMargin: "500px 0px 100px 0px",
  });
  return (
    <>
      <motion.img
        ref={img}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
        key={index}
        className="h-full w-full mx-auto my-2 rounded-[10px] "
        src={image}
        alt={`Image ${index}`}
      />
    </>
  );
}
AnimatedImg.propTypes = {
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default function DesktopImgContainer({ media, title }) {
  const [showModal, setShowModal] = useState(false);

  const ShowImages = () => {
    setShowModal(true);
  };

  const HideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className=" w-full grid gap-3 h-[500px] grid-cols-7 grid-rows-5 pt-5">
        <div
          className={` ${
            media.length > 4
              ? "col-span-4 row-span-5 "
              : "col-span-7 row-span-5"
          }  row-span-3 rounded-[10px] shadow-lg relative `}
        >
          {media.length < 4 && (
            <div
              onClick={ShowImages}
              className=" flex justify-center items-center absolute cursor-pointer  bottom-5 right-5 w-36 h-24 rounded-[10px] bg-[#acacacc0] backdrop-blur-sm "
            >
              <p>
                Show all <br /> {media.length} Images
              </p>
            </div>
          )}
          <img
            className=" col-span-7 row-span-5 h-full w-full rounded-[10px] object-cover "
            src={media[0]}
            alt={title}
          />
        </div>
        {media.length > 4 && (
          <>
            <img
              className=" shadow-lg col-span-3 row-span-3 col-start-5 row-start-1 h-full w-full rounded-[10px] object-cover"
              src={media[1]}
              alt={title}
            />
            <div className=" row-span-2 col-start-5 col-span-3 row-start-4  h-full grid grid-cols-8 grid-rows-1 gap-3">
              <img
                className=" shadow-lg  col-span-4 lg:col-span-5 w-full h-full object-cover rounded-[10px] "
                src={media[2]}
                alt={title}
              />
              <div className="shadow-lg  relative col-span-4 lg:col-span-3 rounded-[10px] ">
                <div
                  onClick={ShowImages}
                  className=" duration-300 hover:shadow-lg cursor-pointer absolute top-0 left-0 right-0 rounded-[10px] w-full h-full bg-[#50505070] hover:bg-[#a8a8a870] backdrop-blur-[2.5px] flex justify-center items-center "
                >
                  <p className="text-primaryWhite">
                    Show all <br />
                    {media.length} images
                  </p>
                </div>
                <img
                  className="h-full w-full object-cover rounded-[10px] "
                  src={media[0]}
                  alt={title}
                />
              </div>
            </div>
          </>
        )}
        {showModal && (
          <div
            className="fixed z-50 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
                aria-hidden="true"
                onClick={HideModal}
              ></div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                &#8203;
              </span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex justify-center">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <div className="mt-2 flex flex-col gap-5 items-center justify-center">
                        {media.map((image, index) => (
                          <AnimatedImg
                            key={index}
                            image={image}
                            index={index}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={HideModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
DesktopImgContainer.propTypes = {
  media: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};
