import { useState } from 'react';
import { useDoubleClick } from 'jhooks';


export default () => {
    const [num, setNum] = useState(0)
    useDoubleClick(document.body, () => {
        setNum(pre => pre + 1)
    }, { delay: 300 })
    return (
        <div>
            {num}
        </div>
    )
}