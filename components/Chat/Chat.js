import Style from './Chat.module.css';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

const Chat = ({ callOpen, lang }) => {
    const [close, setclose] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [err, seterr] = useState(false);
    const [success, setSuccess] = useState(false);
    const [time, setTime] = useState(0);
    const [errMsg, setErrMsg] = useState({ type: '', msg: '' });

    const router = useRouter();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (name != '') {
            if (phone.match(/^\d+$/) && phone.length > 10) {
                // if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) && email.contains(".")) {
                if (email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
                    if (message != '') {
                        fetch('https://swagger.pioneer.city-edge-developments.com/api/Home/ContactUsForm', {
                            method: 'POST',
                            body:
                                JSON.stringify({
                                    name: name,
                                    email: email,
                                    phone: phone,
                                    message: message
                                }),
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8',
                                'LanguageCode': lang == 'ar' ? 'ar' : 'en'
                            },
                        }).then(res => res.json())
                            .then(da => {
                                if (!da.isError) {
                                    setSuccess(true)
                                    setName('')
                                    setPhone('')
                                    setEmail('')
                                    setMessage('')
                                    setTimeout(() => {
                                        setSuccess(false)
                                    }, 2000);
                                    document.getElementById("myForm").reset();
                                } else {
                                    seterr(true)
                                    setTimeout(() => {
                                        seterr(false)
                                    }, 2000);
                                }
                            })
                    } else {
                        seterr(true)
                        setErrMsg({ type: 'msg', msg: lang == 'ar' ? 'خطأ فى بيانات الرسالة' : 'invaild message' })
                        setTimeout(() => {
                            seterr(false)
                        }, 2000);
                    }
                } else {
                    seterr(true)
                    setErrMsg({ type: 'mail', msg: lang == 'ar' ? 'خطأ فى بيانات الأيميل' : 'invalid e-mail' })
                    setTimeout(() => {
                        seterr(false)
                    }, 2000);
                }
            } else {
                seterr(true)
                setErrMsg({ type: 'phone', msg: lang == 'ar' ? 'خطأ فى بيانات الهاتف' : 'invaild phone number' })
                setTimeout(() => {
                    seterr(false)
                }, 2000);
            }
        } else {
            seterr(true)
            setErrMsg({ type: 'name', msg: lang == 'ar' ? 'خطأ فى بيانات الاسم' : 'invaild name' });
            setTimeout(() => {
                seterr(false)
            }, 2000);
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setTime(0);
            setclose(false);
        }, 0);
    }, []);
    

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                router.push('/thankyou');
                setclose(!close)
            }, 1500);
        }
    }, [success]);

    useEffect(() => {
        setclose(!close)
    }, [callOpen]);
    return (
        <>
            <div className={`${Style.chat_form} ${lang == 'en' ? Style.en : ''} ${close ? Style.not_active : ''}`}>
                <form onSubmit={handleSubmit} id="myForm">
                    <div className={Style.title}>
                        <div className={Style.close} onClick={() => setclose(!close)}>
                            <svg height="23" viewBox="0 0 24 23" fill="none">
                                <line x1="2.06066" y1="1.93934" x2="22.0603" y2="21.939" stroke="white" strokeWidth="2" />
                                <line x1="1.93934" y1="21.9393" x2="21.939" y2="1.93966" stroke="white" strokeWidth="2" />
                            </svg>
                        </div>
                        <h3>
                            {
                                lang == 'ar' ?
                                    'تواصل معنا'
                                    :
                                    'Contact Us'
                            }
                        </h3>
                    </div>
                    <div className={Style.container}>
                        <div className='errmsg'>
                            <input required type="text" id="firstName" className={Style.input} placeholder={`${lang == 'ar' ? 'الاسم' : 'Name'}`} onChange={(e) => setName(e.target.value)} />
                            {
                                err && errMsg.type == 'name' ? <span>{errMsg.msg}</span> : ''
                            }
                        </div>
                        <div className='errmsg'>
                            <input required type="text" id="phone" className={Style.input} placeholder={`${lang == 'ar' ? 'الموبيل' : 'Phone'}`} onChange={(e) => setPhone(e.target.value)} />
                            {
                                err && errMsg.type == 'phone' ? <span>{errMsg.msg}</span> : ''
                            }
                        </div>
                        <div className='errmsg'>
                            <input required type="email" id="mail" className={Style.input} placeholder={`${lang == 'ar' ? 'البريد الإلكترونى' : 'E-mail'}`} onChange={(e) => setEmail(e.target.value)} />
                            {
                                err && errMsg.type == 'mail' ? <span>{errMsg.msg}</span> : ''
                            }
                        </div>
                        <div className='errmsg'>
                            <textarea required name="mes" id="mes" placeholder={`${lang == 'ar' ? 'أكتب لنا إستفسارك' : 'Tell us more'}`} onChange={(e) => setMessage(e.target.value)}></textarea>
                            {
                                err && errMsg.type == 'msg' ? <span>{errMsg.msg}</span> : ''
                            }
                        </div>
                        <div className={Style.btnContainer}>
                            {
                                err ?
                                    <p className="err">
                                        {
                                            lang == 'ar' ?
                                                'خطأ فى البيانات'
                                                :
                                                'Data error'
                                        }
                                    </p>
                                    : success ?
                                        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                        </svg>
                                        :
                                        <span onClick={handleSubmit}>
                                            <Button path='/' text={`${ lang == 'ar' ? 'ارسال' : 'send'}`} />
                                        </span>
                            }
                        </div>
                    </div>
                </form>
            </div>
            <div className={`${Style.icon} ${lang == 'en' ? Style.en : ''} ${!close ? Style.not_active : ''}`} onClick={() => setclose(!close)}>
                <svg height="21" viewBox="0 0 21 21" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.51487 15.6109C3.65111 15.7476 3.7555 15.9128 3.82061 16.0945C3.88572 16.2762 3.90995 16.47 3.89156 16.6622C3.79932 17.5515 3.62444 18.4303 3.36919 19.2872C5.20012 18.8632 6.31838 18.3724 6.82631 18.1151C7.11441 17.9692 7.44619 17.9346 7.75819 18.018C8.65257 18.2564 9.57438 18.3765 10.5 18.375C15.7448 18.375 19.6875 14.6908 19.6875 10.5C19.6875 6.3105 15.7448 2.625 10.5 2.625C5.25525 2.625 1.3125 6.3105 1.3125 10.5C1.3125 12.4268 2.12231 14.2144 3.51487 15.6109ZM2.86781 20.7362C2.55684 20.7978 2.24486 20.8543 1.932 20.9055C1.6695 20.9475 1.47 20.6745 1.57369 20.4304C1.69023 20.1555 1.79704 19.8767 1.89394 19.5943L1.89787 19.5812C2.22337 18.6362 2.4885 17.5494 2.58563 16.5375C0.975188 14.9231 0 12.81 0 10.5C0 5.42588 4.70137 1.3125 10.5 1.3125C16.2986 1.3125 21 5.42588 21 10.5C21 15.5741 16.2986 19.6875 10.5 19.6875C9.46004 19.6889 8.4244 19.5539 7.41956 19.2859C6.73706 19.6311 5.26837 20.2597 2.86781 20.7362V20.7362Z" fill="white" />
                </svg>
            </div>
        </>
    );
}

export default Chat;
