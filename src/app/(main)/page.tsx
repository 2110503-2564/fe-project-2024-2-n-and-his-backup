const textShadow = {textShadow: "2.5px 4px 0px black"}

export default function Home() {
  return (
    <main>
      {/* Home Section */}
      <section className="flex justify-start items-center relative min-h-[100vh]">
        <div style={textShadow} className="relative z-10 pl-[5rem] text-(--color-text-light)">
          <h5 className="font-bold text-3xl">Welcome to</h5>
          <h1 className="font-bold text-[4rem]">The Massage Shop</h1>
        </div>
      </section>
    </main>
  );
}
