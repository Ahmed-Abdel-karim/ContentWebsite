import navStyles from "./Layout.module.css";
import Link from "next/link";
import NavCollapse from "../Cards/NavCollapse";

export default function MobNav({
  burgerVisability,
  setBurgerVisability,
  navData,
  social,
  lang,
  setLang,
}) {
  if (navData.length) {
    return (
      <>
        <div
          className={`${navStyles.overlay} ${
            burgerVisability ? navStyles.none : ""
          }`}
          onClick={() => setBurgerVisability(!setBurgerVisability)}
        ></div>
        <div
          className={`${navStyles.mobNav} ${
            burgerVisability ? navStyles.burgerVisability : ""
          }`}
        >
          <div>
            <div
              className={navStyles.exit}
              onClick={() => setBurgerVisability(!setBurgerVisability)}
            >
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <line
                  x1="1.29289"
                  y1="15.4355"
                  x2="15.435"
                  y2="1.29334"
                  stroke="#333333"
                  strokeWidth="2"
                />
                <line
                  x1="1.70711"
                  y1="1.43547"
                  x2="15.8492"
                  y2="15.5776"
                  stroke="#333333"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <ul className={navStyles.navElem}>
              {navData.map((listItem, idx) => (
                <NavCollapse
                  key={idx}
                  listItem={listItem}
                  burgerVisability={burgerVisability}
                  setBurgerVisability={setBurgerVisability}
                />
              ))}
              <li>
                <Link href="/blogs">
                  {lang == "ar" ? (
                    <a onClick={() => setBurgerVisability(!burgerVisability)}>
                      المدونة
                    </a>
                  ) : (
                    <a onClick={() => setBurgerVisability(!burgerVisability)}>
                      Blogs
                    </a>
                  )}
                </Link>
              </li>
            </ul>
          </div>
          <div className={navStyles.up}>
            <div className={navStyles.upCont}>
              <div className={navStyles.other}>
                {/* <div className={navStyles.lang}>
                                    <div className={`${navStyles.en} ${lang == 'en' ? navStyles.disable : ''}`} onClick={() => lang == 'ar' ? setLang('en') : ''}>
                                        <p>English</p>
                                    </div>
                                    <div className={`${navStyles.ar} ${lang == 'ar' ? navStyles.disable : ''}`} onClick={() => lang == 'en' ? setLang('ar') : ''}>
                                        <p>العربيه</p>
                                    </div>
                                </div>
                                 */}
                <div className={navStyles.contactButton}>
                  <a href="#footer">
                    <button
                      onClick={() => setBurgerVisability(!setBurgerVisability)}
                    >
                      إتصل بنا
                    </button>
                  </a>
                </div>
                <div className={navStyles.social}>
                  <ul>
                    {social.map((item, idx) =>
                      item.name == "Facebook" && item.isActive ? (
                        <li key={idx}>
                          <Link href={item.link}>
                            <a target="_blank">
                              <svg height="20" viewBox="0 0 11 20" fill="none">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M2.94475 20V11.1658H0V7.48482H2.94475V4.54007C2.94475 1.49741 4.87135 0 7.58567 0C8.88578 0 10.0033 0.0971768 10.3287 0.139876V3.3202L8.44628 3.32094C6.97022 3.32094 6.62568 4.02253 6.62568 5.05172V7.48482H10.3066L9.57043 11.1658H6.62568L6.68458 20"
                                  fill="#BDBDBD"
                                />
                              </svg>
                            </a>
                          </Link>
                        </li>
                      ) : item.name == "Youtube" && item.isActive ? (
                        <li key={idx}>
                          <Link href={item.link}>
                            <a target="_blank">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0)">
                                  <path
                                    d="M19.8013 6C19.8013 6 19.6063 4.62125 19.005 4.01625C18.2438 3.22 17.3913 3.215 17.0013 3.16875C14.205 2.965 10.005 2.965 10.005 2.965H9.99751C9.99751 2.965 5.79876 2.965 3.00126 3.16875C2.61001 3.21625 1.75876 3.22 0.997506 4.01625C0.396256 4.62125 0.205006 6 0.205006 6C0.205006 6 0.0062561 7.6175 0.0062561 9.23875V10.755C0.0062561 12.3725 0.205006 13.9937 0.205006 13.9937C0.205006 13.9937 0.400006 15.3725 0.997506 15.9788C1.75876 16.775 2.75876 16.7488 3.20501 16.8338C4.80626 16.9863 10.0063 17.0325 10.0063 17.0325C10.0063 17.0325 14.21 17.025 17.0063 16.825C17.3975 16.7788 18.2488 16.7737 19.01 15.9775C19.6113 15.3725 19.8063 13.9925 19.8063 13.9925C19.8063 13.9925 20.005 12.375 20.005 10.7537V9.2375C20.0013 7.62 19.8025 5.99875 19.8025 5.99875L19.8013 6ZM7.93376 12.5938V6.9725L13.3363 9.7925L7.93376 12.5938Z"
                                    fill="#BDBDBD"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0">
                                    <rect
                                      width="20"
                                      height="20"
                                      fill="#BDBDBD"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </a>
                          </Link>
                        </li>
                      ) : item.name == "Twitter" && item.isActive ? (
                        <li key={idx}>
                          <Link href={item.link}>
                            <a target="_blank">
                              <svg height="20" viewBox="0 0 25 20" fill="none">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M24.8395 2.3676C23.9341 2.76955 22.9611 3.04025 21.9398 3.16227C22.9816 2.53781 23.7824 1.54832 24.1597 0.369136C23.1846 0.948475 22.1038 1.36785 20.9534 1.59549C20.0326 0.613176 18.7201 0 17.2682 0C14.4801 0 12.2192 2.26096 12.2192 5.04896C12.2192 5.44476 12.2643 5.8303 12.3504 6.19944C8.15459 5.98923 4.43349 3.97949 1.94388 0.923866C1.50912 1.67034 1.25995 2.53679 1.25995 3.4627C1.25995 5.21405 2.151 6.76032 3.50655 7.66573C2.67907 7.63804 1.89978 7.41143 1.21893 7.03409V7.09664C1.21893 9.54319 2.959 11.5837 5.26918 12.0472C4.8457 12.1641 4.39863 12.2246 3.93926 12.2246C3.61319 12.2246 3.29737 12.1928 2.98874 12.1343C3.63165 14.14 5.49579 15.6001 7.70548 15.6411C5.97669 16.9946 3.79981 17.8016 1.43529 17.8016C1.02719 17.8016 0.625239 17.778 0.230469 17.7319C2.46477 19.1633 5.11845 20 7.97002 20C17.2569 20 22.3345 12.3066 22.3345 5.63445C22.3345 5.41605 22.3294 5.19867 22.3202 4.98231C23.3066 4.26967 24.1628 3.38067 24.8395 2.3676Z"
                                  fill="#BDBDBD"
                                />
                              </svg>
                            </a>
                          </Link>
                        </li>
                      ) : item.name == "Instagram" && item.isActive ? (
                        <li key={idx}>
                          <Link href={item.link}>
                            <a target="_blank">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0039 5.50781C7.51953 5.50781 5.51562 7.51172 5.51562 9.99609C5.51562 12.4805 7.51953 14.4844 10.0039 14.4844C12.4883 14.4844 14.4922 12.4805 14.4922 9.99609C14.4922 7.51172 12.4883 5.50781 10.0039 5.50781ZM10.0039 12.9141C8.39844 12.9141 7.08594 11.6055 7.08594 9.99609C7.08594 8.38672 8.39453 7.07812 10.0039 7.07812C11.6133 7.07812 12.9219 8.38672 12.9219 9.99609C12.9219 11.6055 11.6094 12.9141 10.0039 12.9141V12.9141ZM15.7227 5.32422C15.7227 5.90625 15.2539 6.37109 14.6758 6.37109C14.0938 6.37109 13.6289 5.90234 13.6289 5.32422C13.6289 4.74609 14.0977 4.27734 14.6758 4.27734C15.2539 4.27734 15.7227 4.74609 15.7227 5.32422ZM18.6953 6.38672C18.6289 4.98438 18.3086 3.74219 17.2813 2.71875C16.2578 1.69531 15.0156 1.375 13.6133 1.30469C12.168 1.22266 7.83594 1.22266 6.39063 1.30469C4.99219 1.37109 3.75 1.69141 2.72266 2.71484C1.69531 3.73828 1.37891 4.98047 1.30859 6.38281C1.22656 7.82812 1.22656 12.1602 1.30859 13.6055C1.375 15.0078 1.69531 16.25 2.72266 17.2734C3.75 18.2969 4.98828 18.6172 6.39063 18.6875C7.83594 18.7695 12.168 18.7695 13.6133 18.6875C15.0156 18.6211 16.2578 18.3008 17.2813 17.2734C18.3047 16.25 18.625 15.0078 18.6953 13.6055C18.7773 12.1602 18.7773 7.83203 18.6953 6.38672V6.38672ZM16.8281 15.1562C16.5234 15.9219 15.9336 16.5117 15.1641 16.8203C14.0117 17.2773 11.2773 17.1719 10.0039 17.1719C8.73047 17.1719 5.99219 17.2734 4.84375 16.8203C4.07812 16.5156 3.48828 15.9258 3.17969 15.1562C2.72266 14.0039 2.82813 11.2695 2.82813 9.99609C2.82813 8.72266 2.72656 5.98437 3.17969 4.83594C3.48438 4.07031 4.07422 3.48047 4.84375 3.17187C5.99609 2.71484 8.73047 2.82031 10.0039 2.82031C11.2773 2.82031 14.0156 2.71875 15.1641 3.17187C15.9297 3.47656 16.5195 4.06641 16.8281 4.83594C17.2852 5.98828 17.1797 8.72266 17.1797 9.99609C17.1797 11.2695 17.2852 14.0078 16.8281 15.1562Z"
                                  fill="#BDBDBD"
                                />
                              </svg>
                            </a>
                          </Link>
                        </li>
                      ) : (
                        ""
                      )
                    )}
                    <li>
                      <svg height="20" viewBox="0 0 21 20" fill="none">
                        <path
                          d="M17.3281 2.90625C15.4569 1.03125 12.9681 0 10.3169 0C4.85562 0 0.410625 4.445 0.410625 9.91C0.410625 11.6562 0.868125 13.3637 1.73438 14.8637L0.328125 20L5.58187 18.6213C7.03062 19.41 8.66063 19.8288 10.3156 19.8288H10.3194C15.7806 19.8288 20.2294 15.3837 20.2294 9.91875C20.2294 7.27 19.1981 4.7825 17.3269 2.9075L17.3281 2.90625ZM10.3194 18.1562C8.83938 18.1562 7.38938 17.7575 6.12438 17.0075L5.82312 16.8275L2.70563 17.6437L3.53813 14.605L3.34313 14.2925C2.51438 12.9837 2.08187 11.4688 2.08187 9.91C2.08187 5.3675 5.77688 1.67125 10.3244 1.67125C12.5231 1.67125 14.5944 2.53125 16.1481 4.085C17.7031 5.64375 18.5581 7.71 18.5581 9.9125C18.5544 14.4587 14.8594 18.155 10.3194 18.155V18.1562ZM14.8356 11.985C14.5894 11.86 13.3706 11.2625 13.1444 11.18C12.9181 11.0975 12.7531 11.055 12.5856 11.305C12.4219 11.5512 11.9456 12.11 11.8006 12.2775C11.6556 12.4412 11.5119 12.465 11.2656 12.34C11.0194 12.215 10.2181 11.9537 9.27312 11.11C8.53813 10.4537 8.03937 9.64125 7.89437 9.395C7.74937 9.14875 7.87813 9.0125 8.00438 8.89125C8.11813 8.78125 8.25063 8.6025 8.37563 8.4575C8.50063 8.3125 8.53938 8.21125 8.62188 8.04375C8.70438 7.88 8.66438 7.735 8.60188 7.61C8.53938 7.485 8.04313 6.26625 7.84063 5.77C7.64188 5.285 7.43438 5.3525 7.28188 5.34375C7.13688 5.33625 6.97312 5.33625 6.80937 5.33625C6.64562 5.33625 6.37563 5.39875 6.14937 5.645C5.92312 5.89125 5.28188 6.4925 5.28188 7.71125C5.28188 8.93 6.16813 10.1063 6.29313 10.2738C6.41813 10.4375 8.03937 12.9412 10.5231 14.0125C11.1131 14.2662 11.5744 14.4187 11.9331 14.5362C12.5269 14.7237 13.0656 14.6962 13.4919 14.6337C13.9681 14.5638 14.9569 14.0362 15.1644 13.4575C15.3719 12.8787 15.3719 12.3837 15.3094 12.2812C15.2506 12.1713 15.0869 12.11 14.8369 11.9837L14.8356 11.985Z"
                          fill="#BDBDBD"
                        />
                      </svg>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
