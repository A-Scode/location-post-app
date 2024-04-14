import Layout from '../components/Layout'
import { Text, withTheme } from 'react-native-paper';
import { AnyStyle, PropsWithTheme, styleProps } from '../config/Types';

const Signup = ({theme}:PropsWithTheme) => {
    const styles = createStyles({theme})

  return (
    <Layout>
        <Text style={styles.heading} variant='displayMedium' >SignUp</Text>
        <Layout style={styles.form}>

        </Layout>
    </Layout>
  )
}

export default withTheme(Signup)

const createStyles = ({theme}:styleProps):AnyStyle=>({
    heading : {
        textAlign : "center",
        marginTop : 20,
        color : theme?.colors.onBackground
    },
    form : {

    }
})

