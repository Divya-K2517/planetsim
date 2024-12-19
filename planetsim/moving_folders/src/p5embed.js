import React from 'react';
import ScriptTag from 'react-script-tag';

const P5embed = () => {
    return (
        <div>
            {/* <iframe
                src="/Users/divyakumari/planetsim/planetsim/moving_folders/src/p5/p5.html"
                title = "planet_sim"
                width = "400"
                height = "400"
            >


            </iframe> */}
            
            <ScriptTag type="text/javascript" src="sketch.js" />
        </div>
    );


}

export default P5embed;