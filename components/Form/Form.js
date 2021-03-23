import React from 'react'

export default function App ({children}) {
    
    children.forEach(child => {
        console.log(child);
    })
    
    return (
        <>  

        </>
    )
}