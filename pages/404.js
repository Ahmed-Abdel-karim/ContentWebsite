import Button from '../components/Button/Button';
export default function Custom404({lang}) {
    return (
        <div id="notfound">
            {
                lang == 'ar' ? 
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1>Oops!</h1>
                        </div>
                        <h2>404 - الصفحة غير موجودة</h2>
                        <p>ربما تمت إزالة الصفحة التي تبحث عنها إذا تم تغيير اسمها أو أنها غير متاحة مؤقتًا.</p>
                        <Button path='/' text="العودة الى الرئيسية" />
                    </div>
                :
                    <div className="notfound" dir='ltr'>
                        <div className="notfound-404">
                            <h1>Oops!</h1>
                        </div>
                        <h2>404 - Page not found</h2>
                        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                        <Button path='/' text="Go To Homepage" />
                    </div>
            }
        </div>
    )
}