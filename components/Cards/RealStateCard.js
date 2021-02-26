import Link from "next/link";
import LazyBackground from "../LazyBackground/LazyBackground";
import { Desktop, Mobile } from "../MediaQuery/MediaQuery";
import styles from "./RealStateCard.module.css";

export default function RealStateCard({ project, lang }) {
  const chunk = (str, n) => {
    let len = "";
    len = str;
    for (let i = len.length - n; i > 0; i -= n) {
      len = [len.slice(0, i), ".", len.slice(i)].join("");
    }
    return len;
  };

  return (
    <>
      <div className={`${styles.RealeStateCard} blogsProjectsListingItem`}>
        <div className={styles.RealeStateInfo}>
          <a href={`/project/${project.url}`}>
            <a>
              <div
                className={` ${styles.RealeStateWrapper} blogsProjectsListingItemWrapper`}
              >
                <Desktop>
                  <LazyBackground
                    bgImage={project.pcImage ? project.pcImage : ""}
                    className={styles.imageBg + " imageBg"}
                  >
                    <div></div>
                  </LazyBackground>
                </Desktop>
                <Mobile>
                  <LazyBackground
                    bgImage={
                      project.mobileImage
                        ? project.mobileImage
                        : project.pcImage
                        ? project.pcImage
                        : ""
                    }
                    className={styles.imageBg + " imageBg"}
                  >
                    <div></div>
                  </LazyBackground>
                </Mobile>
              </div>
              <h3
                className={`${styles.projectName} ${
                  lang == "en" ? styles.en : ""
                }`}
              >
                {project.name}
              </h3>
              {lang == "ar" ? (
                <h4 className={styles.minPrice}>
                  أسعار تبدأ من {project.price ? chunk(project.price, 3) : ""}
                </h4>
              ) : (
                <h4 className={`${styles.minPrice} ${styles.en}`}>
                  Prices start from{" "}
                  {project.price ? chunk(project.price, 3) : ""}
                </h4>
              )}
            </a>
          </a>
          <div className={styles.RealeStateTag}>
            <a
              href={`/projects/${
                project.propertyUrl
              }/${project.cityName.replace(" ", "-")}`}
            >
              <a>
                <h3 className={styles.RealeStateCity}>
                  <span>{project.cityName}</span>
                </h3>
              </a>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
