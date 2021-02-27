import mainStyle from "../../../../styles/Home.module.css";
import commonStyles from "../../../../components/home/Common.module.css";
import RealStateCard from "../../../../components/Cards/RealStateCard";
import styles from "../../../../components/list/Projects.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const ProjectsListing = ({ lang }) => {
  const router = useRouter();
  const { name, propertyUrl } = router.query;
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (name) {
      async function loadData() {
        const id = window.localStorage.getItem(`${name}-${propertyUrl}`);
        let link =
          "https://swagger.pioneer.city-edge-developments.com/api/Project/ListProject?CityId=" +
          id +
          "&PropertyTypeUrl=" +
          propertyUrl;
        const listProjects = await fetch(link, {
          method: "POST",
          headers: {
            LanguageCode: lang == "ar" ? "ar" : "en",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            pageNumber: page,
            pageSize: 15,
          }),
        });
        const projects = await listProjects.json();
        // setPage(projects.data.paginationCount)
        if (projects.isError) {
          router.push("/404");
        } else {
          setdata(projects.data);
        }
      }
      loadData();
    }
  }, [page, name, lang]);

  return (
    <>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-148363005-1"
          rel="preconnect"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-148363005-1');`,
          }}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '806077823314147');
fbq('track', 'PageView');`,
          }}
        ></script>
        <noscript>
          <img
            height="1"
            width="1"
            style="display:none"
            src="https://www.facebook.com/tr?id=806077823314147&ev=PageView&noscript=1"
          />
        </noscript>
        <title>{data.metatagTitle}</title>
        <meta
          name="description"
          content={data.metatagDescription ? data.metatagDescription : ""}
        />
        <meta name="keywords" content={data.keyword} />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <style jsx>{`
        .cover {
          width: 100%;
          direction: rtl;
          background-image: url(${data.bannerPcImage
            ? data.bannerPcImage
            : ""});
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
        }
        .background {
          padding: 2rem 50px;
          width: 100%;
          height: 100%;
          background-color: rgba(15, 59, 124, 0.7);
        }
        @media (max-width: 786px) {
          .background {
            background-image: url(${data.bannerMobileImage
              ? data.bannerMobileImage
              : ""});

            padding: 5% 5%;
          }
        }
      `}</style>
      <main className={mainStyle.main}>
        <div className={"cover"}>
          <div className={"background"}>
            <div
              className={`${styles.container} ${lang == "en" ? styles.en : ""}`}
            >
              {lang == "ar" ? (
                <h3 className={styles.superTitle}>الرئيسية /</h3>
              ) : (
                <h3 className={styles.superTitle}>Home /</h3>
              )}
              <h1 className={styles.title}>
                {name ? name.replace("-", " ") : ""}
              </h1>
            </div>
          </div>
        </div>
        <div className={commonStyles.RealeStateContainer}>
          <div
            className={`${commonStyles.grid} ${
              lang == "en" ? commonStyles.en : ""
            }`}
          >
            {data.items ? (
              data.items.items &&
              data.items.items.map((project) => (
                <RealStateCard project={project} key={project.id} lang={lang} />
              ))
            ) : (
              <div className="noItems"></div>
            )}
          </div>
        </div>
        {data.items && data.items.totalcount > 1 ? (
          <div
            className={`${commonStyles.swipContainer} ${
              lang == "en" ? commonStyles.en : ""
            }`}
          >
            {data.items.paginationCount != 15 ? (
              <div className={commonStyles.left}>
                <svg viewBox="0 0 20 20" fill="none">
                  <path
                    d="M11.0775 5.24417L6.32167 10L11.0775 14.7558L12.2558 13.5775L8.67833 10L12.2558 6.4225L11.0775 5.24417Z"
                    fill="white"
                  />
                </svg>
              </div>
            ) : (
              <div onClick={() => setPage(page + 1)}>
                <svg viewBox="0 0 20 20" fill="none">
                  <path
                    d="M11.0775 5.24417L6.32167 10L11.0775 14.7558L12.2558 13.5775L8.67833 10L12.2558 6.4225L11.0775 5.24417Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
            {page === 1 ? (
              <div className={`${commonStyles.right} ${commonStyles.active}`}>
                <svg viewBox="0 0 20 20" fill="none">
                  <path
                    d="M11.0775 5.24417L6.32167 10L11.0775 14.7558L12.2558 13.5775L8.67833 10L12.2558 6.4225L11.0775 5.24417Z"
                    fill="white"
                  />
                </svg>
              </div>
            ) : (
              <div
                className={commonStyles.right}
                onClick={() => setPage(page - 1)}
              >
                <svg viewBox="0 0 20 20" fill="none">
                  <path
                    d="M11.0775 5.24417L6.32167 10L11.0775 14.7558L12.2558 13.5775L8.67833 10L12.2558 6.4225L11.0775 5.24417Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};
export default ProjectsListing;
