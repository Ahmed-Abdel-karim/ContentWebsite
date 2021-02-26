import React from "react"
import styles  from './Projects.module.css';
import commonStyles from '../home/Common.module.css';
import RealStateCard from '../Cards/RealStateCard';

const projects = [
    {
        "id": 1,
        "projectName" : "اسم المشروع",
        "minPrice": "275,000",
        "city": "القاهرة الجديدة",
        "cityId":1,
        "imageUrl": null
    },
    {
      "id": 2,
      "projectName" : "اسم المشروع",
      "minPrice": "275,000",
      "city": "القاهرة الجديدة",
      "cityId":2,
      "imageUrl": null
    },
    {
        "id": 3,
        "projectName" : "اسم المشروع",
        "minPrice": "275,000",
        "city": "القاهرة الجديدة",
        "cityId":3,
        "imageUrl": null
    },
    {
        "id": 4,
        "projectName" : "اسم المشروع",
        "minPrice": "275,000",
        "city": "القاهرة الجديدة",
        "cityId":4,
        "imageUrl": null
    },
    {
      "id": 5,
      "projectName" : "اسم المشروع",
      "minPrice": "275,000",
      "city": "القاهرة الجديدة",
      "cityId":5,
      "imageUrl": null
    },
    {
        "id": 6,
        "projectName" : "اسم المشروع",
        "minPrice": "275,000",
        "city": "القاهرة الجديدة",
        "cityId":5,
        "imageUrl": null
    }
];

export default function List({city}) {
    return (
        <>
            <div className={styles.cover}>
                <div className={styles.background}>
                    <div className={styles.container}>
                        <h3 className={styles.superTitle}>{"الرئيسية / "} {city? " المشاريع التجارية / ": null}</h3>
                        <h1  className={styles.title}>{city? city : " المشريع التجارية "}</h1>
                    </div>    
                </div>
            </div>
              <div className={commonStyles.RealeStateContainer}>
                <div className={`${commonStyles.grid} ${lang == 'en' ? commonStyles.en:''}`}> 
                  {projects.map((project, index)=>{ 
                    return (
                        <React.Fragment key={index}>
                            <RealStateCard project={project} lang={lang} />
                        </React.Fragment>
                    )
                })
                }

                </div>
            </div>
        </>
    )
}