import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
import "swiper/swiper-bundle.css";
import styles from "./heroSlider.module.css";
import LazyBackground from "../LazyBackground/LazyBackground";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const MiniSlider = ({ list }) => {
  return (
    <>
      <div
        className={`${styles.minicontainer} heroSlider pc`}
        style={{ marginBottom: "2rem" }}
        dir="rtl"
      >
        <Swiper
          speed={2000}
          spaceBetween={0}
          navigation={false}
          autoplay={true}
          pagination={{ clickable: true }}
        >
          {list &&
            list.map((project, idx) => {
              return (
                <SwiperSlide virtualIndex key={idx}>
                  <LazyBackground
                    className={styles.slide}
                    bgImage={project.pcImage}
                    style={{ height: "60vh" }}
                  ></LazyBackground>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      <div
        className={`${styles.minicontainer} heroSlider mob`}
        style={{ marginBottom: "2rem" }}
      >
        <Swiper
          speed={2000}
          spaceBetween={0}
          slidesPerView={1}
          navigation={false}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
        >
          {list &&
            list.map((project, idx) => {
              return (
                <SwiperSlide virtualIndex key={idx}>
                  <div
                    className={styles.slide}
                    style={{
                      backgroundImage: `url(${project.mobileImage})`,
                      height: "40vh",
                    }}
                  ></div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </>
  );
};
export default MiniSlider;
