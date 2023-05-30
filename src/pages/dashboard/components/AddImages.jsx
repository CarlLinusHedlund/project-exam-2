// import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
// import { useState } from "react";
import PreviewImages from "./PreviewImages";
import "./index.css";

export default function AddImages({ errors, files, setFiles, setFieldValue }) {
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const validFiles = newFiles.filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png"
    );
    setFiles([...files, ...validFiles]);
    setFieldValue("files", [...files, ...validFiles]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);
    const validFiles = newFiles.filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png"
    );
    setFiles([...files, ...validFiles]);
    setFieldValue("files", [...files, ...validFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDelete = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    setFieldValue("files", updatedFiles);
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

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-10 px-3 md:px-0">
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
                onChange={handleFileChange}
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
        <div className=" relative lg:w-1/2 flex gap-4 items-center flex-wrap overflow-y-scroll">
          {files.length > 0 && <p>Uploaded files</p>}
          <div className=" h-[250px] overflow-y-scroll flex justify-start gap-5 flex-col w-full p-3">
            <PreviewImages
              setFieldValue={setFieldValue}
              files={files}
              handleDelete={handleDelete}
            />
          </div>
          <div className="flex flex-wrap gap-5">
            {files.length > 0 && (
              <div className=" ">Total Size: {getTotalSize()} mb</div>
            )}
            {errors.files && (
              <div className="text-[14px] text-red-400">{errors.files}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

AddImages.propTypes = {
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  files: PropTypes.array.isRequired,
  setFieldValue: PropTypes.func,
  setFiles: PropTypes.func,
};
