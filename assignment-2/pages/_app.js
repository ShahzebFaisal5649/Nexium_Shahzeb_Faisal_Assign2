// pages/_app.js
import { ToastProvider } from "@/components/ui/toast";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import "@/styles/components.css"; // Add this line

export default function App({ Component, pageProps }) {
  return (
    <ToastProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ToastProvider>
  );
}
