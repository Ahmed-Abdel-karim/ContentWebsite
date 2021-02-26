import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { Desktop, Mobile } from "../MediaQuery/MediaQuery";
import Styles from "./UsCard.module.css";

const UsCard = ({ lang, flag }) => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    async function loadData() {
      if (window.localStorage.getItem("usdataTime") != null) {
        if (
          new Date(window.localStorage.getItem("usdataTime")).getMinutes() + 5 <
          new Date().getMinutes()
        ) {
          window.localStorage.removeItem("usdata");
          window.localStorage.removeItem("usdataTime");
        }
      }
      if (window.localStorage.getItem("usdata") != null && !flag) {
        setdata(JSON.parse(window.localStorage.getItem("usdata")));
      } else {
        const us = await fetch(
          "https://swagger.pioneer.city-edge-developments.com/api/Home/GetVideoSection",
          {
            method: "get",
            headers: {
              LanguageCode: lang == "ar" ? "ar" : "en",
            },
          }
        );
        const usdata = await us.json();
        setdata(usdata.data);
        window.localStorage.setItem("usdata", JSON.stringify(usdata.data));
        window.localStorage.setItem("usdataTime", new Date());
      }
    }

    loadData();
  }, [flag]);
  useEffect(() => {
    data && data.isVideo
      ? (document.querySelector("#video").innerHTML = data.videoLink)
      : "";
    data && data.isVideo
      ? (document.querySelector("#mobvideo").innerHTML = data.videoLink)
      : "";
  }, [data]);

  if (data) {
    return (
      <>
        <Desktop>
          <div className="pc">
            <section className={Styles.us}>
              <div
                className={`${Styles.content} ${lang == "en" ? Styles.en : ""}`}
              >
                <h3>{data.title}</h3>
                <p>{data.description}</p>
                <Button
                  path={data.link ? data.link : "/"}
                  text={`${lang == "en" ? "More" : "المزيد"}`}
                />
              </div>
              <div className={Styles.img} id="video">
                {data.isVideo ? (
                  ""
                ) : (
                  <>
                    <div className="pc">
                      <img
                        src={data.pcImage}
                        alt=""
                        width="100%"
                        height="100%"
                        loading="lazy"
                      />
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>
        </Desktop>
        <Mobile>
          <div className="mob">
            <section className={Styles.us}>
              <div
                className={`${Styles.content} ${lang == "en" ? Styles.en : ""}`}
              >
                <h3>{data.title}</h3>
                <div className={Styles.img} id="mobvideo">
                  {data.isVideo ? (
                    ""
                  ) : (
                    <>
                      <div className="mob">
                        <img
                          src={data.mobileImage}
                          alt=""
                          width="100%"
                          height="100%"
                          loading="lazy"
                        />
                      </div>
                    </>
                  )}
                </div>
                <p>{data.description}</p>
                <Button
                  path={data.link ? data.link : "/"}
                  text={`${lang == "en" ? "More" : "المزيد"}`}
                />
              </div>
            </section>
          </div>
        </Mobile>
      </>
    );
  }
};
export default UsCard;
