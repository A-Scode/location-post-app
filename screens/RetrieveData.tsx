import Layout from '../components/Layout'
import { Button, Card, Surface, Text, TextInput, withTheme } from 'react-native-paper';
import { AnyStyle, PropsWithTheme, styleProps } from '../config/Types';
import { useRetrieveData } from '../api/retrievedata';
import { useEffect } from 'react';
import { View } from 'react-native';

const RetrieveData = ({theme}:PropsWithTheme) => {
    const styles = createStyles({theme})

    const query = useRetrieveData();

    useEffect(()=>{
        console.log(query.data?.data)
    },[query.data])

  return (
    <Layout style={styles.layout}>
     <Surface elevation={4} style={styles.form}>
            <View style={styles.field}>
              <Text variant="titleLarge">Longitude</Text>
              <Text variant="titleMedium">5.22</Text>
            </View>
            <View style={styles.field}>
              <Text variant="titleLarge">Latitude</Text>

            </View>
              <Card>
                <Card.Cover source={{uri: 'https://test.webyaparsolutions.com/uploads/1713183862889-webyaparfull.png'}} />
              </Card>
            
          </Surface>
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
      },
      form: {
        margin: 20,
        padding: 20,
        gap: 30,
        borderRadius: theme?.roundness,
      },
      
    };
  }
  
  
