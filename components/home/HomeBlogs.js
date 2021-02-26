import { useEffect, useState } from "react";
import BlogsCard from "../Cards/BlogsCard";
import commonStyles from "./Common.module.css";

export default function HomeBlogs({ lang, flag }) {
  const [data, setdata] = useState([]);
  useEffect(() => {
    async function loadData() {
      if (window.localStorage.getItem("listBlogHomeTime") != null) {
        if (
          new Date(
            window.localStorage.getItem("listBlogHomeTime")
          ).getMinutes() +
            5 <
          new Date().getMinutes()
        ) {
          window.localStorage.removeItem("listBlogHome");
          window.localStorage.removeItem("listBlogHomeTime");
        }
      }
      if (window.localStorage.getItem("listBlogHome") != null && !flag) {
        setdata(JSON.parse(window.localStorage.getItem("listBlogHome")));
      } else {
        const listBlogHome = await fetch(
          "https://swagger.pioneer.city-edge-developments.com/api/Home/ListHomeBlogs",
          {
            method: "get",
            headers: {
              LanguageCode: lang == "ar" ? "ar" : "en",
            },
          }
        );
        const blogs = await listBlogHome.json();
        window.localStorage.setItem("listBlogHome", JSON.stringify(blogs.data));
        window.localStorage.setItem("listBlogHomeTime", new Date());
        setdata(blogs.data);
      }
    }

    loadData();
  }, [flag]);
  return (
    <div className={commonStyles.bg}>
      <div className={commonStyles.RealeStateContainer}>
        {lang == "ar" ? (
          <h2 className={commonStyles.title}> أحدث المقالات من بايونير</h2>
        ) : (
          <h2 className={commonStyles.title}>Latest Articles From Pioneer</h2>
        )}
        <div
          className={`${commonStyles.grid} ${
            lang == "en" ? commonStyles.en : ""
          }`}
        >
          {data &&
            data.map((blog) => {
              return <BlogsCard blog={blog} key={blog.id} lang={lang} />;
            })}
        </div>
      </div>
    </div>
  );
}
