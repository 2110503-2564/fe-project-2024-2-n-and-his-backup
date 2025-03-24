import styles from '@/app/(main)/page.module.css';
// import { useSession } from "next-auth/react";

export default function Home() {
  // const { data:session } = useSession();

  return (
    <main className="h-full pt-0">
      {/* Home Section */}
<<<<<<< HEAD
      <section className={styles.container}>
        <div className={styles.text_container}>
          <h1 className='text-[3rem]'>Welcome to</h1>

          <h5 className={styles.title}>The Massage Shop</h5>

          {/* {
            session ? (
              <h1 className='text-[4rem]'>{session?.user?.name}</h1>
            ) : null
          } */}
=======
      <section className="flex justify-start items-center relative h-full">
        <div style={textShadow} className="relative z-10 pl-[5rem] text-(--color-text-light)">
          <h5 className="font-bold text-3xl">Welcome to</h5>
          <h1 className="font-bold text-[4rem]">The Massage Shop</h1>
>>>>>>> 75b941a1390b1686410a336aa3f60a013f28408f
        </div>
      </section>
    </main>
  );
}
