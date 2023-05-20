import { supabase } from "../../utils/Supabase";

export default function SignOut() {
  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    location.reload();
  };

  return (
    <div onClick={signOutHandler} className="animate flex gap-2 ">
      <img src="../signout.svg" alt="signout" />
      <p className="text-[#A7A7A7] md:text-primaryDark">Sign out</p>
    </div>
  );
}
