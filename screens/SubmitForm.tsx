import Layout from '../components/Layout'
import { Button, Card, Divider, Icon, IconButton, Surface, Text, TextInput, withTheme } from 'react-native-paper';
import { AnyStyle, CustomTheme, PropsWithTheme, styleProps } from '../config/Types';
import { PermissionsAndroid, View, useWindowDimensions } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Camera, CameraDevice, CameraProps, PhotoFile, useCameraDevice, useCameraFormat, useCameraPermission } from 'react-native-vision-camera';
import { Controller, FieldValues, UseFormSetValue, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSubmitFrom } from '../api/submitform';
import Geolocation from 'react-native-geolocation-service';



export interface SubmitFromData extends FieldValues {
  longitude : string,
  latitude : string,
  file : PhotoFile|null,
}


const requestLocationPermission = async() => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      // console.log('You can use Geolocation');
      return true;
    } else {
      // console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};


const SubmitFrom = ({theme}:PropsWithTheme) => {
    const styles = createStyles({theme})

    const [openCamera , setOpenCamera ] = useState(false)

    const {hasPermission , requestPermission} = useCameraPermission()

    const camera = useRef<Camera>(null);

    const device = useCameraDevice('back');
    
    const navigation = useNavigation<StackNavigationProp<any>>();
    
    if (device== null ) {
      return (<Layout>
        No Camera Available
      </Layout>)
    }
    const query = useSubmitFrom();

    const format = useCameraFormat(device , [
      {photoResolution : {width:1000,height:3000}},
      {photoAspectRatio : 1 / 3}
    ])

    const turnOffCamera = useCallback(()=>{
      setOpenCamera(false);
    },[openCamera])

    const takePictureInput= useCallback(()=>{

      if (!hasPermission) requestPermission().then(()=>{
        if (hasPermission) takePictureInput();
        
      });

      setOpenCamera(true);
      
    },[camera])

    
    const {
      control,
      watch,
      reset,
      getFieldState,
      setValue,
      handleSubmit,
      formState: {errors, touchedFields},
    } = useForm<SubmitFromData>({
      defaultValues: {
        longitude: '',
        latitude: '',
        file: null,
      },
    });
    const photo = watch('file')

    const onSubmit = useCallback(async (values:SubmitFromData)=> {
      const formData = new FormData()

      const filePath = `${photo?.path}`;
      const result = (await fetch(`file://${filePath}`))
      const data = await result.blob()
      const photofile =  new File( [data] , "image.jpg")

      formData.append("longitude" , values.longitude)
      formData.append("latitude" , values.latitude)
      formData.append("file" , {
        uri :   `file://${filePath}`,
        name : filePath.split('/').pop(),
        type : "image/jpeg",
      })

      query.mutate(formData)
    },[photo])

    // useEffect(()=>reset() , [])
    useEffect(()=>{
      // if (query.isError) console.error("error",query.error.data)
    } , [query])

    useEffect(()=>{
      if(query.status ==="success") reset();
    } , [query.isSuccess])

    const [location, setLocation] = useState<Geolocation.GeoPosition|boolean>();
  // function to check permissions and get Location
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };


    useEffect(()=>{
      getLocation();
    } , [])
    

    useEffect(()=>{
      // console.log(location)
      if (location!= undefined &&  location!= false){
        //@ts-expect-error
        setValue("longitude" , `${location.coords.longitude}`)
        //@ts-expect-error
        setValue("latitude" , `${location.coords.latitude}`)
    }

    } , [location , setValue])

  return (
    <>
      {
        <View style={{display: openCamera ? 'flex' : 'none'}}>
          {/* @ts-ignore */}
          <Camera
            photo
            isActive
            device={device}
            format={format}
            enableZoomGesture
            style={styles.camera}
            ref={camera}
          />
          <CameraOverlay
            camera={camera.current}
            setFile={setValue}
            turnOffCamera={turnOffCamera}
          />
        </View>
      }
      {!openCamera ? (
        <Layout style={styles.layout}>
          <Text style={styles.heading} variant="displayMedium">
            Submit From
          </Text>
          <Surface elevation={4} style={styles.form}>
            <View style={styles.field}>
              <Text variant="titleMedium">Longitude</Text>
              <Controller
                control={control}
                name="longitude"
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    mode="outlined"
                    textContentType="location"
                    placeholder="Longitude"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.longitude && touchedFields.longitude && (
                <Text style={styles.error} variant="labelLarge">
                  Must be a valid longitude
                </Text>
              )}
            </View>
            <View style={styles.field}>
              <Text variant="titleMedium">Latitude</Text>
              <Controller
                control={control}
                name="latitude"
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    mode="outlined"
                    textContentType="location"
                    placeholder="latitude"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.latitude && touchedFields.latitude && (
                <Text style={styles.error} variant="labelLarge">
                  Must be a valid latitude
                </Text>
              )}
            </View>
            {photo ? (
              <Card>
                <Card.Cover source={{uri: `file://${photo.path}`}} />
              </Card>
            ) : (
              <View style={styles.field}>
                <Text variant="titleMedium">Take Picture</Text>
                <IconButton
                  style={styles.button}
                  icon="add-a-photo"
                  onPress={takePictureInput}
                  size={50}
                />
              </View>
            )}
            <Button
              loading={query.isPending}
              disabled={query.isPending || photo === null}
              onPress={handleSubmit(onSubmit)}
              mode="elevated"
              style={styles.button}>
              Submit
            </Button>
          </Surface>
          <Divider />
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Retrieve')}
            style={[styles.button , {marginVertical:20}]}>
            Retrieve Data
          </Button>
        </Layout>
      ) : null}
    </>
  );
}


type OverlayProps ={
  theme : CustomTheme,
  camera : Camera | null,
  turnOffCamera : ()=>void,
  setFile : UseFormSetValue<SubmitFromData>,
}

const CameraOverlay=withTheme(({theme , camera ,setFile, turnOffCamera}:OverlayProps)=>{
    const styles = createStyles({theme})
    const capture = useCallback(async () => {
      const file = camera
        ?.takePhoto({enableShutterSound: true })
        .then(file => {
          setFile('file' , file)
          turnOffCamera();
        })
        .catch(() => {
          // console.log('error');
        });
    }, [camera]);
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

