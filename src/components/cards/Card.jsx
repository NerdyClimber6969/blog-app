import React from 'react';

function Card({ className, children }) {
    const imageSection = React.Children.toArray(children).find(
        child => React.isValidElement(child) && child.type === Image
    );

    const contentSection = React.Children.toArray(children).find(
        child => React.isValidElement(child) && child.type === MainContent
    );

    const attributionSection = React.Children.toArray(children).find(
        child => React.isValidElement(child) && child.type === Attribution
    );

    return (
        <article className={`card ${className ? className: ''}`}>
            {imageSection}
            {contentSection}
            {attributionSection}
        </article>
    );
};

function Image({ children, className }) {
    return (
        <section className={`card-image-section ${className ? className : ''}`}>
            {children}
        </section>
    );
};

function MainContent({ children, className }) {
    return (
        <section className={`card-content-section ${className ? className : ''}`}>
            {children}
        </section>
    );
};

function Attribution({ children, className }) {
    return (
        <section className={`card-attribution-section ${className ? className : ''}`}>
            {children}
        </section>
    );
};

Card.Image = Image;
Card.MainContent = MainContent;
Card.Attribution = Attribution;

export default Card;