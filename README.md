# Registra Notas
App feito com [react-native](https://reactnative.dev/) para 
projeto de matéria Programação para Dispositivos Móveis em Android.

## Compilando projeto

Se você rodar compilar este projeto e executa-lo manualmente pelo seu IDE.
Será necessário copiar e colar o seu `google-services.json` em `android/app/google-services.json`

Caso contrário, **[Firebase](https://firebase.google.com/?hl=pt)** não deve funcionar.

Para compilar uma **Release** utilize como referência:
https://instamobile.io/android-development/generate-react-native-release-build-android/

## Rodar com Android
Execute uma instancia VM de Android sobre o [Android Studio](https://developer.android.com/studio) ou conecte seu smartphone Android em seu computador.

OBS: Se o seu celular estiver conectado, 
certifique-se de estar habilitado o modo Debug.

Após clonar o projeto execute:
```
npm start
npm run android
```

## Rodar com iOS **(NÃO TESTADO)**
Abra seu [XCode](https://developer.apple.com/xcode/) e 
execute uma instancia iOS em sua máquina.

Após clonar o projeto execute:
```
npm start
npm run ios
```