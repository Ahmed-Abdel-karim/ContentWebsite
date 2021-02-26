import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import "swiper/swiper-bundle.css";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
import styles from "./developers.module.css";

const Developers = ({lang, flag}) => {
    const [data, setdata] = useState([]);
    useEffect(() => {
        async function loadData() {
            if (window.localStorage.getItem('devssliderTime') != null) {
                if (new Date(window.localStorage.getItem('devssliderTime')).getMinutes() + 5 < new Date().getMinutes()) {
                    window.localStorage.removeItem('devsslider');
                    window.localStorage.removeItem('devssliderTime');
                }
            }
            if (window.localStorage.getItem('devsslider') != null && !flag) {
                setdata(JSON.parse(window.localStorage.getItem('devsslider')))
            } else {
                const developersList = await fetch('https://swagger.pioneer.city-edge-developments.com/api/Home/ListDeveloper', {
                    method: "get",
                    headers: {
                        'LanguageCode': lang == 'ar' ? 'ar' : 'en'
                    }
                })
                const devs = await developersList.json()
                window.localStorage.setItem('devsslider', JSON.stringify(devs.data));
                window.localStorage.setItem('devssliderTime', new Date());
                setdata(devs.data)
            }
        }

        loadData();
    }, [flag]);
    if (data.length) {
        return (
            <div className={styles.dev}>
                <div className={styles.container}>
                    {/* <h3 className={styles.superTitle}> المطورين العقاريين </h3> */}
                    {
                        lang == 'ar' ?
                            <h2 className={styles.title}> أفضل المطورين العقاريين </h2>
                        :
                            <h2 className={styles.title}>The Best Real Estate Developers</h2>
                    }
                    <div className={styles.sliderContainer}>
                        <Swiper
                            autoplay={{ delay: 2000, disableOnInteraction: true }}
                            spaceBetween={25}
                            speed={2000}
                            slidesPerView={"auto"}
                            navigation={false}
                            loop
                        >
                            {
                                data.map((dev) => {
                                    return (
                                        <SwiperSlide style={{ width: "auto" }} key={dev.id} >
                                            <Link href={`/developer/${dev.url}`} target="_blank">
                                                <a>
                                                    <div className={styles.slide} title={dev.url}>
                                                        {
                                                            dev.logoUrl ?
                                                                <img
                                                                    className={styles.devImage}
                                                                    alt={dev.url}
                                                                    src={dev.logoUrl}
                                                                    loading="lazy"
                                                                /> :
                                                                <div className={styles.undevbg}></div>
                                                        }
                                                    </div>
                                                </a>
                                            </Link>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        )
    } else {
        return <></>
    }
};

export default Developers;