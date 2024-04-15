import Layout from '../components/Layout'
import { Button, IconButton, Surface, Text, TextInput, withTheme } from 'react-native-paper';
import { AnyStyle, PropsWithTheme, styleProps } from '../config/Types';
import { View } from 'react-native';
import { useCallback } from 'react';

const SubmitFrom = ({theme}:PropsWithTheme) => {
    const styles = createStyles({theme})

    const takePictureInput= useCallback(()=>{
      
    },[])

  return (
    <Layout style={styles.layout}>
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
    </Layout>
  );
}

export default withTheme(SubmitFrom)

const createStyles = ({theme}:styleProps):AnyStyle=>({
    heading : {
        textAlign : "center",
        marginTop : 20,
        color : theme?.colors.onBackground
    },
    form : {
        margin : 20 ,
        padding : 20,
        gap : 30,
        borderRadius : theme?.roundness,
    },
    layout:{
        gap : 30
    },
    button:{
        alignSelf : "center"
    },
    field:{
        gap:5,
    }
})

