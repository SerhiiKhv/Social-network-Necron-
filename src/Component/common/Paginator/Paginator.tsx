import React, {useState} from 'react';
import styles from "./Paginator.module.scss";
import cn from 'classnames';

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    portionSize?: number
    onPageChanged: (pageNumber: number) => void
}

let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(Math.ceil(currentPage / portionSize));
    let leftBorder = (portionNumber - 1) * portionSize + 1;
    let rightBorder = portionNumber * portionSize;

    return <div className={styles.paginator}>
        {portionNumber > 1
            && <button className={styles.button} onClick={() => {setPortionNumber((actual) => actual - 1)} }>Back</button>}
        {portionNumber > 1
            && <span className={styles.pageNumber} onClick={() => {setPortionNumber(() => 1)} }>1 ...</span>}

        {pages.filter(p => p >= leftBorder && p <= rightBorder)
            .map(p => {
                return <span className={cn({
                    [styles.selectedPage]: currentPage === p
                }, styles.pageNumber)}
                             key={p}
                             onClick={() => {
                                 onPageChanged(p);
                             }}>{p}</span>
            })}
        {portionNumber < portionCount &&
            <span className={styles.pageNumber}
                  onClick={() => {setPortionNumber(() => portionCount)} }>... {pagesCount}</span>}
        {portionCount > portionNumber &&
            <button className={styles.button} onClick={() => {setPortionNumber((actual) => actual + 1)} }>Next</button>}
    </div>
}

export default Paginator;
