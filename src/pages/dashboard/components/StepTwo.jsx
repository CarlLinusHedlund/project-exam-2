// import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
// import { useState } from "react";
import PreviewImages from "./PreviewImages";

export default function StepTwo({
  touched,
  errors,
  files,
  setFiles,
  setFieldValue,
}) {
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles([...files, ...newFiles]);
    setFieldValue("files", [...files, ...newFiles]);
  };

  console.log("Errors", errors);
  console.log("touched", touched);

  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);
    setFiles([...files, ...newFiles]);
    setFieldValue("files", [...files, ...newFiles]);
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
        <div className=" lg lg:w-1/2 flex gap-4 items-center flex-wrap overflow-y-scroll">
          <PreviewImages files={files} handleDelete={handleDelete} />
          {files && <div className="">Total Size: {getTotalSize()} mb</div>}
        </div>
      </div>
    </>
  );
}

StepTwo.propTypes = {
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  files: PropTypes.array.isRequired,
  setFieldValue: PropTypes.func,
  setFiles: PropTypes.func,
};
