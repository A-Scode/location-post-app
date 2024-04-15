import Layout from '../components/Layout'
import { Button, Icon, IconButton, Surface, Text, TextInput, withTheme } from 'react-native-paper';
import { AnyStyle, CustomTheme, PropsWithTheme, styleProps } from '../config/Types';
import { View, useWindowDimensions } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Camera, CameraDevice, CameraProps, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

const SubmitFrom = ({theme}:PropsWithTheme) => {
    const styles = createStyles({theme})

    const [openCamera , setOpenCamera ] = useState(false)

    const {hasPermission , requestPermission} = useCameraPermission()

    const camera = useRef<Camera>(null);

    const device = useCameraDevice('back');
  
    const dimension = useWindowDimensions();

    if (device == null) {
      console.log("No Camera")
    }

    const turnOffCamera = useCallback(()=>{
      setOpenCamera(false);
    },[openCamera])

    const takePictureInput= useCallback(()=>{

      if (!hasPermission) requestPermission().then(()=>{
        if (hasPermission) takePictureInput();
        
      });
      setOpenCamera(true);
      
    },[camera])

    
    





  return (<>
     {<View style={{display : openCamera? 'flex' : 'none'}}>
        {/* @ts-ignore */}
        <Camera photo isActive device={device} enableZoomGesture style={styles.camera} ref={camera}  />
        <CameraOverlay camera={camera.current}  turnOffCamera={turnOffCamera} />
      </View>}
    {!openCamera?(<Layout style={styles.layout}>
      <Text style={styles.heading} variant="displayMedium">
        Submit From
      </Text>
      <Surface elevation={4} style={styles.form}>
        <View style={styles.field}>
            <Text variant='titleMedium'>Longitude</Text>
          <TextInput
            mode="outlined"
            textContentType="location"
            placeholder="Longitude"
          />
        </View>
        <View style={styles.field}>
            <Text variant='titleMedium'>Latitude</Text>
          <TextInput
            mode="outlined"
            textContentType="location"
            placeholder="Latitude"
          />
        </View>
        <View style={styles.field}>
            <Text variant='titleMedium'>Take Picture</Text>
            <IconButton style={styles.button} icon="add-a-photo" onPress={takePictureInput}  size={50}  />
        </View>
        <Button mode="elevated" style={styles.button}>
          Submit
        </Button>
      </Surface>
    </Layout>):null}
    </>
  );
}


type OverlayProps ={
  theme : CustomTheme,
  camera : Camera | null,
  turnOffCamera : ()=>void
}

const CameraOverlay=withTheme(({theme , camera , turnOffCamera}:OverlayProps)=>{
    const styles = createStyles({theme})
    const capture = useCallback(async ()=>{
      const file  = camera?.takePhoto({enableShutterSound:true}).then((file)=>{
        console.log("photo" , file );
        turnOffCamera();
      }).catch(()=>{console.log("error")});
    } , [camera])
    return (
    <View style={styles.overlayContainer}>
      <IconButton mode='contained' onPress={capture} icon="photo-camera" style={styles.shutter} size={50} />
    </View>
  )
})

export default withTheme(SubmitFrom)

const createStyles = ({theme}:styleProps):AnyStyle=>{
  const dimension = useWindowDimensions();
  return {
    heading: {
      textAlign: 'center',
      marginTop: 20,
      color: theme?.colors.onBackground,
    },
    form: {
      margin: 20,
      padding: 20,
      gap: 30,
      borderRadius: theme?.roundness,
    },
    layout: {
      gap: 30,
    },
    button: {
      alignSelf: 'center',
    },
    field: {
      gap: 5,
    },
    overlayContainer: {
      position: 'absolute',
      flex: 1,
      zIndex: 10,
      backgroundColor: 'transparent',
      width: dimension.width,
      height: dimension.height - 50,
    },
    shutter: {
      borderWidth: 2,
      borderRadius: 100,
      aspectRatio: '1 / 1',
      position: 'absolute',
      bottom: 20,
      borderColor: theme?.colors.primary,
      alignSelf: 'center',
    },
    camera: {
      position: 'absolute',
      flex: 1,
      width: dimension.width,
      height: dimension.height - 50,
    },
  };
}

