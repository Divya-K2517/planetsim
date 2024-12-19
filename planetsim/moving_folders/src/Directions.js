import React from "react";

const Directions = () => {
    const directionsStyle = {
        width: '200px',
        position: 'fixed',
        top: '0',
        left: '0',
        height: '100%',
        backgroundColor: '#f4f4f4',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
    };
    return (
        <div style={directionsStyle}>
            <h2>Directions</h2>
            <ul>
                <li> Direction 1</li>
                <li> Direction 2</li>
                <li> Direction 3</li>
            </ul>
        </div>
    );


}

export default Directions;