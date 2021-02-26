import React from "react";
import Link from "next/link";
import styles from "./SimiliarSlider.module.css";
import realstyle from "../Cards/RealStateCard.module.css";
import { Mobile } from "../MediaQuery/MediaQuery";
import LazyBackground from "../LazyBackground/LazyBackground";


const Similiar = ({ list, lang }) => {
  const chunk = (str, n) => {
    let len = "";
    len = str;
    for (let i = len.length - n; i > 0; i -= n) {
      len = [len.slice(0, i), ".", len.slice(i)].join("");
    }
    return len;
  };

  return (
    <LazyBackground className={styles.dev} bgImage={"/graybg.webp"} >
      <div className={styles.container}>
        <div className={styles.sliderContainer}>
          {list &&
            list.map((dev, idx) => {
              return (
                <div className={realstyle.RealeStateCard} key={idx}>
                  <a href={`/project/${dev.url}`}>
                    <div className={realstyle.RealeStateWrapper}>
                      <Desktop>
                        <div className="pc">
                          <img
                            className={realstyle.RealeStateImg}
                            src={dev.pcImage}
                            loading="lazy"
                          />
                        </div>
                      </Desktop>
                      <Mobile>
                        <div className="mob">
                          <img
                            className={realstyle.RealeStateImg}
                            src={
                              dev.mobileImage ? dev.mobileImage : dev.pcImage
                            }
                            loading="lazy"
                          />
                        </div>
                      </Mobile>
                    </div>
                  </a>
                  <div className={realstyle.RealeStateTag}>
                    <Link
                      href={`/projects/${dev.propertyUrl}/${
                        dev.cityName
                          ? dev.cityName.replace(" ", "-")
                          : dev.name.replace(" ", "-")
                      }`}
                    >
                      <h3 className={realstyle.RealeStateCity}>
                        <span>{dev.cityName}</span>
                      </h3>
                    </Link>
                  </div>
                  <div className={realstyle.RealeStateInfo}>
                    <Link href={`/project/${dev.url}`} target="_blank">
                      <a>
                        <h3
                          className={`${realstyle.projectName} ${
                            lang == "en" ? realstyle.en : ""
                          }`}
                        >
                          {dev.name}
                        </h3>
                        {lang == "ar" ? (
                          <h4 className={`${realstyle.minPrice}`}>
                            أسعار تبدأ من {dev.price ? chunk(dev.price, 3) : ""}
                          </h4>
                        ) : (
                          <h4
                            className={`${realstyle.minPrice} ${realstyle.en}`}
                          >
                            Prices starts from{" "}
                            {dev.price ? chunk(dev.price, 3) : ""}
                          </h4>
                        )}
                      </a>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </LazyBackground>
  );
};

export default Similiar;
