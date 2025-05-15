import styles from './Pagination.module.css';

function Pagination({ currentPage, totalPages, maxVisiblePageBtn, onPageChange }) {
    function handlePageChange(targetPage) {
        if (targetPage < 1) return;
        onPageChange(targetPage);
        return;
    };

    function renderPageButtons() {
        const buttons = [];

        buttons.push(
            <button 
                key={1}
                type='button'
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
            >
                1
            </button>
        );

        const ceil = Math.ceil(maxVisiblePageBtn / 2);
        const floor = Math.floor(maxVisiblePageBtn / 2); 
        
        if (totalPages < maxVisiblePageBtn) {
            for (let i = 2; i < totalPages; i++) {
                buttons.push(            
                    <button 
                        key={i}
                        type='button'
                        onClick={() => handlePageChange(i)}
                        disabled={currentPage === i}
                    >
                        {i}
                    </button>
                );
            };    
        }
        else if (currentPage <= ceil) {
            for (let i = 2; i < maxVisiblePageBtn; i++) {
                buttons.push(
                    <button 
                        key={i}
                        type='button'
                        onClick={() => handlePageChange(i)}
                        disabled={currentPage === i}
                    >
                        {i}
                    </button>
                );
            };

            buttons.push(<span>. . .</span>);
        }
        else if (currentPage >= totalPages - floor) {
            buttons.push(<span>. . .</span>);

            for (let i = totalPages - (maxVisiblePageBtn - 2); i < totalPages; i++) {
                buttons.push(
                    <button 
                        key={i}
                        type='button'
                        onClick={() => handlePageChange(i)}
                        disabled={currentPage === i}
                    >
                        {i}
                    </button>
                );
            };
        }
        else {
            buttons.push(<span >. . .</span>);

            const numberOfSideButtons = Math.floor((maxVisiblePageBtn - 3) / 2);
            for (let i = currentPage - numberOfSideButtons; i <= currentPage + numberOfSideButtons; i++) {
                buttons.push(
                    <button 
                        key={i}
                        type='button'
                        onClick={() => handlePageChange(i)}
                        disabled={currentPage === i}
                    >
                        {i}
                    </button>
                );
            };

            buttons.push(<span>. . .</span>);
        };

        if (totalPages > 1) {
            buttons.push(
                <button 
                    key={totalPages}
                    type='button'
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    {totalPages}
                </button>
            );
        };

        return buttons;
    };

    return (
        <div className={`${styles.pagination} font-xxs`}>
            <button 
                type='button' 
                onClick={() => handlePageChange(currentPage - 1)}
            >
                <span>{'<'}</span> Previous
            </button>
            <div>
                {renderPageButtons()}
            </div>
            <button 
                type='button' 
                onClick={() => handlePageChange(currentPage + 1)}
            >
                Next <span>{'>'}</span>
            </button>
        </div>   
    );
};

export default Pagination;