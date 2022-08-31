import React,{Component,useState, useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Rest from './Rest';
import ImageDefault from './ImageDefault';

const axios=require('axios').default;


const dataSrcBox=ImageDefault.defaultImage;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 0 }}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}



export default function CardImage(props) {
    const role=props.role;
    const width=props.width?props.width:650;
    const height=props.height?props.height:360;
    const photoUrl=role=="reader"?props.photoUrl:(role=="writer"?dataSrcBox:null);
    const [value, setValue] = React.useState(1);
    const [images, setImages] = React.useState([]);
    const [word, setWord] = React.useState("");

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
  
    const handleStep=function(st) {
        if(props.changeActiveStep && images && images.length>0){
            props.changeActiveStep(images[activeStep+st].imgPath);
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        handleStep(1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        handleStep(-1);
    };

    const handleChange = (event, newValue) => {
        //console.log(newValue)
        setValue(newValue);
        if(newValue==1){
            setTimeout(paste,100);
        }
    };

    const paste=()=>{
        document.getElementById('pasteArea').onpaste = function (event) {
            // use event.originalEvent.clipboard for newer chrome versions
            var items = (event.clipboardData  || event.originalEvent.clipboardData).items;
            //console.log(JSON.stringify(items)); // will give you the mime types
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
                //console.log(event.target.result); // data url!
                    document.getElementById("pastedImage").src = event.target.result;
                    var format = event.target.result.split('data:image/')[1].split(';base64')[0];
                    if(props.pasteImage){
                        props.pasteImage(event.target.result,format);
                    }
                };
                reader.readAsDataURL(blob);
            }
        }
    };

    if(role=="writer") {
        props.query(function(expr){
            setWord(expr);
            Rest.findPhotos(expr)
            .then(res=>{
                setImages(res);
                if(props.changeActiveStep && res && res.length>0) props.changeActiveStep(res[activeStep].imgPath);
            });
        });
    }
    

    useEffect(() => {
        if(role=="writer") {
            
            paste();
            setValue(0);

        }
    },[]);

    

    return (
        <Stack spacing={0}>
            {
                role=="writer" &&
                <div>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth" >
                            <Tab label="find" />
                            <Tab label="paste" />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        {
                            images.map((step, index) => (
                                <div key={"label_"+index}>
                                    {activeStep==index? (
                                    <Box
                                        component="img"
                                        sx={{
                                        height:height,
                                        display: 'block',
                                        width:width,
                                        overflow: 'hidden',
                                        width: '100%',
                                        border: "3px solid gray"
                                        }}
                                        src={step.imgPath}
                                    />
                                    ) : null}
                                </div>
                            ))
                        }
                        <MobileStepper
                            variant="dots"
                            steps={images.length}
                            position="static"
                            activeStep={activeStep}
                            sx={{ maxWidth: width, flexGrow: 1 }}
                            nextButton={
                                <Button size="small" onClick={handleNext} disabled={activeStep === images.length-1}>
                                Next
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                                Back
                                </Button>
                            }
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Box
                            sx={{
                                width: width,
                                height: height
                                }
                            }
                        >
                            <img id="pastedImage" style={{width:width,height:height,border: "3px solid gray"}} src={photoUrl} />
                        </Box>
                        <Box
                            sx={{
                                width: width,
                                height: role=="writer"?35:0,
                                //backgroundColor: 'primary.dark',
                                // '&:hover': {
                                // backgroundColor: 'primary.main',
                                // opacity: [0.9, 0.8, 0.7],
                                // },
                            }}
                        >

                            <div>
                                <input type="text" id="pasteArea" placeholder='click here and press Ctrl+V to paste an image' style={{width:width,height:20}} />
                                <div style={{marginTop:-10}}>
                                <font size='1'><i><a href={"https://www.google.com/search?tbm=isch&q="+(word?word:"")} target={"_blank"}>find an image</a></i></font>
                                </div>
                            </div>
                                
                        </Box>
                    </TabPanel>
                </div>
            }
            {
                role=="reader" &&
                <Box
                    sx={{
                        width: width,
                        height: height
                        }
                    }
                >
                    <img id="pastedImage" style={{width:width,height:height,border: "3px solid gray"}} src={photoUrl} />
                </Box>
            }
        </Stack>
    );
};