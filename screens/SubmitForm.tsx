import Layout from '../components/Layout'
import { Button, Card, Divider, Icon, IconButton, Surface, Text, TextInput, withTheme } from 'react-native-paper';
import { AnyStyle, CustomTheme, PropsWithTheme, styleProps } from '../config/Types';
import { View, useWindowDimensions } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Camera, CameraDevice, CameraProps, PhotoFile, useCameraDevice, useCameraFormat, useCameraPermission } from 'react-native-vision-camera';
import { Controller, FieldValues, UseFormSetValue, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSubmitFrom } from '../api/submitform';


export interface SubmitFromData extends FieldValues {
  longitude : string,
  latitude : string,
  file : PhotoFile|null,
}


const SubmitFrom = ({theme}:PropsWithTheme) => {
    const styles = createStyles({theme})

    const [openCamera , setOpenCamera ] = useState(false)

    const {hasPermission , requestPermission} = useCameraPermission()

    const camera = useRef<Camera>(null);

    const device = useCameraDevice('back');
  
    const navigation = useNavigation<StackNavigationProp<any>>();

    const query = useSubmitFrom();

    const format = useCameraFormat(device , [
      {photoResolution : {width:10,height:30}},
      {photoAspectRatio : 1 / 3}
    ])

    if (device == null) {
      // console.log("No Camera")
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

    const onSubmit = useCallback((values:SubmitFromData)=> {
      const formData = new FormData()

      const filePath = photo.path || '';

      formData.append("longitude" , values.longitude)
      formData.append("latitude" , values.latitude)
      formData.append("file" , {
        uri:`file://${filePath}`,
        name :  'image',
        type : 'image/jpeg',
      })

      query.mutate(formData)
    },[photo])

    useEffect(()=>reset() , [])



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
            style={styles.button}>
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

