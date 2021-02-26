import { useEffect, useState } from 'react';
import RealStateCard from "../Cards/RealStateCard";
import styles from "./HomeRealState2.module.css";
import commonStyles from "./Common.module.css"

const HomeRealState2 = ({lang, flag}) => {
  const [showcase, setShowcase] = useState("");
  const [nonRes, setnonRes] = useState([]);
  const [dataList, setdataList] = useState([]);
  const [arr, setarr] = useState([]);

  useEffect(() => {
    async function loadData() {
      if (window.localStorage.getItem('commercialListTime') != null) {
        if (new Date(window.localStorage.getItem('commercialListTime')).getMinutes() + 5 < new Date().getMinutes()) {
          window.localStorage.removeItem('commercialList');
          window.localStorage.removeItem('commercialListTime');
        }
      }
      if (window.localStorage.getItem('commercialList') != null && !flag) {
        setnonRes(JSON.parse(window.localStorage.getItem('commercialList')))
      } else {
        const nonResReq = await fetch('https://swagger.pioneer.city-edge-developments.com/api/Home/ListFilterType?IsCommercial=true', {
          method: "get",
          headers: {
            'LanguageCode': lang == 'ar' ? 'ar' : 'en'
          }
        })
        const nonResRes = await nonResReq.json()
        setnonRes(nonResRes.data);
        window.localStorage.setItem('commercialListTime', new Date());
        window.localStorage.setItem('commercialList', JSON.stringify(nonResRes.data));
      }
    }
    loadData();
  }, [flag,lang]);
  useEffect(() => {

    nonRes.length && setShowcase(nonRes[0].name)
    nonRes && nonRes.map(item => {
      let link = 'https://swagger.pioneer.city-edge-developments.com/api/Home/ListHomeCommericailProjects/' + item.id ;
      let listItem = fetch(link, {
        method: "get",
        headers: {
          'LanguageCode': lang == 'ar' ? 'ar' : 'en'
        }
      }).then(res => res.json())
        .then(da => {
          if (da.data.length) {
            setdataList(da.data)
          }
        })
    })
  }, [nonRes]);
  useEffect(() => {
    setarr([...arr, ...dataList])
  }, [dataList]);

  let ShowcaseArray = () => {
    let ret = []
    nonRes.map(item => {
      if (showcase === item.name) {
        ret = arr.filter(arrItem => arrItem.cityName == item.name)
      }
    })
    return ret;
  }

  if (nonRes.length) {
    return (
      <div className={styles.bg}>
        <div className={commonStyles.RealeStateContainer}>
          {
            lang == 'ar' ? 
              <h2 className={styles.title}>المشاريع التجارية المميزة</h2>
            :
              <h2 className={styles.title}>Distinguished Commercial Projects</h2>
          }
          <h3 className={styles.subTitle} dir={lang == 'ar' ? 'rtl' : 'ltr'}>
            {
              nonRes.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.category} ${showcase == item.name && styles.activeCategory}`}
                  onClick={() => setShowcase(item.name)}
                >
                  {item.name}
                </div>
              ))
            }
          </h3>
          <div className={`${commonStyles.grid} ${lang == 'en' ? commonStyles.en:''}`}>
            {
              ShowcaseArray().map((project) => (
                <RealStateCard project={project} key={project.id} lang={lang} />
              ))
            }
          </div>
        </div>
      </div>
    )
  } else {
    return <></>
  }
}
export default HomeRealState2