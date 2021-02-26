import { useEffect, useState } from "react";
import LazyBackground from "../LazyBackground/LazyBackground";
import { Desktop, Mobile } from "../MediaQuery/MediaQuery";

const CardWrapper = ({ children, desktopImg, mobileImg }) => {
  return (
    <>
      <Mobile>
        <LazyBackground className="usCard" bgImage={mobileImg}>
          {children}
        </LazyBackground>
      </Mobile>
      <Desktop>
        <LazyBackground className="usCard" bgImage={desktopImg}>
          {children}
        </LazyBackground>
      </Desktop>
    </>
  );
};

const UsCard = ({ lang, flag }) => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    async function loadData() {
      if (window.localStorage.getItem("usdatacardTime") != null) {
        if (
          new Date(window.localStorage.getItem("usdatacardTime")).getMinutes() +
            5 <
          new Date().getMinutes()
        ) {
          window.localStorage.removeItem("usdatacard");
          window.localStorage.removeItem("usdatacardTime");
        }
      }
      if (window.localStorage.getItem("usdatacard") != null && !flag) {
        setdata(JSON.parse(window.localStorage.getItem("usdatacard")));
      } else {
        const us = await fetch(
          "https://swagger.pioneer.city-edge-developments.com/api/Home/ListAboutUsSection",
          {
            method: "get",
            headers: {
              LanguageCode: lang == "ar" ? "ar" : "en",
            },
          }
        );
        const usdatacard = await us.json();
        setdata(usdatacard.data);
        window.localStorage.setItem(
          "usdatacard",
          JSON.stringify(usdatacard.data)
        );
        window.localStorage.setItem("usdatacardTime", new Date());
      }
    }

    loadData();
  }, [flag]);
  if (data) {
    return (
      <>
        <CardWrapper
          desktopImg={data.pcImage ? data.pcImage : ""}
          mobileImg={
            data.mobileImage
              ? data.mobileImage
              : data.pcImage
              ? data.pcImage
              : ""
          }
        >
          <div className="usCard_container">
            {data.list &&
              data.list.map((item, idx) =>
                idx == 0 ? (
                  <div className="usCard_container_item" key={idx}>
                    <div className="icon">
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip1)">
                          <path
                            d="M46.7161 22.5009H45.0498V9.16779C45.0498 8.70719 44.6765 8.33453 44.2163 8.33453H39.1689L37.5118 3.08447C37.4422 2.86534 37.2859 2.68486 37.08 2.5848C36.8732 2.48454 36.6344 2.47472 36.4197 2.55639L29.6334 5.14267L26.5853 0.385391C26.4654 0.198015 26.2755 0.0659964 26.0577 0.0198315C25.8404 -0.029049 25.6121 0.0133559 25.4272 0.13681L12.9157 8.33453H5.88384C2.664 8.33808 0.0547502 10.9478 0.0507812 14.1676V44.1668C0.0547502 47.3867 2.664 49.9964 5.88384 50.0001H44.2163C44.6765 50.0001 45.0498 49.6268 45.0498 49.1667V39.1668H46.7161C48.5573 39.1668 50.0496 37.6745 50.0496 35.834V25.8342C50.0496 23.9928 48.5573 22.5009 46.7161 22.5009ZM46.7161 24.1674C47.6367 24.1674 48.3828 24.9132 48.3828 25.8342C48.3828 26.7545 47.6367 27.5005 46.7161 27.5005H45.0498V24.1674H46.7161ZM43.3828 10.0013V18.3341H42.3273L39.6957 10.0013H43.3828ZM40.5801 18.3341H38.151L35.8406 11.4042C35.7274 11.0639 35.4089 10.8339 35.05 10.8341C34.2036 10.8368 33.391 10.5005 32.7942 9.90037L32.3056 9.41178C32.0758 9.18179 31.7328 9.10638 31.4274 9.21918L6.77246 18.3341H5.88384C4.77275 18.3339 3.70783 17.889 2.92762 17.0981L36.1886 4.43203L40.5801 18.3341ZM36.3944 18.3341H11.5774L31.5053 10.9674L31.6156 11.0785C32.3749 11.842 33.3682 12.3296 34.4367 12.4622L36.3944 18.3341ZM25.6336 1.99364L28.0392 5.75096L8.60339 13.1526L25.6336 1.99364ZM5.88384 10.0013H10.3716L1.96025 15.5122C1.80504 15.0809 1.72274 14.6261 1.71752 14.1676C1.72044 11.8677 3.58417 10.0036 5.88384 10.0013ZM43.3828 48.3332H5.88384C3.58417 48.3305 1.72044 46.4665 1.71752 44.1668V18.2508C1.72546 18.2581 1.73402 18.265 1.74154 18.2734C1.80672 18.3383 1.87565 18.3981 1.94354 18.4599C2.0108 18.5215 2.08329 18.5921 2.15744 18.654C2.23181 18.7158 2.30346 18.7655 2.37657 18.8206C2.44989 18.8758 2.52843 18.9389 2.60823 18.9944C2.68823 19.049 2.76573 19.0914 2.84427 19.14C2.92282 19.1885 3.00637 19.2432 3.09411 19.29C3.18184 19.3364 3.26498 19.3732 3.35083 19.4158C3.43669 19.458 3.51774 19.4991 3.60589 19.539C3.69425 19.5789 3.79535 19.6098 3.88998 19.6439C3.98503 19.6781 4.05668 19.7107 4.14441 19.7371C4.24906 19.7707 4.35706 19.7943 4.46464 19.8206C4.5482 19.8405 4.62423 19.8659 4.7057 19.8824C4.82832 19.9081 4.95574 19.923 5.08003 19.9407C5.1498 19.9501 5.21769 19.9647 5.2885 19.9723C5.48611 19.9919 5.68498 20.0013 5.88384 20.0011H6.96777L6.97968 20.0328L7.06888 20.0011H43.3828V27.5005H34.2165C30.9954 27.5005 28.3834 30.112 28.3834 33.3338C28.3834 36.5553 30.9954 39.1668 34.2165 39.1668H43.3828V48.3332ZM48.3828 35.834C48.3828 36.7544 47.6367 37.5003 46.7161 37.5003H34.2165C31.9156 37.5003 30.0502 35.6349 30.0502 33.3338C30.0502 31.0324 31.9156 29.1674 34.2165 29.1674H46.7161C46.9175 29.1653 47.1172 29.1449 47.3148 29.1064C47.362 29.0983 47.409 29.0889 47.4556 29.0776C47.644 29.0369 47.8286 28.9792 48.007 28.9065L48.0354 28.893C48.1547 28.8424 48.2705 28.7839 48.3828 28.7198V35.834Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M18.0273 22.5H21.3608V24.1666H18.0273V22.5Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M11.3594 22.5H14.6924V24.1666H11.3594V22.5Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M38.0273 22.5H40.8835V24.1666H38.0273V22.5Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M31.3594 22.5H34.6924V24.1666H31.3594V22.5Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M4.90172 22.3828L4.51172 23.9994C4.96167 24.1082 5.42248 24.1644 5.88496 24.1661H8.02839V22.4996H5.88496C5.55408 22.4987 5.22404 22.4597 4.90172 22.3828Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M24.6914 22.5H28.0247V24.1666H24.6914V22.5Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M4.90172 44.0508L4.51172 45.6672C4.96167 45.7762 5.42248 45.8326 5.88496 45.8343H8.02839V44.1676H5.88496C5.55408 44.1665 5.22404 44.1281 4.90172 44.0508Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M38.0273 44.166H40.8835V45.8328H38.0273V44.166Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M18.0273 44.166H21.3608V45.8328H18.0273V44.166Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M31.3594 44.166H34.6924V45.8328H31.3594V44.166Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M11.3594 44.166H14.6924V45.8328H11.3594V44.166Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M24.6914 44.166H28.0247V45.8328H24.6914V44.166Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M34.2148 30.834C32.8343 30.834 31.7148 31.953 31.7148 33.3338C31.7148 34.7141 32.8343 35.834 34.2148 35.834C35.5954 35.834 36.7146 34.7141 36.7146 33.3338C36.7146 31.953 35.5954 30.834 34.2148 30.834ZM34.2148 34.1672C33.7549 34.1672 33.3816 33.794 33.3816 33.3338C33.3816 32.8734 33.7549 32.5005 34.2148 32.5005C34.675 32.5005 35.0483 32.8734 35.0483 33.3338C35.0483 33.794 34.675 34.1672 34.2148 34.1672Z"
                            fill="#3b5a9a"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip1">
                            <rect width="50" height="50" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className={`content ${lang == "en" ? "en" : ""}`}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ) : idx == 1 ? (
                  <div className="usCard_container_item" key={idx}>
                    <div className="icon">
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M47.2607 32.4991C46.6737 31.4826 45.7261 30.7555 44.5923 30.4516C43.4586 30.1482 42.2743 30.3037 41.2577 30.8907L33.121 35.5884C33.1236 34.8219 32.9249 34.0649 32.5315 33.3833C31.9445 32.3668 30.9969 31.6397 29.8632 31.3358L20.7262 28.8875C18.8361 28.3811 16.8625 28.641 15.1685 29.6193L2.89278 36.7065C2.19219 37.111 1.95216 38.0068 2.35665 38.7074L8.45294 49.2666C8.64718 49.6031 8.9671 49.8486 9.34239 49.9491C9.4671 49.9825 9.59454 49.999 9.72149 49.999C9.97647 49.999 10.2294 49.9324 10.4539 49.8028L15.9899 46.6066L27.8319 47.3702C29.2799 47.4633 30.7089 47.1294 31.9653 46.4041L45.6521 38.5021C47.7506 37.2907 48.4722 34.5977 47.2607 32.4991V32.4991ZM44.1873 35.9651L30.5007 43.867C29.7467 44.3024 28.8885 44.5027 28.0206 44.4468L15.7359 43.6545C15.447 43.6362 15.1598 43.7031 14.9093 43.8478L10.2578 46.5333L5.62637 38.5114L16.6333 32.1566C17.6498 31.5698 18.834 31.4137 19.9679 31.7176L29.1049 34.1658C29.4827 34.267 29.7986 34.5095 29.9942 34.8483C30.1899 35.187 30.2418 35.582 30.1405 35.9599C30.0394 36.3378 29.7969 36.6536 29.4581 36.8492C29.1191 37.0448 28.7244 37.0969 28.3466 36.9955L21.191 35.0782C20.4093 34.869 19.6063 35.3324 19.397 36.1139C19.1876 36.8953 19.6513 37.6987 20.4327 37.908L27.5883 39.8254C27.5888 39.8255 27.5894 39.8256 27.5899 39.8258L28.2078 39.9913C29.5936 40.3628 31.0411 40.1722 32.2835 39.4548L42.7226 33.4279C43.422 33.0239 44.3196 33.2645 44.7235 33.964C45.1273 34.6635 44.8868 35.5612 44.1873 35.9651V35.9651Z"
                          fill="#3b5a9a"
                        />
                        <path
                          d="M15.2383 23.4375H34.7695C35.5785 23.4375 36.2344 22.7816 36.2344 21.9727C36.2344 17.4624 33.5615 13.5653 29.7169 11.7805C31.0233 10.5347 31.8398 8.77939 31.8398 6.83594C31.8398 3.0665 28.7733 0 25.0039 0C21.2346 0 18.168 3.0665 18.168 6.83594C18.168 8.77939 18.9846 10.5347 20.2909 11.7805C16.4463 13.5653 13.7734 17.4625 13.7734 21.9727C13.7734 22.7816 14.4293 23.4375 15.2383 23.4375V23.4375ZM21.0977 6.83594C21.0977 4.68203 22.85 2.92969 25.0039 2.92969C27.1578 2.92969 28.9102 4.68203 28.9102 6.83594C28.9102 8.98984 27.1578 10.7422 25.0039 10.7422C22.85 10.7422 21.0977 8.98984 21.0977 6.83594V6.83594ZM25.0039 13.6719C29.0812 13.6719 32.4813 16.6271 33.1753 20.5078H16.8325C17.5265 16.6271 20.9267 13.6719 25.0039 13.6719Z"
                          fill="#3b5a9a"
                        />
                      </svg>
                    </div>
                    <div className={`content ${lang == "en" ? "en" : ""}`}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ) : (
                  <div className="usCard_container_item" key={idx}>
                    <div className="icon">
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip2)">
                          <path
                            d="M48.7708 45.082H44.6725V29.3173L46.2157 30.3827C46.3526 30.4768 46.5147 30.5272 46.6808 30.5272C46.969 30.5284 47.2363 30.3771 47.384 30.1294L49.4732 26.6542C49.6957 26.2831 49.5917 25.8029 49.2355 25.5575L44.2742 22.1384C46.8789 18.3362 49.5905 13.6591 49.5905 10.6557C49.5905 4.77075 44.8197 0 38.9347 0C33.0498 0 28.279 4.77075 28.279 10.6557C28.279 10.8042 28.2898 10.9583 28.3018 11.114L25.465 9.16048C25.1852 8.96797 24.8154 8.96797 24.5357 9.16048L0.765161 25.5539C0.408956 25.7997 0.304896 26.2799 0.527424 26.651L2.61663 30.1262C2.76511 30.3731 3.03207 30.524 3.31983 30.5236C3.48593 30.524 3.64842 30.4736 3.7849 30.3787L5.32819 29.3157V45.082H1.22983C0.777168 45.082 0.410156 45.449 0.410156 45.9016V49.1803C0.410156 49.633 0.777168 50 1.22983 50H48.7708C49.2235 50 49.5905 49.633 49.5905 49.1803V45.9016C49.5905 45.449 49.2235 45.082 48.7708 45.082V45.082ZM47.671 26.4672L46.4283 28.5352L41.9053 25.4206C42.3503 24.8319 42.8322 24.1803 43.3333 23.4787L47.671 26.4672ZM38.9347 1.63934C43.912 1.64535 47.9451 5.67847 47.9511 10.6557C47.9511 14.1173 43.2332 21.0065 40.0674 25.1297C40.0674 25.1345 40.0586 25.1369 40.0554 25.1417V25.1509C39.6552 25.672 39.2757 26.1559 38.9388 26.5745C35.9314 22.8428 29.9184 14.564 29.9184 10.6557C29.9244 5.67847 33.9575 1.64535 38.9347 1.63934ZM3.57238 28.5352L2.32886 26.4672L25.0003 10.831L28.8445 13.4786C29.3905 14.9798 30.0692 16.4291 30.8725 17.8099L25.4626 14.0793C25.1828 13.8868 24.813 13.8868 24.5333 14.0793L3.57238 28.5352ZM6.96753 28.1854L25.0003 15.7499L33.0193 21.2819C35.5128 25.028 38.1011 28.1442 38.3052 28.3944C38.4609 28.5809 38.6914 28.6889 38.9347 28.6889C39.1781 28.6889 39.4086 28.5809 39.5643 28.3944C39.6512 28.2895 40.1611 27.6747 40.9051 26.723L43.0331 28.1886V45.082H29.9184V32.7869C29.9184 32.3342 29.5513 31.9672 29.0987 31.9672H20.902C20.4493 31.9672 20.0823 32.3342 20.0823 32.7869V45.082H6.96753V28.1854ZM28.279 45.082H21.7216V33.6066H28.279V45.082ZM47.9511 48.3607H2.0495V46.7213H47.9511V48.3607Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M32.3783 41.8035H40.575C41.0276 41.8035 41.3947 41.4365 41.3947 40.9838V36.0658C41.3947 35.6131 41.0276 35.2461 40.575 35.2461H32.3783C31.9256 35.2461 31.5586 35.6131 31.5586 36.0658V40.9838C31.5586 41.4365 31.9256 41.8035 32.3783 41.8035ZM33.1979 36.8854H39.7553V40.1641H33.1979V36.8854Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M17.6219 35.2461H9.42514C8.97248 35.2461 8.60547 35.6131 8.60547 36.0658V40.9838C8.60547 41.4365 8.97248 41.8035 9.42514 41.8035H17.6219C18.0745 41.8035 18.4415 41.4365 18.4415 40.9838V36.0658C18.4415 35.6131 18.0745 35.2461 17.6219 35.2461ZM16.8022 40.1641H10.2448V36.8854H16.8022V40.1641Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M39.5709 14.2049C39.9479 14.4562 40.457 14.3542 40.7083 13.9772C40.9597 13.6005 40.8576 13.0915 40.481 12.8401C39.5429 12.2122 38.3189 12.2122 37.3808 12.8401C37.0042 13.0915 36.9021 13.6005 37.1535 13.9772C37.4048 14.3542 37.9139 14.4562 38.2909 14.2049C38.678 13.9447 39.1839 13.9447 39.5709 14.2049Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M42.3038 10.1101C42.6805 10.3614 43.1895 10.2598 43.4409 9.88316C43.6922 9.50655 43.5906 8.99745 43.214 8.74611C40.6249 7.01432 37.2469 7.01432 34.6579 8.74611C34.2813 8.99745 34.1796 9.50655 34.4309 9.88316C34.6823 10.2598 35.1914 10.3614 35.568 10.1101C37.6064 8.74691 40.2655 8.74691 42.3038 10.1101V10.1101Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M40.9392 12.1579C41.3158 12.4092 41.8249 12.3075 42.0763 11.9309C42.3276 11.5543 42.2259 11.0452 41.8493 10.7939C40.0851 9.61559 37.7854 9.61559 36.0212 10.7939C35.6445 11.0452 35.5429 11.5543 35.7942 11.9309C36.0456 12.3075 36.5547 12.4092 36.9313 12.1579C38.1444 11.347 39.7261 11.347 40.9392 12.1579V12.1579Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M46.3127 10.6563C46.3127 6.582 43.01 3.2793 38.9356 3.2793C34.8613 3.2793 31.5586 6.582 31.5586 10.6563C31.5586 14.7307 34.8613 18.0334 38.9356 18.0334C43.008 18.029 46.3083 14.7287 46.3127 10.6563ZM33.1979 10.6563C33.1979 7.48732 35.7666 4.91864 38.9356 4.91864C42.1047 4.91864 44.6733 7.48732 44.6733 10.6563C44.6733 13.8254 42.1047 16.394 38.9356 16.394C35.7682 16.3904 33.2015 13.8238 33.1979 10.6563Z"
                            fill="#3b5a9a"
                          />
                          <path
                            d="M24.9994 30.327C28.1684 30.327 30.7371 27.7583 30.7371 24.5893C30.7371 21.4202 28.1684 18.8516 24.9994 18.8516C21.8304 18.8516 19.2617 21.4202 19.2617 24.5893C19.2653 27.7567 21.832 30.3234 24.9994 30.327ZM20.9831 25.4089H24.1798V28.6056C22.5712 28.2742 21.3145 27.0175 20.9831 25.4089V25.4089ZM25.8191 28.6056V25.4089H29.0157C28.6843 27.0175 27.4276 28.2742 25.8191 28.6056V28.6056ZM29.0157 23.7696H25.8191V20.573C27.4276 20.9043 28.6843 22.1611 29.0157 23.7696ZM24.1798 20.573V23.7696H20.9831C21.3145 22.1611 22.5712 20.9043 24.1798 20.573Z"
                            fill="#3b5a9a"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip2">
                            <rect width="50" height="50" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className={`content ${lang == "en" ? "en" : ""}`}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                )
              )}
          </div>
        </CardWrapper>
        <style jsx>{`
          .usCard {
            width: 100%;
            margin: 0;
            padding: 7rem 0;
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
          }
          .usCard_container {
            width: 80%;
            max-width: 1366px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
          }
          .usCard_container_item {
            background: rgba(255, 255, 255, 0.8);
            padding: 2rem;
            display: flex;
            flex-direction: row-reverse;
            text-align: right;
            margin: 0 0.7rem;
          }
          .usCard_container_item .icon svg {
            width: 100%;
            max-width: 70px;
            min-width: 50px;
          }
          .usCard_container_item .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20%;
          }
          .usCard_container_item .content {
            margin-right: 1rem;
          }
          .usCard_container_item .content.en {
            margin-right: 0;
            margin-left: 1rem;
            text-align: left;
          }
          .usCard_container_item .content h3 {
            margin: 0;
            margin-bottom: 0.3rem;
            font-size: 1rem;
            color: var(--main-blue);
            font-weight: 800;
          }
          .usCard_container_item .content p {
            font-size: 1rem;
            margin: 0;
            color: var(--main-blue);
          }
          @media screen and (max-width: 992px) {
            .usCard {
              background-image: url();
            }
            .usCard_container {
              flex-direction: column;
            }
            .usCard_container_item {
              margin: 0.7rem 0;
            }
            .usCard {
              padding: 3rem 0;
            }
          }
        `}</style>
      </>
    );
  } else {
    return <></>;
  }
};

export default UsCard;
