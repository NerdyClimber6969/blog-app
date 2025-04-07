import React from "react";
import '../style/components/_hero.css';

function Hero({ title, text, children }) {
    const actionComponent = React.Children.toArray(children).find((child) => 
        React.isValidElement(child) && child.type === Hero.Action
    );

    const imgComponent = React.Children.toArray(children).find((child) => 
        React.isValidElement(child) && child.type === Hero.Image
    );

    return (
        <div className='hero grid'>          
            <div className='hero-content'>
                <h1 className='hero-title font-hero mb3'>{title}</h1>
                <p className='hero-text font-sm'>{text}</p>
            </div>
            {actionComponent}
        
            {imgComponent}
        </div>
    );
}

Hero.Action = ({ className='', children }) => {
    return (
        <div className={`hero-action ${className}`}>
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
        <div className={`hero-image-container ${sizeClass} ${className}`}>
            <img 
                alt={alt ? alt : 'Hero image'} 
                className='hero-image m-lr-center' src={src}
            />
        </div>
    );
};

export default Hero;