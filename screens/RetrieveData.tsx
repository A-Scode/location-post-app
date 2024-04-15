import Layout from '../components/Layout'
import { Button, Surface, Text, TextInput, withTheme } from 'react-native-paper';
import { AnyStyle, PropsWithTheme, styleProps } from '../config/Types';

const RetrieveData = ({theme}:PropsWithTheme) => {
    const styles = createStyles({theme})

  return (
    <Layout style={styles.layout}>
      Recieved data
    </Layout>
  );
}

export default withTheme(RetrieveData)

const createStyles = ({theme}:styleProps):AnyStyle=>({
    
})

