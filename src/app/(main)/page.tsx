import styles from '@/app/(main)/page.module.css';
// import { useSession } from "next-auth/react";

export default function Home() {
  // const { data:session } = useSession();

  return (
    <main>
      {/* Home Section */}
      <section className={styles.container}>
        <div className={styles.text_container}>
          <p className="text-[2rem]">Welcome to</p>
          
          <p className={styles.title}>The Massage Shop</p>

           {/* {
              session ? (
                <h1 className="text-[3rem]">{session.user.name}</h1>
              )
              : null
            } */}
        </div>
      </section>
    </main>
  );
}
