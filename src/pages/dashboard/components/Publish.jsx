import MultiStepForm from "./MultiStepForm";

export default function Publish() {
  return (
    <div className=" font-poppins w-full h-fit flex flex-col gap-10 md:pl-20 pt-10 pb-44 ">
      <h1 className=" px-3 font-semibold text-[25px] ">Publish a venue</h1>
      <MultiStepForm />
    </div>
  );
}
