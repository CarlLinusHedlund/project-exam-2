import PropTypes from "prop-types";

export default function DesktopImgContainer({ media, title }) {
  return (
    <div className=" w-full grid h-[450px] grid-cols-3 grid-rows-3 gap-3 px-4">
      <img
        className="col-span-2 h-full w-full row-span-3 rounded-[10px] object-cover "
        src={media[0]}
        alt={title}
      />

      <img
        className=" col-span-1 row-span-2 col-start-3 row-start-1 h-full w-full  rounded-[10px] object-cover"
        src={media[1]}
        alt={title}
      />
      <div className=" row-span-1 col-start-3 col-span-1 row-start-3  h-full grid grid-cols-3 grid-rows-1 gap-3">
        <img
          className=" col-span-2 w-full h-full object-cover rounded-[10px] "
          src={media[0]}
          alt={title}
        />
        <img
          className=" col-span-1 h-full w-full object-cover rounded-[10px] "
          src={media[0]}
          alt={title}
        />
      </div>
    </div>
  );
}

DesktopImgContainer.propTypes = {
  media: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};
