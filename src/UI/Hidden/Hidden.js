import React, {useRef, useEffect} from 'react';
import './Hidden';

const Hidden = () => {
    const hiddenRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            hiddenRef.current.click();
        }, 300)
    }, [])
    return (
        <a 
            ref={hiddenRef}
            className="Hidden" 
            href={`#nav`}>CP</a>
    )
}

export default Hidden;