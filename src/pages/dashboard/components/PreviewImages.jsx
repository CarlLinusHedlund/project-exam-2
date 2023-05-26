import PropTypes from "prop-types";
import { useState } from "react";
import { DeleteSvg } from "../../../components/DynamicSvgs";

export default function PreviewImages({ files, handleDelete, setFieldValue }) {
  const [dragItemIndex, setDragItemIndex] = useState();
  const [dragOverItemIndex, setDragOverItemIndex] = useState();

  const handleDragStart = (index) => {
    setDragItemIndex(index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (index) => {
    console.log(`move item ${dragItemIndex} to position ${index}`);
    const _files = [...files];
    const dragItem = _files.splice(dragItemIndex, 1)[0]; // Remove the drag item from the array
    _files.splice(dragOverItemIndex, 0, dragItem); // Insert the drag item at the specified index
    setFieldValue("files", _files); // Update the "files" field value
  };

  const handleDragEnter = (index) => {
    setDragOverItemIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverItemIndex(undefined);
  };

  const handleDragEnd = () => {
    setDragItemIndex(undefined);
    setDragOverItemIndex(undefined);
  };

  const moveItemUp = (index) => {
    if (index > 0) {
      const _files = [...files];
      const temp = _files[index - 1];
      _files[index - 1] = _files[index];
      _files[index] = temp;
      setFieldValue("files", _files);
    }
  };

  const moveItemDown = (index) => {
    if (index < files.length - 1) {
      const _files = [...files];
      const temp = _files[index + 1];
      _files[index + 1] = _files[index];
      _files[index] = temp;
      setFieldValue("files", _files);
    }
  };

  return (
    <>
      {files &&
        files.length > 0 &&
        files.map((file, index) => (
          <div
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragEnd}
            className="flex gap-8 items-center p-2"
            key={index}
          >
            <div
              key={index}
              className={` ${
                file.size > 3 * 1014 * 1014 ? "border-red-400" : "border-none"
              } rounded-[10px] border-[1px] w-full h-24 flex items-center justify-between bg-primaryWhite lg:hover:scale-[1.03] duration-200 shadow-sm px-4  `}
            >
              <div className=" pl-1 flex items-center gap-2">
                <p className=" text-[12px] top-1 left-2 text-primaryDark ">
                  {index + 1}
                </p>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Image ${index + 1}`}
                  className="w-28 h-20 object-cover rounded-[10px]  "
                />
              </div>
              <div className="flex items-center gap-5">
                <div
                  className=" top-2 right-3 cursor-pointer hover:scale-110 duration-300 "
                  onClick={handleDelete}
                >
                  <DeleteSvg color="#252525" width="15px" height="15px" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 ">
              <img
                onClick={() => moveItemUp(index)}
                className={`w-[10px] h-[10px] rotate-180 cursor-pointer duration-200 lg:hover:scale-125 ${
                  index === 0 ? "hidden" : "block"
                } `}
                src="../arrow.svg"
                alt="up"
              />
              <img
                onClick={() => moveItemDown(index)}
                className="w-[10px] h-[10px] cursor-pointer duration-200 lg:hover:scale-125  "
                src="../arrow.svg"
                alt="down"
              />
            </div>
          </div>
        ))}
    </>
  );
}

PreviewImages.propTypes = {
  files: PropTypes.array,
  handleDelete: PropTypes.func,
  setFieldValue: PropTypes.func,
};
