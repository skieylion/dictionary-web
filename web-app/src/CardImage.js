import React,{Component,useState, useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


const axios=require('axios').default;

export default function CardImage(props) {
    const role=props.role;
    const width=props.width?props.width:650;
    const height=props.height?props.height:360;

    useEffect(() => {
        document.getElementById('pasteArea').onpaste = function (event) {
            // use event.originalEvent.clipboard for newer chrome versions
            var items = (event.clipboardData  || event.originalEvent.clipboardData).items;
            console.log(JSON.stringify(items)); // will give you the mime types
            // find pasted image among pasted items
            var blob = null;
            for (var i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image") === 0) {
                blob = items[i].getAsFile();
                }
            }
            // load image if there is a pasted image
            if (blob !== null) {
                var reader = new FileReader();
                reader.onload = function(event) {
                console.log(event.target.result); // data url!
                document.getElementById("pastedImage").src = event.target.result;
                };
                reader.readAsDataURL(blob);
            }
        }
    },[]);

    

    return (
        <Stack spacing={0}>
            <Box
                sx={{
                    width: width,
                    height: height
                    }
                }
            >
                <img id="pastedImage" style={{width:width,height:height,border: "1px solid black"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAooAAAFoCAIAAABfck3PAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABqTSURBVHhe7d35f1X1gf/x+d++iiyiuNRatdXWLtbW2lqn29jaxU4tGHYQRDEhBJA1giD7GlbZZM0CJAgCYQmQUAJk6fcDyTDOQeLNzU3yOfc8n4/3Y36oyUmG+3jklXPvybn/8W8AIDLyDADRkWcAiI48A0B05BkAoiPPABAdeQaA6MgzAERHngEgOvIMANGRZwCIjjwDQHTkGQCiI88AEB15BoDoyDMAREeeASA68gwA0ZFnAIiOPANAdOQZAKIjzwAQHXkGgOjIMwBER54BIDryDADRkWcAiI48A0B05BkAoiPPABAdeQaA6MgzAERHngEgOvIMANGRZwCIjjwDQHTkGQCiI88AEB15BoDoyDMAREeeASA68gwA0ZFnAIiOPANAdOQZAKIjzwAQHXkGgOjIMwBER54BIDryDADRkWcAiI48A0B05BkAoiPPABAdeQaA6MgzAERHngEgOvIMANGRZwCIjjwDQHTkGQCiI88AEB15BoDoyDMAREeeASA68gwA0ZFnAIiOPANAdOQZAKIjzwAQHXkGgOjIMwBER54BIDryDADRkWcAiI48A0B05BkAoiPPABAdeQaA6MgzAERHngEgOvIMANGRZwCIjjwDQHTkGQCiI88AEB15BoDoyDMAREeeASA68gwA0ZFnAIiOPANAdOQZAKIjzwAQHXkGgOjIMwBER54BIDryDADRkWcAiI48A0B05BkAoiPPFLPO/9He0XHtxq1TTf86cLrps4aLO+sv2KBv36lLNY1XG1ta28LD0/1AdXY/cpB58kwxu3aj7fiFlqrj58t2HB+37ug7a49YhJu2pXbZwdP7TjVdbLkRSt394EG2yTNFKJyE3Whrr2tsnre7YermmpJ7emARbvz6ox9uP76h5tyFlht3Tqa7H03IJnmm2IQf62euXF9x6MuJG5wup3IfbDt2+Mzl1lvtCk2WyTNFpb2j48SFlvDzvWRd8oe+pWiTN1avrT579fpNJ9FkljxTPEKbaxqvhjYnftZbGjdu3dHlB0+Hc+juRxcyRp4pEuE0q+5883tVdYmf8pbqrTl65vrNNufQZJA8UyRutLXP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rj+xcc6BeZN3Tn1r0z9+s/r3v1jxq5eXvfLS0p/9/JNXf/Xp639a9+fRVe+8v2fmsurlW09uO3Tu0Nnms6HKbR1twgz3kmcAiI48A0B05BkAoiPPABAdeQaA6MgzAERHngEgOvIMANGRZwCIjjwDQHTkGQCiI88AEB15BoDoyDMAREeeASA68gwA0ZFnAIiOPANAdOQZAKIjzwAQHXkGgOjIMwBER54BIDryDADRkWcAiI48A0B05BkAoiPPABAdeQaA6MgzAERHngEgOvIMANGRZwCIjjwDQHTkGQCiI88AEB15BoDoyDMAREeeASA68gwA0ZFnAIiOPANAdOQZAKIjzwAQHXkGgOjIMwBER54BIDryDADRkWcAiI48A0B05BkAoiPPABAdeQaA6MgzAERHngEgOvIMANGRZwCIjjwDQHTkGQCiI88AEB15BoDoyDMAREeeASA68gwA0ZFnAIiOPANAdOQZAKIjzwAQHXkGgOjIMwBER54BIDryDADRkWcAiI48A0B05BkAoiPPABAdeQaA6MgzAERHngEgOvIMANGRZwCIjjwDQHTkGQCiI88AEB15BoDoyDMAREeeASA68gwA0ZFnAIiOPANAdOQZAKIjzwAQHXkGgOjIMwBER54BIDryDADRkWcAiI48A0B05BkAoiPPABAdeQaA6MgzAERHngEgOvIMANGRZwCIjjwDQHTkGQCiI88AEB15BoDoyDMAREeeASA68gwA0ZFnAIiOPANAdOQZAKIjzwAQHXkGgOjIMwBE5t///v/ytUdFRs9YVwAAAABJRU5ErkJggg=="></img>
            </Box>
            <Box
                sx={{
                    width: width,
                    height: role=="writer"?30:0,
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
                {
                    role=="writer" &&
                    <input type="text" id="pasteArea" placeholder='click here and press Ctrl+V to paste an image' style={{width:width,height:30}}></input>
                }
            </Box>
        </Stack>
    );
};