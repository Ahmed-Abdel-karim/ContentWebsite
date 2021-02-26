import Link from 'next/link';
import styles from "./BlogsCard.module.css";

export default function BlogsCard({ blog, listing, lang }) {

    return (
        <>
            <Link href={`/blog/${blog.url}`} target="_blank">
                <a className={`${styles.outerLink} ${listing == 'insideblog' ? styles.bloglistinginblog : ''}`}>
                    <div className={styles.BlogCard}>
                        <div className={styles.bg}>
                            <div className="pc">
                                <img src={blog.pcImage ? blog.pcImage : ''} alt="" loading="lazy" />
                            </div>
                            <div className="mob">
                                <img src={blog.mobileImage ? blog.mobileImage : blog.pcImage ? blog.pcImage : ''} alt="" loading="lazy" />
                            </div>
                            {/* {
                                listing == 'insideblog' ? '' :
                                    <div className={styles.overLay}></div>
                            } */}
                        </div>
                    </div>
                    <h3 className={`${styles.blogName} ${lang == 'en' ? styles.en : ''}`}>{blog.name}</h3>
                </a>
            </Link>
        </>
    )
}

