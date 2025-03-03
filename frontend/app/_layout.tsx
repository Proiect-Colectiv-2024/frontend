import { Stack } from 'expo-router'
import {AuthProvider} from "@/app/AuthProvider";

export default function RootLayout() {
  return (
      <AuthProvider>
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='+not-found' />
              <Stack.Screen name='login' options={{headerShown: false }}/>
          </Stack>
      </AuthProvider>
  )
}
