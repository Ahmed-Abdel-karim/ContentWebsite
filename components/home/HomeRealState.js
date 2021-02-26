import { useEffect, useState } from 'react';
import RealStateCard from "../Cards/RealStateCard"
import styles from "./HomeRealState.module.css";
import commonStyles from "./Common.module.css"

const HomeRealState = ({lang, flag}) => {
    const [showcase, setShowcase] = useState("");
    const [nonRes, setnonRes] = useState([]);
    const [dataList, setdataList] = useState([]);
    const [arr, setarr] = useState([]);

    useEffect(() => {
        async function loadData() {
            if (window.localStorage.getItem('nonCommercialListTime') != null) {
                if (new Date(window.localStorage.getItem('nonCommercialListTime')).getMinutes() + 5 < new Date().getMinutes()) {
                    window.localStorage.removeItem('nonCommercialList');
                    window.localStorage.removeItem('nonCommercialListTime');
                }
            }
            if (window.localStorage.getItem('nonCommercialList') != null && !flag) {
                setnonRes(JSON.parse(window.localStorage.getItem('nonCommercialList')))
            } else {
                const nonResReq = await fetch('https://swagger.pioneer.city-edge-developments.com/api/Home/ListFilterType?IsCommercial=false', {
                    method: "get",
                    headers: {
                        'LanguageCode': lang == 'ar' ? 'ar' : 'en'
                    }
                })
                const nonResRes = await nonResReq.json()
                setnonRes(nonResRes.data);
                window.localStorage.setItem('nonCommercialList', JSON.stringify(nonResRes.data));
                window.localStorage.setItem('nonCommercialListTime', new Date());
            }
        }
        loadData();
    }, [flag,lang]);
    useEffect(() => {

        if (nonRes.length) {
            setShowcase(nonRes[0].name);
            nonRes.map((item,ind) => {
                let link = 'https://swagger.pioneer.city-edge-developments.com/api/Home/ListHomeProjects/' + item.id + '?IsCommercial=false';
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
        }

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
                    <h2 className={styles.title}>
                        {
                            lang == 'ar' ?
                            'المشاريع العقارية المميزة'
                            :
                            'Distinguished Real Estate Projects'
                        }
                    </h2>
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
export default HomeRealState