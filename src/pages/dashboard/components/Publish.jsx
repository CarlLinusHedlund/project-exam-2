import MultiStepForm from "./MultiStepForm";

export default function Publish() {
  return (
    <div className=" font-poppins w-full h-fit flex flex-col gap-10 px-5 md:pl-20 pt-10 pb-44 ">
      <h1 className=" font-semibold text-[25px]  ">Publish a venue</h1>
      <MultiStepForm />
    </div>
  );
}
