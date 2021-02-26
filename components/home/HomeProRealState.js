import React, { useEffect, useState } from 'react';
import ProRealStateCard from '../Cards/ProRealStateCard';
import styles from "./HomeProRealState.module.css";
import commonStyles from "./Common.module.css"

const HomeProRealState = ({lang, flag}) => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    async function loadData() {
      if (window.localStorage.getItem('ListMostPopularCitiesTime') != null) {
        if (new Date(window.localStorage.getItem('ListMostPopularCitiesTime')).getMinutes() + 5 < new Date().getMinutes()) {
          window.localStorage.removeItem('ListMostPopularCities');
          window.localStorage.removeItem('ListMostPopularCitiesTime');
        }
      }
      if (window.localStorage.getItem('ListMostPopularCities') != null && !flag) {
        setdata(JSON.parse(window.localStorage.getItem('ListMostPopularCities')))
      } else {
        const ListMostPopularCities = await fetch('https://swagger.pioneer.city-edge-developments.com/api/Home/ListMostPopularCities', {
          method: "get",
          headers: {
            'LanguageCode': lang == 'ar' ? 'ar' : 'en'
          }
        })
        const MostPopularCities = await ListMostPopularCities.json()
        window.localStorage.setItem('ListMostPopularCities', JSON.stringify(MostPopularCities.data));
        window.localStorage.setItem('ListMostPopularCitiesTime', new Date());
        setdata(MostPopularCities.data);
      }
    }

    loadData();
  }, [flag]);

  return (
    <div className={commonStyles.RealeStateContainer}>
      {
        lang == 'ar' ? 
          <h3 className={styles.superTitle}>إبحث عن منزل أحلامك</h3>
        :
          <h3 className={styles.superTitle}>Find Your Dream Home</h3>
      }
      {
        lang == 'ar' ? 
        <h2 className={styles.title}>أشهر المناطق</h2>
        :
        <h2 className={styles.title}>The Most Famous Areas</h2>
      }
      <div className={`${commonStyles.grid} ${lang == 'en' ? commonStyles.en:''}`}>
        {
          data && data.slice(0, 6).map((city) => {
            return (
              <ProRealStateCard city={city} key={city.id} lang={lang} />
            )
          })
        }
      </div>
    </div>

  )
}
export default HomeProRealState;