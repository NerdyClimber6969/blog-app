import { useEffect, useState, useRef } from 'react';
import Skeleton from '../components/Skeleton.jsx';

function Swiper({ fetchData, render }) {
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
            className='swiper'
            ref={containerRef}
        >
            <button 
                className='swiper-btn previous-btn'
                onClick={() => goToPrevious()}
                disabled={loading ? true : false}
            >
                &lt;
            </button>
            <div 
                className='swiper-content'
                style= {{width: `${containerWidth}px`}}
            >
                {loading ? (
                    Array(3).fill().map((_, index) => (
                        <div 
                            className='swiper-item' 
                            key={index}
                        > 
                            <Skeleton />                                   
                        </div>
                    ))
                ) : (
                    items.map((item, index) => (
                        <div 
                            className='swiper-item'
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
                    className='swiper-btn next-btn'
                    onClick={() => goToNext()}
                    disabled={loading ? true : false}
                >
                    &gt;
            </button>
        </div>
    )
};

export default Swiper;