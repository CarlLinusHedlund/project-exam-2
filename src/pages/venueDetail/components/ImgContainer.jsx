import PropTypes from "prop-types";
import DesktopImgContainer from "./DesktopImgContainer";
import { MobileImgContainer } from "./MobileImgContainer";
import { useMediaQuery } from "react-responsive";

export default function ImgContainer({ title, media }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {isMobile ? (
        <MobileImgContainer media={media} title={title} />
      ) : (
        <DesktopImgContainer media={media} title={title} />
      )}
    </>
  );
}

ImgContainer.propTypes = {
  media: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};
