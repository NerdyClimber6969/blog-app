import { useEffect, useState, useRef } from 'react';
import styles from './Swiper.module.css';

function Swiper({ fetchData, render, skeletonRender }) {
    const { data: items, loading } = fetchData();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [containerWidth, setContainerWidth] = useState();
    const containerRef = useRef();
    
    useEffect(() => {
        const handleResize = () => {
            setContainerWidth(Math.min(1280, window.innerWidth * 0.8));
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [])

    function goToNext() {
        setCurrentIndex((index) => {
            if (index >= items.length - 1) return 0;
            return index + 1;
        });
    };

    function goToPrevious() {
        setCurrentIndex((index) => {
            if (index === 0) return items.length - 1;
            return index - 1;
        });
    };

    return (
        <div 
            className={styles.swiper}
            ref={containerRef}
        >
            <button 
                className={styles.btn}
                onClick={() => goToPrevious()}
                disabled={loading ? true : false}
            >
                &lt;
            </button>
            <div 
                className={styles.content}
                style= {{width: `${containerWidth}px`}}
            >
                {loading ? (
                    Array(3).fill().map((_, index) => (
                        <div 
                            className={styles.item}
                            key={index}
                        > 
                            {skeletonRender()}                                
                        </div>
                    ))
                ) : (
                    items.map((item, index) => (
                        <div 
                            className={styles.item}
                            key={item.id}
                            style={{
                                transform: `translateX(${-100 * currentIndex}%)`,
                                transition: 'transform 0.3s ease'
                            }}
    
                        >
                            {render(item)}
                        </div>
                    ))
                )}
            </div>   
            <button 
                    className={styles.btn}
                    onClick={() => goToNext()}
                    disabled={loading ? true : false}
                >
                    &gt;
            </button>
        </div>
    );
};

export default Swiper;