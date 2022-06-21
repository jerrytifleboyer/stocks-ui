export default function PageNotFound() {
  return (
    <div className="">
      <div className="h-screen w-1/2 fixed top-0 left-0 bg-indigo-300 font-bold flex justify-center items-center text-2xl">
        404, you're drunk..
      </div>
      <div className="flex justify-center items-center flex-col h-screen w-1/2 fixed top-0 right-0 bg-yellow-300">
        <div className="text-2xl font-bold">..have another</div>
        <img src="/images/martini.svg" className="h-1/2" />
        <div className="text-sm">(do you like my drawing)</div>
      </div>
    </div>
  );
}
