import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Setup from './screens/setup';
import Gameplay from './screens/gameplay';
import HasilRonde from './screens/hasilronde';
import HasilAkhir from './screens/hasilakhir';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Setup">
        <Stack.Screen name="MatiMurup Square" component={Setup} 
        options={{ headerShown: true }} />
        <Stack.Screen name="Gameplay" component={Gameplay} options={{headerLeft: () => null}}/>
        <Stack.Screen name="HasilRonde" component={HasilRonde} options={{headerLeft: () => null}}/>
        <Stack.Screen name="HasilAkhir" component={HasilAkhir} options={{headerLeft: () => null}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
