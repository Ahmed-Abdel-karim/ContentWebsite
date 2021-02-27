import Button from "../components/Button/Button";
import Head from "next/head";
const Thankyou = ({ lang }) => {
  return (
    <div id="notfound">
      <Head>
        <title>Thanks</title>
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
      </Head>
      {lang == "ar" ? (
        <div className="notfound">
          <div>
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
          </div>
          <h1>شكرا لتسجيل بياناتك</h1>
          <p>سيقوم ممثلى خدمة العملاء بالتواصل معكم فى أسرع وقت</p>
          <br />
          <Button path="/" text="العودة الى الرئيسية" />
        </div>
      ) : (
        <div className="notfound en" dir="ltr">
          <div>
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
          </div>
          <h1>Thanks For Registering Your Details</h1>
          <p>
            Customer service representatives will contact you as soon as
            possible
          </p>
          <br />
          <Button path="/" text="Go To Homepage" />
        </div>
      )}
    </div>
  );
};
export default Thankyou;
