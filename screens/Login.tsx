import Layout from '../components/Layout'
import { Button, Surface, Text, TextInput, withTheme } from 'react-native-paper';
import { AnyStyle, PropsWithTheme, styleProps } from '../config/Types';
import { View } from 'react-native';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';

const Login = ({theme}:PropsWithTheme) => {
    const styles = createStyles({theme})
    const login = useContext(LoginContext)

  return (
    <Layout style={styles.layout}>
      <Text style={styles.heading} variant="displayMedium">
        Login
      </Text>
      <Surface elevation={4} style={styles.form}>
        <View style={styles.field}>
            <Text variant='titleMedium'>Email</Text>
          <TextInput
            mode="outlined"
            textContentType="emailAddress"
            placeholder="Email"
          />
        </View>
        <View style={styles.field}>
            <Text variant='titleMedium'>Password</Text>
          <TextInput
            mode="outlined"
            textContentType="password"
            placeholder="Password"
          />
        </View>
        <Button mode="elevated" style={styles.button}>
          Submit
        </Button>
      </Surface>
    </Layout>
  );
}

export default withTheme(Login)

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

