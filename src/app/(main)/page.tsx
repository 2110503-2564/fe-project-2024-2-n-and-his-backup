import styles from '@/app/(main)/page.module.css';
// import { useSession } from "next-auth/react";

export default function Home() {
  // const { data:session } = useSession();

  return (
    <main>
      {/* Home Section */}
      <section className={styles.container}>
        <div className={styles.text_container}>
          <h1 className='text-[3rem]'>Welcome to</h1>

          <h5 className={styles.title}>The Massage Shop</h5>

          {/* {
            session ? (
              <h1 className='text-[4rem]'>{session?.user?.name}</h1>
            ) : null
          } */}
        </div>
      </section>
    </main>
  );
}
