// import { Field, ErrorMessage } from "formik";
// import PropTypes from "prop-types";
import { useState } from "react";
import PreviewImages from "./PreviewImages";
// import { useDropzone } from "react-dropzone";

export default function StepTwo() {
  const [files, setFiles] = useState(null);

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const validFiles = droppedFiles.filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png"
    );
    setFiles((prevFiles) => {
      return prevFiles ? [...prevFiles, ...validFiles] : validFiles;
    });
  };

  const handleInputChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => {
      return prevFiles ? [...prevFiles, ...newFiles] : newFiles;
    });
  };

  const handleDelete = (index) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const getTotalSize = () => {
    let totalSize = 0;
    if (files && files.length > 0) {
      files.forEach((file) => {
        totalSize += file.size;
      });
    }
    const totalSizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
    return totalSizeInMB;
  };

  console.log(files);
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-10">
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="lg:w-1/2 lg:no-wrap rounded-[10px] lg:min-h-[300px] bg-gray-100 py-12 flex flex-col gap-2 justify-center items-center  w-full border-dashed border-2 border-primaryDark "
        >
          <img src="../upload.svg" alt="upload icon" />
          <div>
            Drag and drop or{" "}
            <label
              className="pl-1  text-blue-400 cursor-pointer underline "
              htmlFor="image_uploads"
            >
              browse
              <input
                onChange={handleInputChange}
                hidden
                name="image_uploads"
                id="image_uploads"
                type="file"
                multiple
                accept="image/png, image/jpeg"
              />
            </label>
          </div>
        </div>
        <div className=" lg lg:w-1/2 flex gap-4 items-center flex-wrap overflow-y-scroll">
          <PreviewImages files={files} handleDelete={handleDelete} />
          {files && <div className="">Total Size: {getTotalSize()} mb</div>}
        </div>
      </div>
    </>
  );
}

// StepTwo.propTypes = {
//   errors: PropTypes.object.isRequired,
//   touched: PropTypes.object.isRequired,
// };
