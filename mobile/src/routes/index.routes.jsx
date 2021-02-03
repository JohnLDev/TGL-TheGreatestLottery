/* eslint-disable react/display-name */
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  FontAwesome,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { View } from 'react-native'
import Cart from '../components/Cart'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import ResetPassword from '../pages/ResetPassword'
import Dashboard from '../pages/Dashboard'
import Account from '../pages/Account'
import NewBet from '../pages/NewBet'
const AuthStack = createStackNavigator()
const TabNav = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const Routes = () => {
  const cart = useSelector(state => state.cart.betsInCart)
  const DrawerScreen = () => (
    <Drawer.Navigator
      drawerContent={({ navigation }) => (
        <Cart cart={cart} navigation={navigation} />
      )}
      drawerPosition='right'
      screenOptions={{ gestureEnabled: false }}
    >
      <Drawer.Screen component={NewBet} name={'NewBet'} />
    </Drawer.Navigator>
  )
  const TabScreens = () => (
    <TabNav.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          switch (route.name) {
            case 'Home':
              return (
                <>
                  {focused && (
                    <View
                      style={{
                        width: 30,
                        height: 4,
                        backgroundColor: '#B5C401',
                        position: 'absolute',
                        top: 0,
                        borderRadius: 6,
                      }}
                    />
                  )}
                  <SimpleLineIcons
                    name='home'
                    size={size}
                    color={focused ? '#B5C401' : color}
                    // style={{ paddingTop: 10 }}
                  />
                </>
              )

            case 'Account':
              return (
                <>
                  {focused && (
                    <View
                      style={{
                        width: 30,
                        height: 4,
                        backgroundColor: '#B5C401',
                        position: 'absolute',
                        top: 0,
                        borderRadius: 6,
                      }}
                    />
                  )}
                  <FontAwesome
                    name={'user-o'}
                    size={size}
                    color={focused ? '#B5C401' : color}
                  />
                </>
              )

            default:
              return (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 92,
                    width: 92,
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 7,
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 9.51,

                    elevation: 15,
                    marginBottom: 15,
                  }}
                >
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 80,
                      width: 80,
                      backgroundColor: '#B5C401',
                      borderRadius: 50,
                    }}
                  >
                    <MaterialCommunityIcons
                      name='poker-chip'
                      size={60}
                      color='#fff'
                    />
                  </View>
                </View>
              )
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#707070',
        inactiveTintColor: '#C1C1C1',

        tabStyle: {
          justifyContent: 'center',
        },

        labelStyle: {
          fontSize: 14,
          fontStyle: 'italic',
          fontWeight: 'bold',
          marginBottom: 10,
          marginTop: -10,
        },
        style: {
          height: 71,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <TabNav.Screen name='Home' component={Dashboard} />

      <TabNav.Screen
        name='NewBet'
        component={DrawerScreen}
        options={{ title: '' }}
      />

      <TabNav.Screen name='Account' component={Account} />
    </TabNav.Navigator>
  )
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
          headerTitleAlign: 'center',
        }}
      >
        <AuthStack.Screen name='SignIn' component={SignIn} />
        <AuthStack.Screen name='SignUp' component={SignUp} />
        <AuthStack.Screen name='ResetPassword' component={ResetPassword} />
        <AuthStack.Screen name='Dashboard' component={TabScreens} />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
