import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Redirecting...</title>
        <meta httpEquiv="refresh" content="0;url=/index.html" />
      </Head>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Redirecting to portfolio...
      </div>
    </div>
  );
}