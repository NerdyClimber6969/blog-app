import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div>
                <aside>
                    <h3 className='font-sm'>DevBlog</h3>
                    <p className='font-xs'>Discover insights, tutorials, and stories from the world of web development</p>
                </aside>
            </div>
            <div className={styles.navBarLayout}>
                <nav>
                    <h6 className='font-sm'>Services</h6>
                    <ul>
                        <li><a className='font-xs'>Branding</a></li>
                        <li><a className='font-xs'>Design</a></li>
                        <li><a className='font-xs'>Marketing</a></li>
                        <li><a className='font-xs'>Advertisement</a></li>  
                    </ul>
                </nav>
                <nav>
                    <h6 className='font-sm'>Company</h6>
                    <ul>
                        <li><a className='font-xs'>About us</a></li>
                        <li><a className='font-xs'>Contact</a></li>
                        <li><a className='font-xs'>Jobs</a></li>
                        <li><a className='font-xs'>Press kit</a></li>
                    </ul>   
                </nav>
                <nav>
                    <h6 className='font-sm'>Legal</h6>
                    <ul>
                        <li><a className='font-xs'>Terms of use</a></li>
                        <li><a className='font-xs'>Privacy policy</a></li>
                        <li><a className='font-xs'>Cookie policy</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;