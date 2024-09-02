import { createContext, useState } from 'react';

export const ElementContext = createContext();

const ElementProvider = props => {
    const [element, setElement] = useState('water');
    
    return (
        <ElementContext.Provider value={{ element, setElement}}>
            {props.children}
        </ElementContext.Provider>
    )
}

export default ElementProvider;