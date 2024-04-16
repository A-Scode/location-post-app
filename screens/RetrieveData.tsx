import Layout from '../components/Layout'
import { ActivityIndicator, Button, Card, Divider, Surface, Text, TextInput, withTheme } from 'react-native-paper';
import { AnyStyle, PropsWithTheme, styleProps } from '../config/Types';
import { useRetrieveData } from '../api/retrievedata';
import { useEffect } from 'react';
import { View } from 'react-native';
import { BASE_URl } from '../config/constant';

const RetrieveData = ({theme}:PropsWithTheme) => {
    const styles = createStyles({theme})

    const query = useRetrieveData();


  return (
    <Layout loading={ query.isLoading } style={styles.layout}>

      {
        query.data?.data.data.length ? query.data?.data.data.map((item:any, index:number )=>(
     <Surface elevation={4} style={styles.form} key={index}>
              <Card>
                <Card.Cover source={{uri: `${BASE_URl}${item.file}`}} />
              </Card>
            <View style={styles.field}>
              <Text variant="titleLarge">Longitude</Text>
              <Text variant="labelLarge">{item.location.longitude}</Text>
            </View>
            <Divider />
            <View style={styles.field}>
              <Text variant="titleLarge">Latitude</Text>
              <Text variant="labelLarge">{item.location.latitude}</Text>
            </View>
            
          </Surface>

        )) : 
        <Text variant='displaySmall' style={styles.nodata}>No Data Found</Text>
      }
    </Layout>
  );
}

export default withTheme(RetrieveData)

const createStyles = ({theme}:styleProps):AnyStyle=>{
    return {
      layout: {
        gap: 30,
      },
      field: {
        gap: 5,
        padding: 10
      },
      form: {
        margin: 20,
        padding: 10,
        gap: 5,
        borderRadius: 35,
      },
      nodata:{
        textAlign : 'center',
      }
      
    };
  }
  
  
