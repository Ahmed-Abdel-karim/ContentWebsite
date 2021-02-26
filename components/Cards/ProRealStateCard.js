import React from 'react';
import Link from 'next/link';
import styles from "./ProRealStateCard.module.css";

const ProRealStateCard = ({ city, lang }) => {

  return (
    <>
      <Link href={`/projects/${city.propertyUrl}/${city.cityName ? city.cityName.replace(' ', '-') : city.name.replace(' ', '-')}`} target="_blank">
        <a className={styles.outerLink}>
          <div className="pc">
            <img src={city.pcImage ? city.pcImage : ''} alt="" className={styles.ProRealeStateCard} loading="lazy" />
          </div>
          <div className="mob">
            <img src={city.mobileImage ? city.mobileImage : city.pcImage ? city.pcImage : ''} alt="" className={styles.ProRealeStateCard} loading="lazy" />
          </div>
          <div className={styles.overLay}></div>
          <div className={`${styles.ProRealeStateInfo} ${lang == 'en' ? styles.en : ''}`}>
            <h2 className={styles.ProRealeStateName}>{city.name}</h2>
            <h3 className={`${styles.ProRealeStateCount} ${lang == 'en' ? styles.en : ''}`}>
              {
                lang == 'ar' ?

                  city.projectCount > 2 && city.projectCount < 10 ?
                    <span>{city.projectCount} مشاريع</span>
                    :
                    <span>{city.projectCount} مشروع</span>
                  :
                  city.projectCount > 2 ?
                    <span>{city.projectCount} Projects</span>
                    :
                    <span>{city.projectCount} Project</span>
              }
            </h3>
          </div>
        </a>
      </Link>
    </>
  )
}
export default ProRealStateCard