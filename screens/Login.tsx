import Layout from '../components/Layout'
import { Button, Chip, Divider, Surface, Text, TextInput, withTheme } from 'react-native-paper';
import { AnyStyle, PropsWithTheme, styleProps } from '../config/Types';
import { View } from 'react-native';
import { useCallback, useContext, useEffect } from 'react';
import { LoginContext } from '../context/LoginContext';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useToast } from 'react-native-toast-notifications';
import { useLogIn } from '../api/login';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface LoginData extends FieldValues {
  email : string,
  password : string,
}


const Login = ({theme}:PropsWithTheme) => {
    const styles = createStyles({theme})

    const { control , reset , handleSubmit ,formState :{errors , touchedFields} } = useForm<LoginData>({
      defaultValues : {
        email : "",
        password : "",
      }
    })
    const query = useLogIn();

    const naviagtion = useNavigation<StackNavigationProp<any>>()

    useEffect(()=>{
      if (query.status == "success") {
        naviagtion.navigate("Submit From")
      }
      else if (query.status == "error") {
        reset()
      }
    } , [query.status , reset])


    const onSubmit = useCallback((values:LoginData)=> {
      query.mutate(values)
    },[])

  return (
    <Layout style={styles.layout}>
      <Text style={styles.heading} variant="displayMedium">
        Login
      </Text>
      <Surface elevation={4} style={styles.form}>
        <View style={styles.field}>
          <Text variant="titleMedium">Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                mode="outlined"
                textContentType="emailAddress"
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.email && touchedFields.email && (
            <Text style={styles.error} variant="labelLarge">
              {' '}
              Must be a valid email
            </Text>
          )}
        </View>
        <View style={styles.field}>
          <Text variant="titleMedium">Password</Text>
          <Controller
            control={control}
            name="password"
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                mode="outlined"
                textContentType="password"
                secureTextEntry
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.password && touchedFields.password && (
            <Text style={styles.error} variant="labelLarge">
              Must be a valid password
            </Text>
          )}
        </View>
        <Button
          loading={query.isPending}
          disabled={query.isPending}
          mode="elevated"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          Submit
        </Button>
        <Divider />

        <Chip
          onPress={() => naviagtion.navigate('Login')}
          icon="person"
          mode="outlined"
          style={styles.signupChip}
          elevated={true}>
          SignUp
        </Chip>
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
    },
    signupChip:{
      alignSelf : 'center',
      borderRadius : 5,
    }
})

