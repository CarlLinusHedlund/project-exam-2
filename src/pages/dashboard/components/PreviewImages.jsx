import PropTypes from "prop-types";

export default function PreviewImages({ files, handleDelete }) {
  return (
    <>
      {files &&
        files.length > 0 &&
        files.map((file, index) => (
          <div key={index} className="rounded-[10px] relative h-24 w-24 ">
            <div className="absolute rounded-[10px] w-full h-full top-0 left-0 right-0 bottom-0 bg-[#00000034]"></div>
            <p className=" text-[12px] absolute top-1 left-2 text-primaryWhite ">
              {index + 1}
            </p>
            <p onClick={handleDelete} className="absolute top-2 right-3">
              Delete
            </p>
            <img
              src={URL.createObjectURL(file)}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover rounded-[10px] "
            />
          </div>
        ))}
    </>
  );
}

PreviewImages.propTypes = {
  files: PropTypes.array,
  handleDelete: PropTypes.func,
};
