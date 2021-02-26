import Head from 'next/head'
import styles from '../projects/Projects.module.css'
import Similiar from '../../components/SimiliarSlider/Similiar';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

const Developer = ({lang}) => {
    const router = useRouter();
    const { url } = router.query;
    const [data, setdata] = useState({});
    const [urllink, seturllink] = useState('');
    const [img, setImg] = useState('');


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        if (url) {
            async function loadData() {
                let link = "https://swagger.pioneer.city-edge-developments.com/api/Developer/GetDeveloper/" + url;
                const DeveloperDestails = await fetch(link, {
                    method: "get",
                    headers: {
                        'LanguageCode': lang == 'ar' ? 'ar' : 'en'
                    }
                })
                const res = await DeveloperDestails.json();
                if (res.isError) {
                    router.push('/404');
                } else {
                    setdata(res.data);
                }
            }
            loadData();
            seturllink(window.location.href);
        }
    }, [url,lang])

    function convert(text) {
        document.querySelector('#text').innerHTML = text;
    }

    useEffect(() => {
        if (data != undefined && data != null) {
            if (Object.keys(data).length != 0 && data.constructor === Object) {
                setImg(data.pcImage)
            }
        }
    }, [data]);

    if (data) {
        return (
            <>
                <Head>
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
                    <title>{data.metatagTitle ? data.metatagTitle : data.url}</title>
                    <meta name="description" content={data.metatagDescription ? data.metatagDescription : ''} />
                    <meta name="keywords" content={data.keyword ? data.keyword : ''} />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="icon" href="/logo.ico" />
                    <meta property="og:url" content={urllink} />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={data.metatagTitle ? data.metatagTitle : data.name} />
                    <meta property="og:description" content={data.metatagDescription ? data.metatagDescription : ''} />
                    <meta property="og:image" content={img ? img : ''} />
                    {
                        !data.isActive  ? 
                        <meta name="robots" content="noindex,nofollow"/>
                        :
                        ''
                    }

                </Head>
                <main className={styles.main} dir={lang == 'ar' ? 'rtl' : 'ltr'}>
                    <div className={`${styles.project_cont} ${styles.dev_cont}`}>
                        <div className={styles.content}>
                            <div className={styles.list_content}>
                                <div id="text"></div>
                                {
                                    data.description && convert(data.description)
                                }
                            </div>
                        </div>
                        <div className={`${styles.aside_container} ${styles.developeraside}`}>
                            <div className={styles.aside}>
                                <div className={styles.devimg}>
                                    <div className={styles.pc}>
                                        <img src={data.pcImage} alt="developer" loading="lazy" />
                                    </div>
                                    <div className={styles.mob}>
                                        <img src={data.mobileImage} alt="developer" loading="lazy" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.similiar}>
                        {
                            lang == 'ar' ? 
                            <h1 className={styles.title}> مشروعات شركة {data.name} </h1>
                            :
                            <h1 className={styles.title}>{data.name} Company projects</h1>
                        }
                        <Similiar list={data.relatedProjects} />
                    </div>
                </main>
            </>
        )
    } else {
        return <></>
    }
}

export default Developer;