import {useEffect} from 'react';

export const useDetectOutSideClick = (ref, handler) => {
    useEffect(() => {
        const listener = event => {
            if(!ref.current || ref.current.contains(event.target)){
                return;
            }
            handler(false);
        }

        document.addEventListener('mousedown', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
        }
    }, [ref, handler]);
}