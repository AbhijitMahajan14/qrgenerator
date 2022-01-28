import React, {useState, useRef} from 'react';
import {Container, Card, CardContent, makeStyles, Grid, TextField, Button} from '@material-ui/core';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';


function App() { 
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const classes = useStyles();
  const qrRef = useRef(null);


  const generateQrCode = async () => {
    try {
          const response = await QRCode.toDataURL(text);
          setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
      if (result) {
          setScanResultFile(result);
      }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result){
        setScanResultWebCam(result);
    }
   }
  return (
    <Container className={classes.conatiner}>
          <Card>
              <h1 className={classes.title}><img src="./qrcode-solid.svg" alt="logo" height="35em"/>&nbsp;HeyQR</h1>
              <CardContent>
                  <Grid container spacing={2}>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                          <TextField  label="Enter Text Here" onChange={(e) => setText(e.target.value)}/>
                          &nbsp;&nbsp;
                          <Button className={classes.btn} variant="contained" 
                            color="dark" onClick={() => generateQrCode()}>Generate QR 🛠</Button>
                            <br/>
                            <br/>
                            <br/>
                            {imageUrl ? (
                              <a href={imageUrl} download>
                                  <img src={imageUrl} alt="img"/>
                              </a>) : null}
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <Button className={classes.btn} variant="contained" color="btn btn-secondary" onClick={onScanFile}>Upload QR Code 📤</Button>
                        <QrReader
                          ref={qrRef}
                          delay={300}
                          style={{width: '100%'}}
                          onError={handleErrorFile}
                          onScan={handleScanFile}
                          legacyMode
                        />
                        <h3>🔭Scanned Code :<br/> {scanResultFile}</h3>
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                         <h3>Scan Here 📸</h3>
                         <QrReader
                         delay={300}
                         style={{width: '100%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam}
                         />
                         <h3>{scanResultWebCam}</h3>
                      </Grid>
                  </Grid>
              </CardContent>
          </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
    conatiner: {
      marginTop: 10
      
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems:  'center',
      background: 'white',
      color: 'grey',
      padding: 20,
       
    },
    btn : {
      marginTop: 10,
      marginBottom: 20
  
    },
    Grid: {
      background: 'black'
    }
}));
export default App;
