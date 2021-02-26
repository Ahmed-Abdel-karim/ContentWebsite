import '../styles/globals.css'
import Nav from '../components/Layout/Nav';
import MobNav from '../components/Layout/MobNav';
import Footer from '../components/Layout/Footer';
import { useEffect, useState } from 'react';
import Chat from '../components/Chat/Chat';
import Link from 'next/link';
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const [burgerVisability, setBurgerVisability] = useState(false);

  const [mylogo, setMylogo] = useState({});
  const [navData, setnavData] = useState([]);
  const [contact, setcontact] = useState({});
  const [social, setsocial] = useState([]);
  const [listfooterLinks, setlistfooterLinks] = useState([]);
  const [footerUsObj, setfooterUsObj] = useState({});
  const [open, setOpen] = useState(true);

  const [lang, setLang] = useState();
  const [flag, setFlag] = useState(false);

  const router = useRouter();
  const link = router.query;

  useEffect(() => {
    if (document.cookie.includes('lang=ar')) {
      setLang('ar')
    } else if (document.cookie.includes('lang=en')) {
      setLang('en')
    } else {
      document.cookie = "lang=ar";
      setLang('ar');
    }
  }, []);
  const changeLang = () => {
    // https://pioneerproperty.net
      // router.push('/');
      // window.location.reload();
      window.localStorage.clear();
      window.location = 'https://pioneerproperty.net'
     // window.location = 'http://localhost:3000'
  }

  useEffect(() => {
    async function loadData() {

      if (window.localStorage.getItem('NavDataListTime') != null) {
        if (new Date(window.localStorage.getItem('NavDataListTime')).getMinutes() + 5 < new Date().getMinutes()) {
          window.localStorage.removeItem('NavDataList');
          window.localStorage.removeItem('NavDataListTime');
        }
      }
      if (window.localStorage.getItem('NavDataList') != null && !flag) {
        setnavData(JSON.parse(window.localStorage.getItem('NavDataList')))
      } else {
        const NavDataList = await fetch('https://swagger.pioneer.city-edge-developments.com/api/Home/ListNavbar', {
          method: "get",
          headers: {
            'LanguageCode': lang == 'ar' ? 'ar' : 'en'
          }
        })
        const List = await NavDataList.json()
        window.localStorage.setItem('NavDataList', JSON.stringify(List.data));
        window.localStorage.setItem('NavDataListTime', new Date());
        setnavData(List.data);
      }

      if (window.localStorage.getItem('LogoIconTime') != null) {
        if (new Date(window.localStorage.getItem('LogoIconTime')).getMinutes() + 5 < new Date().getMinutes()) {
          window.localStorage.removeItem('LogoIcon');
          window.localStorage.removeItem('LogoIconTime');
        }
      }
      if (window.localStorage.getItem('LogoIcon') != null && !flag) {
        setMylogo(JSON.parse(window.localStorage.getItem('LogoIcon')))
      } else {
        const LogoIcon = await fetch('https://swagger.pioneer.city-edge-developments.com/api/Home/GetLogo', {
          method: "get",
          headers: {
            'LanguageCode': lang == 'ar' ? 'ar' : 'en'
          }
        })
        const logo = await LogoIcon.json()
        window.localStorage.setItem('LogoIcon', JSON.stringify(logo.data));
        window.localStorage.setItem('LogoIconTime', new Date());
        setMylogo(logo.data);
      }

      if (window.localStorage.getItem('contactDataTime') != null) {
        if (new Date(window.localStorage.getItem('contactDataTime')).getMinutes() + 5 < new Date().getMinutes()) {
          window.localStorage.removeItem('contactData');
          window.localStorage.removeItem('contactDataTime');
        }
      }
      if (window.localStorage.getItem('contactData') != null && !flag) {
        setcontact(JSON.parse(window.localStorage.getItem('contactData')))
      } else {
        const contactData = await fetch('https://swagger.pioneer.city-edge-developments.com/api/Home/GetHomeContact', {
          method: "get",
          headers: {
            'LanguageCode': lang == 'ar' ? 'ar' : 'en'
          }
        })
        const Listofcontact = await contactData.json()
        setcontact(Listofcontact.data);
        window.localStorage.setItem('phone', Listofcontact.data.hotline);
        window.localStorage.setItem('contactData', JSON.stringify(Listofcontact.data));
        window.localStorage.setItem('contactDataTime', new Date());
      }

      if (window.localStorage.getItem('socialDataTime') != null) {
        if (new Date(window.localStorage.getItem('socialDataTime')).getMinutes() + 5 < new Date().getMinutes()) {
          window.localStorage.removeItem('socialData');
          window.localStorage.removeItem('socialDataTime');
        }
      }
      if (window.localStorage.getItem('socialData') != null && !flag) {
        setsocial(JSON.parse(window.localStorage.getItem('socialData')))
      } else {
        const socialData = await fetch('https://swagger.pioneer.city-edge-developments.com/api/Home/ListSocailMedia', {
          method: "get",
          headers: {
            'LanguageCode': lang == 'ar' ? 'ar' : 'en'
          }
        })
        const listOfSocial = await socialData.json()
        window.localStorage.setItem('socialData', JSON.stringify(listOfSocial.data));
        window.localStorage.setItem('socialDataTime', new Date());
        setsocial(listOfSocial.data);

      }

      if (window.localStorage.getItem('footerLinksTime') != null) {
        if (new Date(window.localStorage.getItem('footerLinksTime')).getMinutes() + 5 < new Date().getMinutes()) {
          window.localStorage.removeItem('footerLinks');
          window.localStorage.removeItem('footerLinksTime');
        }
      }
      if (window.localStorage.getItem('footerLinks') != null && !flag) {
        setlistfooterLinks(JSON.parse(window.localStorage.getItem('footerLinks')))
      } else {
        const footerLinks = await fetch('https://swagger.pioneer.city-edge-developments.com/api/Home/ListFooterLinks', {
          method: "get",
          headers: {
            'LanguageCode': lang == 'ar' ? 'ar' : 'en'
          }
        })
        const ListFooter = await footerLinks.json()
        setlistfooterLinks(ListFooter.data);
        window.localStorage.setItem('footerLinks', JSON.stringify(ListFooter.data));
        window.localStorage.setItem('footerLinksTime', new Date());

      }

      if (window.localStorage.getItem('usFooterTime') != null) {
        if (new Date(window.localStorage.getItem('usFooterTime')).getMinutes() + 5 < new Date().getMinutes()) {
          window.localStorage.removeItem('usFooter');
          window.localStorage.removeItem('usFooterTime');
        }
      }
      if (window.localStorage.getItem('usFooter') != null && !flag) {
        setfooterUsObj(JSON.parse(window.localStorage.getItem('usFooter')))
      } else {
        const footerUs = await fetch('https://swagger.pioneer.city-edge-developments.com/api/Home/GetAboutUsFooter', {
          method: "get",
          headers: {
            'LanguageCode': lang == 'ar' ? 'ar' : 'en'
          }
        })
        const usFooter = await footerUs.json()
        setfooterUsObj(usFooter.data);
        window.localStorage.setItem('usFooter', JSON.stringify(usFooter.data));
        window.localStorage.setItem('usFooterTime', new Date());
        setFlag(false);
      }
    }
    if (lang) {
      loadData();
    }
  }, [lang]);
  useEffect(() => {
    navData && navData.map(category => {
      category.cities.map(item => {
        window.localStorage.setItem(`${item.name.replace(' ', '-')}-${category.propertyUrl}`, item.id);
      })
    })
  }, [navData]);

  const whatssApp = () => {
    if (Object.keys(link).length === 0 && link.constructor === Object) {
      window.open(`https://api.whatsapp.com/send?phone=2${contact.mobileNumber}&text=${lang == 'ar' ? 'مرحبا لدي استفسار عن' : 'Hey, I have a question about '}`)
    } else {
      window.open(`https://api.whatsapp.com/send?phone=2${contact.mobileNumber}&text=${lang == 'ar' ? 'مرحبا لدي استفسار عن' : 'Hey, I have a question about'} ${Object.values(link)}`)
    }
  }

  if (lang) {
    return (
      <div className="mybody" dir={lang == 'ar' ? 'ltr' : 'rtl'}>
        <div className="mymain">
          <div className={`fixedContacts ${lang == 'en' ? 'en' : ''}`}>
            <div className="whats_button" onClick={whatssApp}>
              <svg height="20" viewBox="0 0 21 20" fill="none">
                <path d="M17.3281 2.90625C15.4569 1.03125 12.9681 0 10.3169 0C4.85562 0 0.410625 4.445 0.410625 9.91C0.410625 11.6562 0.868125 13.3637 1.73438 14.8637L0.328125 20L5.58187 18.6213C7.03062 19.41 8.66063 19.8288 10.3156 19.8288H10.3194C15.7806 19.8288 20.2294 15.3837 20.2294 9.91875C20.2294 7.27 19.1981 4.7825 17.3269 2.9075L17.3281 2.90625ZM10.3194 18.1562C8.83938 18.1562 7.38938 17.7575 6.12438 17.0075L5.82312 16.8275L2.70563 17.6437L3.53813 14.605L3.34313 14.2925C2.51438 12.9837 2.08187 11.4688 2.08187 9.91C2.08187 5.3675 5.77688 1.67125 10.3244 1.67125C12.5231 1.67125 14.5944 2.53125 16.1481 4.085C17.7031 5.64375 18.5581 7.71 18.5581 9.9125C18.5544 14.4587 14.8594 18.155 10.3194 18.155V18.1562ZM14.8356 11.985C14.5894 11.86 13.3706 11.2625 13.1444 11.18C12.9181 11.0975 12.7531 11.055 12.5856 11.305C12.4219 11.5512 11.9456 12.11 11.8006 12.2775C11.6556 12.4412 11.5119 12.465 11.2656 12.34C11.0194 12.215 10.2181 11.9537 9.27312 11.11C8.53813 10.4537 8.03937 9.64125 7.89437 9.395C7.74937 9.14875 7.87813 9.0125 8.00438 8.89125C8.11813 8.78125 8.25063 8.6025 8.37563 8.4575C8.50063 8.3125 8.53938 8.21125 8.62188 8.04375C8.70438 7.88 8.66438 7.735 8.60188 7.61C8.53938 7.485 8.04313 6.26625 7.84063 5.77C7.64188 5.285 7.43438 5.3525 7.28188 5.34375C7.13688 5.33625 6.97312 5.33625 6.80937 5.33625C6.64562 5.33625 6.37563 5.39875 6.14937 5.645C5.92312 5.89125 5.28188 6.4925 5.28188 7.71125C5.28188 8.93 6.16813 10.1063 6.29313 10.2738C6.41813 10.4375 8.03937 12.9412 10.5231 14.0125C11.1131 14.2662 11.5744 14.4187 11.9331 14.5362C12.5269 14.7237 13.0656 14.6962 13.4919 14.6337C13.9681 14.5638 14.9569 14.0362 15.1644 13.4575C15.3719 12.8787 15.3719 12.3837 15.3094 12.2812C15.2506 12.1713 15.0869 12.11 14.8369 11.9837L14.8356 11.985Z" fill="white" />
              </svg>
            </div>
            <Link href={`tel:${contact.hotline}`}>
              <a className="tell_button">
                <svg height="21" viewBox="0 0 20 21" fill="none">
                  <path d="M14.9296 1C16.2067 1 18.0643 2.44698 18.5288 3.41164C19.1925 4.79033 19.083 5.33196 18.6449 6.78793C18.0643 8.71724 16.3623 12.1371 14.0007 14.5052C10.6338 17.8815 7.49897 19.3285 6.10574 19.8108C4.7125 20.2931 3.20316 19.8108 2.27434 18.8461C1.34551 17.8815 0.416687 16.9168 1.46161 15.4698C2.20207 14.4445 3.28073 13.2591 4.5964 12.5759C5.79271 11.9546 6.50566 12.1808 6.91846 13.0582C7.14666 13.5433 7.21753 14.4724 7.38287 14.9875C7.59146 15.6374 8.4278 15.4698 9.35662 14.9875C10.2459 14.5257 12.4914 12.5759 14.349 9.6819C15.5 7.88889 13.6603 7.87727 12.4914 7.27026C11.5626 6.78793 11.2746 5.67856 12.027 4.37629C13.4202 1.96466 13.8846 1 14.9296 1Z" fill="white" strokeWidth="0" />
                </svg>
              </a>
            </Link>
            <div className="call_button" onClick={() => setOpen(!open)}>
              <span>
                {
                  lang == 'ar' ?
                    'تواصل معنا'
                    :
                    'contact us'
                }
              </span>
              <div className="border"></div>
            </div>
          </div>

          <Nav burgerVisability={burgerVisability} setBurgerVisability={setBurgerVisability} contact={contact} navData={navData} social={social} whatssApp={whatssApp} logo={mylogo.siteLogo} lang={lang} setLang={setLang} setFlag={setFlag} flag={flag} changeLang={changeLang} />
          <MobNav burgerVisability={burgerVisability} setBurgerVisability={setBurgerVisability} lang={lang} contact={contact} navData={navData} social={social} whatssApp={whatssApp} />

          {/* arrow up */}
          <Chat callOpen={open} lang={lang} />
          <Component {...pageProps} lang={lang} flag={flag} />
        </div>
        <Footer contact={contact} social={social} whatssApp={whatssApp} listfooterLinks={listfooterLinks} footerUsObj={footerUsObj} whatssApp={whatssApp} logo={mylogo.footerLogo} lang={lang} />
      </div>
    )
  } else {
    return ''
  }
}

export default MyApp