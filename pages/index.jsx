import Head from "next/head";
import Link from "next/link";
import AppLayout from "../components/AppLayout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Devter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <h1>Devter</h1>
      </AppLayout>

      <style jsx>{``}</style>
    </>
  );
}