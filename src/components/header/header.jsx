import Nav from "./nav";

export default function Header() {
  return (
    <div className="w-full bg-red-400 fixed top-0 left-0 right-0 h-[100px]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="">Logo</div>
        <Nav />
        <div className="">Auth Container</div>
      </div>
    </div>
  );
}
