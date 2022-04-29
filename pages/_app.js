import "../styles/globals.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import "aos/dist/aos.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Head from "next/head";
import axios from "axios";
import Image from "next/image";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
// import PreLoader from './../Assets/preloader.gif'
import "next-pagination/dist/index.css";
import { withRouter } from "next/router";
import PreLoader from "./../Assets/preloader.gif";
// import Loading from './Loading'
// import Script from "next/script"
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const delay = 1;
function MyApp({
  Component,
  pageProps,
  data,
  testimonial,
  latestBlogs,
  tags,
  categories,
  about,
  serverSideMetaTags,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const updateLoadingStatus = () => setIsLoading(!isLoading);

    Router.events.on("routeChangeStart", updateLoadingStatus);
    Router.events.on("routeChangeComplete", updateLoadingStatus);

    return () => {
      Router.events.off("routeChangeStart", updateLoadingStatus);
      Router.events.off("routeChangeComplete", updateLoadingStatus);
    };
  }, [isLoading]);
  // useEffect(() => {
  //   const handleStart = (url) => {
  //     url !== Router.pathname ? setIsLoading(true) : setIsLoading(false);
  //   };
  //   const handleComplete = (url) => setIsLoading(false);

  //   Router.events.on("routeChangeStart", handleStart);
  //   Router.events.on("routeChangeComplete", handleComplete);
  //   Router.events.on("routeChangeError", handleComplete);
  // }, [Router]);

  // useEffect(() => {
  //   const handleRouteChangeError = (err, url) => {
  //     if (err.cancelled) {
  //       console.log(`Route to ${url} was cancelled!`)
  //     }
  //   }

  //   router.events.on('routeChangeError', handleRouteChangeError)

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off('routeChangeError', handleRouteChangeError)
  //   }
  // }, [])

  useEffect(
    () => {
      let timer1 = setTimeout(() => setShow(true), delay * 380);

      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        clearTimeout(timer1);
      };
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // than clearTimeout will run every time
    // this value changes (useEffect re-run)
    // "homepage": "https://www.massinteract.com/",
    // "homepage": "https://webprojectmockup.com/mass/",
    []
  );
  console.log(pageProps);
  const memoizedHeader = useMemo(() => <Header />, []);
  const memoizedFooter = useMemo(() => <Footer />, []);

  return (
    <div>
      <Head>
        {pageProps?.json[0]?.schema_structure}
        <title>{pageProps?.json[0]?.title}</title>
        <meta charset="UTF-8" />
        <meta name="theme-color" />
        <meta name="robots" content={pageProps?.json[0]?.robot} />
        <meta name="title" content={pageProps?.json[0]?.title} />
        <meta httpEquiv="content-language" content="en" />
        <meta name="keywords" content={pageProps?.json[0]?.keywords} />
        <meta name="title" content={pageProps?.json[0]?.title} />
        <meta name="description" content={pageProps?.json[0]?.description} />
        <meta name="url" content={pageProps?.json[0]?.url} />
        <meta name="author" content={pageProps?.json[0]?.author} />

        <meta property="og:title" content={pageProps?.json[0]?.og_title} />
        <meta property="og:type" content={pageProps?.json[0]?.og_type} />
        <meta property="og:url" content={pageProps?.json[0]?.og_url} />
        <meta property="og:image" content={pageProps?.json[0]?.og_image} />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="canonical" href={pageProps?.json[0]?.canonical} />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
        {pageProps?.json[0]?.hdr}
      </Head>

      {/* {serverSideMetaTags?.data[0]?.hdr} */}
      {/* {serverSideMetaTags?.data[0]?.hdr} */}
      {/* <Script strategy="afterInteractive" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" /> */}
      {!show || isLoading ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 300 }}
        >
          <Image src={PreLoader} />
        </div>
      ) : (
        <>
          {memoizedHeader}
          <Component
            brands={data}
            test={testimonial}
            lBlog={latestBlogs}
            Tag={tags}
            Category={categories}
            Abouts={about}
            {...pageProps}
          />
          {pageProps?.json[0]?.ftr}
          {memoizedFooter}
        </>
      )}
    </div>
  );
}

MyApp.getInitialProps = async (context) => {
  // console.log(context)
  // console.log("route>>>>", context.router);
  const res = await fetch(
    "https://webprojectmockup.com/custom/mass_interact/public/api/get_clients"
  );
  const json = await res?.json();
  const ress = await fetch(
    "https://webprojectmockup.com/custom/mass_interact/public/api/get_testinomials"
  );
  const jsonn = await ress?.json();
  const resss = await fetch(
    "https://webprojectmockup.com/custom/mass_interact/public/api/latest_blogs"
  );
  const jsonss = await resss?.json();
  const ressss = await fetch(
    "https://webprojectmockup.com/custom/mass_interact/public/api/get_tags"
  );
  const jsonsss = await ressss?.json();
  const resssss = await fetch(
    "https://webprojectmockup.com/custom/mass_interact/public/api/get_category"
  );
  const jsonssss = await resssss?.json();
  const ressssss = await fetch(
    "https://webprojectmockup.com/custom/mass_interact/public/api/about"
  );
  const jsonsssss = await ressssss?.json();
  // const server_side_meta_tags_response = await axios.post(
  //   `https://webprojectmockup.com/custom/mass_interact/public/api/get_metatags`,
  //   { url: context.router.pathName }
  // );
  // const server_side_meta_tags = await server_side_meta_tags_response?.json();

  return {
    data: json.data,
    testimonial: jsonn,
    latestBlogs: jsonss,
    tags: jsonsss,
    categories: jsonssss,
    about: jsonsssss,
    // serverSideMetaTags: server_side_meta_tags,
  };
};

export default withRouter(MyApp);
