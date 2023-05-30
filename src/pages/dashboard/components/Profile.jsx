import { useContext, useState } from "react";
import { UserContext } from "../../../components/auth/utils/UserContext";
import {
  useGetUserQuery,
  useUpdateUserImageMutation,
  useUploadUserImageMutation,
  useUpdateUserMediaColumnMutation,
} from "../../../store/modules/ApiSlice";
import { useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { EditSvg } from "../../../components/DynamicSvgs";

export default function Profile() {
  const { session } = useContext(UserContext);
  const id = session.user;
  const [user, setUser] = useState(null);
  const { data } = useGetUserQuery(id.id);
  const [modal, setModal] = useState(false);
  const [files, setFiles] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadImg, { data: uploadData, error: uploadError }] =
    useUploadUserImageMutation();
  const [updateImg, { data: updateData, error: updateError }] =
    useUpdateUserImageMutation();
  const [updateProfile, { data: profileData, error: profileError }] =
    useUpdateUserMediaColumnMutation();

  useEffect(() => {
    if (data) {
      if (data.length > 0) {
        setUser(data[0]);
      }
    }
  }, [data]);
  // console.log(data, error, isLoading);
  console.log("userData", data);
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const validFiles = newFiles.filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png"
    );
    setFiles(validFiles);
    // Display image preview
    if (validFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(validFiles[0]);
    } else {
      setImagePreview(null);
    }
  };
  console.log(data);
  const handleSubmit = () => {
    const file = files[0];
    const user_id = id.id;
    const user_name = data[0].name;
    console.log(user_id);
    console.log(user_name);
    console.log(file);
    if (data[0].profile_img) {
      updateImg({ file: file, user_id: user_id, user_name: user_name }).then(
        (updateResponse) => {
          console.log(updateResponse.data);
          const path = updateResponse.data.path;
          const url = `${
            import.meta.env.VITE_PUBLIC_SUPABASE_URL
          }/storage/v1/object/public/avatar/${path}`;
          updateProfile({ url, user_id: user_id });
        }
      );
    } else {
      uploadImg({ file: file, user_id: user_id, user_name: user_name }).then(
        (uploadResponse) => {
          console.log(uploadResponse.data);
          const path = uploadResponse.data.path;
          const url = `${
            import.meta.env.VITE_PUBLIC_SUPABASE_URL
          }/storage/v1/object/public/avatar/${path}`;
          updateProfile({ url, user_id: user_id });
        }
      );
    }
  };

  // console.log(uploadData);
  // console.log(uploadError);
  // console.log(imagePreview);

  if (user) {
    return (
      <motion.div
        className=" text-primaryDark font-poppins w-full h-screen py-14 px-5 md:px-10 lg:px-20 "
        exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      >
        {modal && (
          <div
            onClick={() => {
              if (
                event.target === event.currentTarget ||
                event.currentTarget.contains(event.target)
              ) {
                return; // Do not close the modal
              }
              setImagePreview(null);
              setModal(false); // Close the modal
            }}
            className=" z-10 fixed h-screen p-10 flex justify-center items-center w-full top-0 left-0 right-0 bottom-0 bg-[#ffffff8d] backdrop-blur-[2px]"
          >
            <div className="w-full px-5 py-10 relative rounded-[10px] h-fit shadow-xl opacity-100 bg-primaryWhite max-w-sm max-h-[600px]">
              <img
                src="../close.svg"
                onClick={() => setModal(false)}
                className="text-primaryDark absolute top-3 right-3 hover:scale-105 hover:rotate-12 duration-300 "
              />
              <div className="flex flex-col gap-10 items-center pt-10">
                <div className="h-32 relative w-32">
                  <>
                    {imagePreview ? (
                      <img
                        className="h-full w-full absolute bottom-0 top-0 left-0 right-0 rounded-full object-cover"
                        src={imagePreview}
                        alt="image preview"
                      />
                    ) : (
                      <>
                        {user.profile_img ? (
                          <img
                            className="h-full w-full absolute bottom-0 top-0 left-0 right-0 rounded-full object-cover"
                            src={user.profile_img}
                            alt={user.name}
                          />
                        ) : (
                          <div className="p-10 h-full w-full rounded-full bg-primaryCoral flex justify-center items-center uppercase font-semibold text-[28px]">
                            {user.name[0]}
                          </div>
                        )}
                      </>
                    )}
                  </>
                </div>
                <label
                  className="pl-1 w-full flex items-center justify-center text-blue-400 cursor-pointer underline "
                  htmlFor="image_uploads"
                >
                  <input
                    onChange={handleFileChange}
                    name="image_uploads"
                    id="image_uploads"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="text-[12px]"
                  />
                </label>
                <button
                  onClick={handleSubmit}
                  className="w-full max-w-[300px] h-10 rounded-[10px] bg-primaryCoral"
                  type="submit"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
        {user && (
          <div className="w-full flex flex-col items-center gap-4">
            <div className="relative h-32 w-32">
              {user.profile_img ? (
                <img
                  className="h-full w-full absolute bottom-0 top-0 left-0 right-0 rounded-full object-cover"
                  src={user.profile_img}
                  alt={user.name}
                />
              ) : (
                <div className="p-10 h-full w-full rounded-full bg-primaryCoral flex justify-center items-center uppercase font-semibold text-[28px]">
                  {user.name[0]}
                </div>
              )}
              <div
                onClick={() => setModal(true)}
                className="absolute hover:scale-125 cursor-pointer group duration-200 bottom-0 left-0 bg-primaryWhite rounded-full flex items-center justify-center shadow-xl h-10 w-10"
              >
                <div className=" group-hover:rotate-6 duration-300 ">
                  <EditSvg height="15px" width="15px" color="#252525" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start">
              <motion.p
                exit={{ opacity: 0, x: 10, transition: { duration: 0.3 } }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
                className="text-[25px] font-semibold "
              >
                Good day, <span className="capitalize ">{user.name}</span>
              </motion.p>
              <p className="text-[14px] text-gray-400  ">{user.email}</p>
            </div>
          </div>
        )}
      </motion.div>
    );
  }
}

Profile.propTypes = {
  session: PropTypes.object,
};
