import Head from 'next/head'
import styles from '../styles/Home.module.css'

import HeroSlider from "../components/sliders/HeroSlider";
import HomeProRealState from "../components/home/HomeProRealState";
import HomeRealState from "../components/home/HomeRealState";
import HomeRealState2 from "../components/home/HomeRealState2";
import Developers from '../components/sliders/Developers';
import UsCard from "../components/Cards/UsCard";
import UsSection from "../components/Cards/UsSection";
import HomeBlogs from "../components/home/HomeBlogs";

const Home = ({lang, flag}) => {

  return (
    
    <div className={styles.container}>

     { lang=='ar'?
      <Head>
        <title>بايونير العقارية - شاليهات وشقق وفيلات ومكاتب للبيع</title>
        <meta name="description" content="تسويق وبيع شاليهات وشقق وفيلات (الساحل الشمالي - العين السخنة - العاصطة الادارية - القاهرة الجديدة - 6أكتوبر - المنصورة الجديدة)" />
        <meta name="keywords" content="" />
        <link rel="icon" href="/logo.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-148363005-1"></script>
<script dangerouslySetInnerHTML={{
              __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-148363005-1');`
}}
>
</script>
<script dangerouslySetInnerHTML={{
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
fbq('track', 'PageView');`}}>
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=806077823314147&ev=PageView&noscript=1"
/></noscript>
        </Head>
      :
      <Head>
        <title>pionner</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <link rel="icon" href="/logo.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* 
                    <meta name="description" content="" />
                    <meta name="keywords" content="" />
         */}

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-148363005-1"></script>
<script dangerouslySetInnerHTML={{
              __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-148363005-1');`
}}
>
</script>
<script dangerouslySetInnerHTML={{
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
fbq('track', 'PageView');`}}>
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=806077823314147&ev=PageView&noscript=1"
/></noscript>
      </Head>
}


      <main className={styles.main}>

        <HeroSlider lang={lang} flag={flag} />

        <HomeProRealState lang={lang} flag={flag} />

        <HomeRealState lang={lang} flag={flag} />

        <HomeRealState2 lang={lang} flag={flag} />

        {/* just in case , slice the the first 6 blogs in the array */}
        <HomeBlogs lang={lang} flag={flag} />

        <UsSection lang={lang} flag={flag} />

        <UsCard lang={lang} flag={flag} />

        <Developers lang={lang} flag={flag} />
      </main>
    </div>
  )
}

// export async function getServerSideProps(context) {
//   const res = await fetch(`https://swagger.pioneer.city-edge-developments.com/api/Slider/ListSliders`)
//   const data = await res.json()

//   return {
//     props: {
//       Sliders : data.data
//     }
//   }
// }


export default Home;