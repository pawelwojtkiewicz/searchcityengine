import {useEffect} from 'react';

export const useDetectOutSideClick = (ref, handler) => {
    
    const listener = event => {
        console.log(ref);
        console.log(ref.current);
        console.log(event.target);

        if(!ref.current || ref.current.contains(event.target)){
            return;
        }

        handler(false);
    }


    useEffect(() => {
        document.addEventListener('mousedown', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
        }
    });
}