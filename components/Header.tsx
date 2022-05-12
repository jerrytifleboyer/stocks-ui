export default function Header({ content }: string) {
  return (
    <>
      <header className="flex justify-center items-center font-bold text-xl underline p-2">
        {content}
      </header>
      <hr className="mb-2" />
    </>
  );
}
