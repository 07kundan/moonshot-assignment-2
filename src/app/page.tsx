import dbConnect from "../lib/dbConnect";

export default function Home() {
  const res = dbConnect();
  // console.log(res);
  return <div className="">hello</div>;
}
