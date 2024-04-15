import Layout from '../components/Layout'
import { Button, Chip, Divider, Surface, Text, TextInput, withTheme } from 'react-native-paper';
import { AnyStyle, PropsWithTheme, styleProps } from '../config/Types';
import { View } from 'react-native';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useToast } from 'react-native-toast-notifications';
import { useSignUp } from '../api/signup';

export interface SignupData extends FieldValues {
  email : string,
  name : string,
  password : string,
}

const Signup = ({theme}:PropsWithTheme) => {
    const styles = createStyles({theme})

    const toast = useToast()

    const { control , reset , handleSubmit ,formState :{errors , touchedFields} } = useForm<SignupData>({
      defaultValues : {
        email : "",
        name : "" ,
        password : "",
      }
    })
    const query = useSignUp();

    const naviagtion = useNavigation<StackNavigationProp<any>>()

    useEffect(()=>{
      if (query.status == "success") {
        naviagtion.navigate("Login")
      }
      else if (query.status == "error") {
        reset()
      }
    } , [query.status , reset])


    const onSubmit = useCallback((values:SignupData)=> {
      query.mutate(values)
    },[])

  return (
    <Layout style={styles.layout}>
      <Text style={styles.heading} variant="displayMedium">
        SignUp
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
          <Text variant="titleMedium">Name</Text>
          <Controller
            control={control}
            name="name"
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                mode="outlined"
                textContentType="name"
                placeholder="Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.name && touchedFields.name && (
            <Text style={styles.error} variant="labelLarge">
              {' '}
              Must be a valid name
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
              {' '}
              Must be a valid password
            </Text>
          )}
        </View>
        <Button
          loading={query.isPending}
          disabled={query.isPending}
          mode="elevated"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}>
          Submit
        </Button>
        <Divider />

        <Chip
          onPress={() => naviagtion.navigate('Login')}
          icon="login"
          mode="outlined"
          style={styles.loginChip}
          elevated={true}>
          Login
        </Chip>
      </Surface>
    </Layout>
  );
}

export default withTheme(Signup)

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
    error:{
      color : theme?.colors.error
    },
    loginChip:{
      alignSelf : 'center',
      borderRadius : 5,
    }
})

