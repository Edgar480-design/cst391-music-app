import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>CST-391 Music API</h1>
        <p>Edgar Mendoza</p>
        <p>Benchmark Milestone 3 - Next.js REST API</p>
        <p>Deployment Platform: Vercel</p>
        <p>Database: PostgreSQL</p>
      </main>
    </div>
  );
}
