import React from "react";
import styles from './Hero.module.css';

function Hero({ title, text, children }) {
    const actionComponent = React.Children.toArray(children).find((child) => 
        React.isValidElement(child) && child.type === Hero.Action
    );

    const imgComponent = React.Children.toArray(children).find((child) => 
        React.isValidElement(child) && child.type === Hero.Image
    );

    return (
        <div className={styles.hero}>          
            <div className={styles.image}>
                <h1 className={`${styles.title} font-hero mb3`}>{title}</h1>
                <p className='font-sm'>{text}</p>
            </div>
            {actionComponent}
        
            {imgComponent}
        </div>
    );
}

Hero.Action = ({ className='', children }) => {
    return (
        <div className={`${styles.action} ${className}`}>
            {children}
        </div>
    );
};

Hero.Image = ({ className='', alt, src, size }) => {
    const imageSizeClasses = {
        small: 'img-sm',
        medium: 'img-md',
        large: 'img-lg'
    };

    const sizeClass = imageSizeClasses[size] || imgSize.small;

    return (     
        <div className={`${styles.imageContainer} ${sizeClass} ${className}`}>
            <img 
                alt={alt ? alt : 'Hero image'} 
                className={styles.image} 
                src={src}
            />
        </div>
    );
};

export default Hero;