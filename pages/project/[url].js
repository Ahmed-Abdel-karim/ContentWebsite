import styles from "../projects/Projects.module.css";
import breadcrump from "../../components/list/Projects.module.css";
import CollapseDev from "../../components/Cards/CollapseDev";
import MiniSlider from "../../components/sliders/MiniSlider";
import Similiar from "../../components/SimiliarSlider/Similiar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function project({ lang }) {
  const router = useRouter();
  const { url } = router.query;
  const [data, setdata] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [urllink, seturllink] = useState("");
  const [img, setImg] = useState("");
  const [localphone, setLocalphone] = useState("");

  const [err, seterr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState({ type: "", msg: "" });
  const [month, setMonth] = useState();

  const monthNamesEn = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthNamesAr = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name != "") {
      if (phone.match(/^\d+$/) && phone.length > 10) {
        if (
          email.match(
            /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
          )
        ) {
          if (message != "") {
            fetch(
              "https://swagger.pioneer.city-edge-developments.com/api/Home/ContactUsForm",
              {
                method: "POST",
                body: JSON.stringify({
                  name: name,
                  email: email,
                  phone: phone,
                  message: message,
                }),
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                },
              }
            )
              .then((res) => res.json())
              .then((da) => {
                if (!da.isError) {
                  setSuccess(true);
                  setName("");
                  setPhone("");
                  setEmail("");
                  setMessage("");
                  setTimeout(() => {
                    setSuccess(false);
                  }, 2000);
                  // document.getElementById("BlogForm").reset();
                } else {
                  seterr(true);
                  setTimeout(() => {
                    seterr(false);
                  }, 2000);
                }
              });
          } else {
            seterr(true);
            setErrMsg({
              type: "msg",
              msg: lang == "ar" ? "خطأ فى بيانات الرسالة" : "invaild message",
            });
            setTimeout(() => {
              seterr(false);
            }, 2000);
          }
        } else {
          seterr(true);
          setErrMsg({
            type: "mail",
            msg: lang == "ar" ? "خطأ فى بيانات الأيميل" : "invalid e-mail",
          });
          setTimeout(() => {
            seterr(false);
          }, 2000);
        }
      } else {
        seterr(true);
        setErrMsg({
          type: "phone",
          msg: lang == "ar" ? "خطأ فى بيانات الهاتف" : "invaild phone number",
        });
        setTimeout(() => {
          seterr(false);
        }, 2000);
      }
    } else {
      seterr(true);
      setErrMsg({
        type: "name",
        msg: lang == "ar" ? "خطأ فى بيانات الاسم" : "invaild name",
      });
      setTimeout(() => {
        seterr(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.push("/thankyou");
      }, 1500);
    }
  }, [success]);

  useEffect(() => {
    const x = window.localStorage.getItem("phone");
    setLocalphone(x);
  }, []);

  useEffect(() => {
    if (url) {
      async function loadData() {
        let link = `https://swagger.pioneer.city-edge-developments.com/api/Project/GetProject/${url}`;
        const projectData = await fetch(link, {
          method: "get",
          headers: {
            LanguageCode: lang == "ar" ? "ar" : "en",
          },
        });
        const project = await projectData.json();

        if (project.isError) {
          router.push("/404");
        } else {
          setdata(project.data);
        }
      }
      loadData();
      seturllink(window.location.href);
    }
  }, [url, lang]);

  let convert = (text, id) => {
    if (document.querySelector(`#${id}`)) {
      document.querySelector(`#${id}`).innerHTML = text;
    }
  };

  useEffect(() => {
    if (data != undefined && data != null) {
      if (Object.keys(data).length != 0 && data.constructor === Object) {
        data.descriptionList.map((item, idx) => {
          convert(item.description, `item_${idx}`);
        });
        setImg(data.gallery[0].pcImage);
        setMonth(parseInt(data.modifiedDate.split("-")[1]));
      }
    }
  }, [data]);

  const chunk = (str, n) => {
    let len = "";
    len = str;
    for (let i = len.length - n; i > 0; i -= n) {
      len = [len.slice(0, i), ".", len.slice(i)].join("");
    }
    return len;
  };

  if (data) {
    const whatssApp = () => {
      window.open(
        `https://api.whatsapp.com/send?phone=2${data.whatsNumer}&text=${
          lang == "en"
            ? "Hello I have an inquiry about"
            : "مرحبا لدي استفسار عن"
        } ${url}`
      );
    };
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
          <title>{data.metatagTitle ? data.metatagTitle : data.name}</title>
          <meta
            name="description"
            content={data.metatagDescription ? data.metatagDescription : ""}
          />
          <meta name="keywords" content={data.keyword} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/logo.ico" />
          <meta property="og:url" content={urllink} />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content={data.metatagTitle ? data.metatagTitle : data.name}
          />
          <meta
            property="og:description"
            content={data.metatagDescription ? data.metatagDescription : ""}
          />
          <meta property="og:image" content={img ? img : ""} />
          {!data.isActive ? (
            <meta name="robots" content="noindex,nofollow" />
          ) : (
            ""
          )}
        </Head>
        <main className={styles.main} dir={lang == "ar" ? "rtl" : "ltr"}>
          <div className="cover">
            <div className={breadcrump.background}>
              <div
                className={`${breadcrump.container} ${
                  lang == "en" ? breadcrump.en : ""
                }`}
              >
                {lang == "ar" ? (
                  <h3 className={breadcrump.superTitle}>
                    الرئيسية /{data.breadCrump && data.breadCrump.cityName}
                  </h3>
                ) : (
                  <h3 className={breadcrump.superTitle}>
                    Home /{data.breadCrump && data.breadCrump.cityName}
                  </h3>
                )}
                <h1 className={breadcrump.title}>{data.name}</h1>
              </div>
            </div>
          </div>
          <div className={styles.project_cont}>
            <div
              className={`${styles.content} ${lang == "en" ? styles.en : ""}`}
            >
              <div className={styles.slider}>
                <MiniSlider list={data.gallery} />
              </div>
              {lang == "ar" ? (
                <div className={styles.header}>بيانات المشروع</div>
              ) : (
                <div className={styles.header}>Project Details</div>
              )}
              <table
                className={`${styles.info_table} ${
                  lang == "en" ? styles.en : ""
                }`}
              >
                {/* map */}
                <tbody>
                  <tr>
                    {lang == "ar" ? (
                      <td className={styles.listing_title}>اسم المشروع</td>
                    ) : (
                      <td className={styles.listing_title}>Project Name</td>
                    )}
                    <td>{data.name}</td>
                  </tr>
                  <tr>
                    {lang == "ar" ? (
                      <td className={styles.listing_title}>المطور</td>
                    ) : (
                      <td className={styles.listing_title}>Developer</td>
                    )}
                    <td>{data.developerName}</td>
                  </tr>
                  <tr>
                    {lang == "ar" ? (
                      <td className={styles.listing_title}>موقع المشروع</td>
                    ) : (
                      <td className={styles.listing_title}>Location</td>
                    )}
                    <td>{data.location}</td>
                  </tr>
                  <tr>
                    {lang == "ar" ? (
                      <td className={styles.listing_title}>مساحات المشروع</td>
                    ) : (
                      <td className={styles.listing_title}>Project Size</td>
                    )}
                    <td>{data.size}</td>
                  </tr>
                  <tr>
                    {lang == "ar" ? (
                      <td className={styles.listing_title}>أنواع الوحدات</td>
                    ) : (
                      <td className={styles.listing_title}>Types Of Units</td>
                    )}
                    <td>{data.propertyType}</td>
                  </tr>
                  <tr>
                    {lang == "ar" ? (
                      <td className={styles.listing_title}>أسعار تبدأ من</td>
                    ) : (
                      <td className={styles.listing_title}>
                        Prices Starts From
                      </td>
                    )}
                    <td>{data.price}</td>
                  </tr>
                </tbody>
              </table>
              <div
                className={`${styles.list_table} ${
                  lang == "en" ? styles.en : ""
                }`}
              >
                {lang == "ar" ? <h3>المحتوى</h3> : <h3>Content</h3>}
                <div className={styles.links_container}>
                  {data.indexes &&
                    data.indexes.map((item, idx) => (
                      <a href={`#${item.replace(" ", "_")}`} key={idx}>
                        {item}
                      </a>
                    ))}

                  {lang == "ar" ? (
                    <a href="#تواصل_معنا">تواصل معنا</a>
                  ) : (
                    <a href="#contact_us">Contact Us</a>
                  )}

                  {/*
                                        data.projectServices && data.projectServices.map((item, idx) => (
                                            <a href={`#${item.tilte.replace(' ', '_')}`} key={idx}>{item.tilte}</a>
                                        ))

                                    */}
                </div>
              </div>
              <div className={styles.list_content}>
                {data.descriptionList &&
                  data.descriptionList.map((item, idx) => (
                    <div
                      className={(styles.list_content_item, "spacesofpraghph")}
                      key={idx}
                      id={`${item.tilte.replace(" ", "_")}`}
                    >
                      <h2>
                        <strong>{item.tilte}</strong>
                      </h2>
                      <p id={`item_${idx}`}>
                        {/* {item.description ? convert(item.description, `item_${idx}`) : <></>} */}
                      </p>
                    </div>
                  ))}
                {lang == "ar" ? (
                  <div className={styles.list_content_item} id="تواصل_معنا">
                    <h2>
                      <strong>تواصل معنا</strong>
                    </h2>
                    <p>
                      إتصل الان:{" "}
                      <span className={styles.span}>
                        <a href={`tel:${data.phone}`}>{data.phone}</a>
                      </span>
                      <br />
                      او عبر الواتساب من
                      <span className={styles.span} onClick={whatssApp}>
                        {" "}
                        هنا{" "}
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className={styles.list_content_item} id="contact_us">
                    <h2>
                      <strong>Contact Us</strong>
                    </h2>
                    <p>
                      Call us now:{" "}
                      <span className={styles.span}>
                        <a href={`tel:${data.phone}`}>{data.phone}</a>
                      </span>
                      <br />
                      or using whatsApp from{" "}
                      <span className={styles.span} onClick={whatssApp}>
                        {" "}
                        here{" "}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              <div className="share">
                {lang == "ar" ? <h3>شارك</h3> : <h3 className="h_en">Share</h3>}
                <div className="share_contaier">
                  <Link href={`https://www.facebook.com/sharer.php?u=${url}`}>
                    <a target="_blank">
                      <svg height="20" viewBox="0 0 11 20" fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.94475 20V11.1658H0V7.48482H2.94475V4.54007C2.94475 1.49741 4.87135 0 7.58567 0C8.88578 0 10.0033 0.0971768 10.3287 0.139876V3.3202L8.44628 3.32094C6.97022 3.32094 6.62568 4.02253 6.62568 5.05172V7.48482H10.3066L9.57043 11.1658H6.62568L6.68458 20"
                          fill="#4867AA"
                        />
                      </svg>
                    </a>
                  </Link>
                  <Link
                    href={`https://www.linkedin.com/shareArticle?url=${url}&title=${
                      data.metatagTitle ? data.metatagTitle : data.name
                    }`}
                  >
                    <a target="_blank">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.364 18.3333H14.9041V12.9197C14.9041 11.6286 14.8822 9.96792 13.1063 9.96792C11.3064 9.96792 11.0316 11.3749 11.0316 12.8271V18.3333H7.57532V7.20059H10.8923V8.72277H10.9397C11.4012 7.84723 12.5297 6.9243 14.213 6.9243C17.7166 6.9243 18.364 9.22944 18.364 12.2279V18.3333ZM3.67438 5.67988C2.56263 5.67988 1.66668 4.781 1.66668 3.67291C1.66668 2.56554 2.56263 1.66667 3.67438 1.66667C4.78102 1.66667 5.67989 2.56554 5.67989 3.67291C5.67989 4.781 4.78102 5.67988 3.67438 5.67988ZM5.40505 18.3333H1.94152V7.20059H5.40505V18.3333Z"
                          fill="#0e76a8"
                        />
                      </svg>
                    </a>
                  </Link>
                  <Link
                    href={`https://twitter.com/share?url=${url}&text=${
                      data.metatagTitle ? data.metatagTitle : data.name
                    }`}
                  >
                    <a target="_blank">
                      <svg height="20" viewBox="0 0 25 20" fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M24.8395 2.3676C23.9341 2.76955 22.9611 3.04025 21.9398 3.16227C22.9816 2.53781 23.7824 1.54832 24.1597 0.369136C23.1846 0.948475 22.1038 1.36785 20.9534 1.59549C20.0326 0.613176 18.7201 0 17.2682 0C14.4801 0 12.2192 2.26096 12.2192 5.04896C12.2192 5.44476 12.2643 5.8303 12.3504 6.19944C8.15459 5.98923 4.43349 3.97949 1.94388 0.923866C1.50912 1.67034 1.25995 2.53679 1.25995 3.4627C1.25995 5.21405 2.151 6.76032 3.50655 7.66573C2.67907 7.63804 1.89978 7.41143 1.21893 7.03409V7.09664C1.21893 9.54319 2.959 11.5837 5.26918 12.0472C4.8457 12.1641 4.39863 12.2246 3.93926 12.2246C3.61319 12.2246 3.29737 12.1928 2.98874 12.1343C3.63165 14.14 5.49579 15.6001 7.70548 15.6411C5.97669 16.9946 3.79981 17.8016 1.43529 17.8016C1.02719 17.8016 0.625239 17.778 0.230469 17.7319C2.46477 19.1633 5.11845 20 7.97002 20C17.2569 20 22.3345 12.3066 22.3345 5.63445C22.3345 5.41605 22.3294 5.19867 22.3202 4.98231C23.3066 4.26967 24.1628 3.38067 24.8395 2.3676Z"
                          fill="#00ACEE"
                        />
                      </svg>
                    </a>
                  </Link>
                  <Link
                    href={`https://wa.me/?text=${
                      data.metatagTitle ? data.metatagTitle : data.name
                    } ${url}`}
                  >
                    <a target="_blank">
                      <svg height="20" viewBox="0 0 21 20" fill="none">
                        <path
                          d="M17.3281 2.90625C15.4569 1.03125 12.9681 0 10.3169 0C4.85562 0 0.410625 4.445 0.410625 9.91C0.410625 11.6562 0.868125 13.3637 1.73438 14.8637L0.328125 20L5.58187 18.6213C7.03062 19.41 8.66063 19.8288 10.3156 19.8288H10.3194C15.7806 19.8288 20.2294 15.3837 20.2294 9.91875C20.2294 7.27 19.1981 4.7825 17.3269 2.9075L17.3281 2.90625ZM10.3194 18.1562C8.83938 18.1562 7.38938 17.7575 6.12438 17.0075L5.82312 16.8275L2.70563 17.6437L3.53813 14.605L3.34313 14.2925C2.51438 12.9837 2.08187 11.4688 2.08187 9.91C2.08187 5.3675 5.77688 1.67125 10.3244 1.67125C12.5231 1.67125 14.5944 2.53125 16.1481 4.085C17.7031 5.64375 18.5581 7.71 18.5581 9.9125C18.5544 14.4587 14.8594 18.155 10.3194 18.155V18.1562ZM14.8356 11.985C14.5894 11.86 13.3706 11.2625 13.1444 11.18C12.9181 11.0975 12.7531 11.055 12.5856 11.305C12.4219 11.5512 11.9456 12.11 11.8006 12.2775C11.6556 12.4412 11.5119 12.465 11.2656 12.34C11.0194 12.215 10.2181 11.9537 9.27312 11.11C8.53813 10.4537 8.03937 9.64125 7.89437 9.395C7.74937 9.14875 7.87813 9.0125 8.00438 8.89125C8.11813 8.78125 8.25063 8.6025 8.37563 8.4575C8.50063 8.3125 8.53938 8.21125 8.62188 8.04375C8.70438 7.88 8.66438 7.735 8.60188 7.61C8.53938 7.485 8.04313 6.26625 7.84063 5.77C7.64188 5.285 7.43438 5.3525 7.28188 5.34375C7.13688 5.33625 6.97312 5.33625 6.80937 5.33625C6.64562 5.33625 6.37563 5.39875 6.14937 5.645C5.92312 5.89125 5.28188 6.4925 5.28188 7.71125C5.28188 8.93 6.16813 10.1063 6.29313 10.2738C6.41813 10.4375 8.03937 12.9412 10.5231 14.0125C11.1131 14.2662 11.5744 14.4187 11.9331 14.5362C12.5269 14.7237 13.0656 14.6962 13.4919 14.6337C13.9681 14.5638 14.9569 14.0362 15.1644 13.4575C15.3719 12.8787 15.3719 12.3837 15.3094 12.2812C15.2506 12.1713 15.0869 12.11 14.8369 11.9837L14.8356 11.985Z"
                          fill="#25D366"
                        />
                      </svg>
                    </a>
                  </Link>
                </div>
              </div>
              <div className={styles.questions}>
                <CollapseDev list={data.projectServices} lang={lang} />
              </div>
            </div>

            <div className={styles.aside_container}>
              <div
                className={`${styles.aside} ${lang == "en" ? styles.en : ""}`}
              >
                <Link href={`tel:${localphone}`}>
                  <a className={styles.phone}>
                    <span>{localphone}</span>
                    <svg height="24" viewBox="0 0 23 24" fill="none">
                      <path
                        d="M17.1713 1C18.6864 1 20.8901 2.67545 21.441 3.79242C22.2284 5.38881 22.0984 6.01595 21.5787 7.70182C20.8901 9.93576 18.871 13.8955 16.0695 16.6376C12.0753 20.547 8.35662 22.2224 6.70386 22.7809C5.0511 23.3394 3.26061 22.7809 2.15877 21.6639C1.05693 20.547 -0.0449104 19.43 1.19466 17.7545C2.07304 16.5673 3.35263 15.1947 4.91337 14.4036C6.33252 13.6843 7.17828 13.9461 7.66797 14.9621C7.93868 15.5238 8.02276 16.5996 8.21889 17.1961C8.46634 17.9486 9.45846 17.7545 10.5603 17.1961C11.6152 16.6614 14.279 14.4036 16.4827 11.0527C17.848 8.97661 15.6657 8.96315 14.279 8.2603C13.1772 7.70182 12.8356 6.41728 13.7281 4.90939C15.3809 2.11697 15.9318 1 17.1713 1Z"
                        fill="#E0E0E0"
                        stroke="black"
                        strokeWidth="0.0833333"
                      />
                    </svg>
                  </a>
                </Link>
                <div className={styles.prices}>
                  <p className={styles.title}>
                    {lang == "ar" ? "أسعار تبدأ من" : "Prices start from"}
                  </p>
                  <p className={styles.price}>
                    {data.price && chunk(data.price, 3)}
                  </p>
                  <p className={styles.date}>
                    {lang == "ar" ? "أخر تحديث" : "Last update"}
                    &nbsp;
                    {data.modifiedDate &&
                      data.modifiedDate.split("-")[2].substring(0, 2)}
                    &nbsp;
                    {data.modifiedDate && month != null
                      ? lang == "ar"
                        ? monthNamesAr[month - 1]
                        : monthNamesEn[month - 1]
                      : ""}
                    &nbsp;
                    {data.modifiedDate && data.modifiedDate.split("-")[0]}
                  </p>
                </div>
                <form onSubmit={handleSubmit} id="ProForm">
                  <h3>{lang == "ar" ? "تواصل معنا" : "Contact Us"}</h3>
                  <div className="errmsg form">
                    <input
                      required
                      type="text"
                      id="firstName"
                      className={styles.input}
                      placeholder={`${lang == "ar" ? "الاسم" : "Name"}`}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {err && errMsg.type == "name" ? (
                      <span>{errMsg.msg}</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="errmsg form">
                    <input
                      required
                      type="text"
                      id="phone"
                      className={styles.input}
                      placeholder={`${lang == "ar" ? "الموبيل" : "Phone"}`}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {err && errMsg.type == "phone" ? (
                      <span>{errMsg.msg}</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="errmsg form">
                    <input
                      required
                      type="email"
                      id="mail"
                      className={styles.input}
                      placeholder={`${
                        lang == "ar" ? "البريد الإلكترونى" : "E-mail"
                      }`}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {err && errMsg.type == "mail" ? (
                      <span>{errMsg.msg}</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="errmsg form">
                    <textarea
                      required
                      name="mes"
                      id="mes"
                      placeholder={`${
                        lang == "ar" ? "أكتب لنا إستفسارك" : "Tell us more"
                      }`}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    {err && errMsg.type == "msg" ? (
                      <span>{errMsg.msg}</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={styles.btnContainer}>
                    {err ? (
                      <p className="err">
                        {lang == "ar" ? "خطأ فى البيانات" : "Data error"}
                      </p>
                    ) : success ? (
                      <svg
                        className="checkmark"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 52 52"
                      >
                        <circle
                          className="checkmark__circle"
                          cx="26"
                          cy="26"
                          r="25"
                          fill="none"
                        />
                        <path
                          className="checkmark__check"
                          fill="none"
                          d="M14.1 27.2l7.1 7.2 16.7-16.8"
                        />
                      </svg>
                    ) : (
                      <button className={styles.button_cont} type="submit">
                        {lang == "ar" ? "ارسال" : "Send"}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className={styles.similiar}>
            {lang == "ar" ? (
              <>
                <h3 className={styles.superTitle}>
                  تصفح المشاريع الاكثر شعبية لدينا
                </h3>
                <h4 className={styles.title}> اشهر المناطق </h4>
              </>
            ) : (
              <>
                <h3 className={styles.superTitle}>
                  Browse our most popular projects
                </h3>
                <h4 className={styles.title}> The Most Famous Areas </h4>
              </>
            )}

            <Similiar list={data.relatedProjects} lang={lang} />
          </div>
        </main>
        <style jsx>{`
          .cover {
            width: 100%;
            direction: rtl;
            background-image: url("${data.breadCrump
              ? data.breadCrump.pcImage
              : "/"}");
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
          }
          @media screen and (max-width: 786px) {
            .cover {
              background-image: url("${data.breadCrump
                ? data.breadCrump.mobileImage
                  ? data.breadCrump.pcImage
                  : data.breadCrump.pcImage
                  ? data.breadCrump.pcImage
                  : "/"
                : "/"}");
            }
          }
        `}</style>
      </>
    );
  } else {
    return <></>;
  }
}
