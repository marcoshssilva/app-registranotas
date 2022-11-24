# Registra Notas
App feito com [react-native](https://reactnative.dev/) para 
projeto de matéria Programação para Dispositivos Móveis em Android.

## Baixando o APK

Se você deseja baixar este APK, faça o download por este link:
[RegistraNotas 1.0.0-SNAPSHOT](https://github.com/marcoshssilva/app-registranotas-react-native/releases/tag/1.0.0-SNAPSHOT)

## Instalação e geração do APK

Se você rodar compilar este projeto e executa-lo manualmente pelo seu IDE ou instalar uma release.
Será necessário copiar e colar o seu `google-services.json` em `android/app/google-services.json`, assim como haver um projeto Firebase existente para o mesmo. 

Caso contrário, **[Firebase](https://firebase.google.com/?hl=pt)** não deve funcionar.

1. Clone este repositorio e execute o comando: 
```
npm install
```
2. Copie seu arquivo `google-services.json` para a o diretório `android/app` do projeto.
3. Copie seu arquivo `relese.keystore` para o diretório `android/app` do projeto.
4. Configure suas credenciais de `release.keystore` sobre o arquivo `android/app/build.gradle` como exemplo:
```
signingConfigs {
        release {
            storeFile file('release.keystore')       # CAMINHO DE ARQUIVO DA KEYSTORE 
            storePassword 'KEY STORE PASSWORD'       # SENHA DA KEYSTORE
            keyAlias 'ALIAS FROM KEY STORE'          # ALIAS
            keyPassword 'KEY OF ALIAS'               # SENHA DA ALIAS
        }
    }
    buildTypes {
        release {
            # ATIVE O PROGRAGUARD PARA MINIFICAR OS ARQUIVOS DA APK
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
            # DEFINA O SIGNING CONFIG PARA RELEASE
            signingConfig signingConfigs.release
        }
    }
```
5. Colete a chave **SHA1** ou **SHA256** de seu keystore e registre em seu **Firebase Console** para o aplicativo **Android**
6. Abra o arquivo `src/App.js` e atribua seu AUTH ID sobre a configuração do GoogleSignIn:
```
GoogleSignin.configure({
    webClientId: '%REPLACE_ID_HERE%', // gooogle-services.json -> oauth_client.client_id
    offlineAccess: true
});
```


## Rodar com Android sobre Emulador ou dispositivo conectado
Execute uma instancia VM de Android sobre o [Android Studio](https://developer.android.com/studio) ou conecte seu smartphone Android em seu computador.

OBS: Se o seu celular estiver conectado,
certifique-se de estar habilitado o modo Debug.

Após clonar o projeto execute:
```
npm start
npm run android
```

## Gerar uma Release

Será necessário copiar e colar o seu `google-services.json` em `android/app/google-services.json`

Caso contrário, **[Firebase](https://firebase.google.com/?hl=pt)** não deve funcionar.

Para compilar uma **Release** será necessário que utilize uma chave RSA criptografada.

Use como referência:

https://instamobile.io/android-development/generate-react-native-release-build-android/

https://github.com/marcoshssilva/marcoshssilva/tree/main/generate-certitify-with-keytool

https://stackoverflow.com/questions/54868611/how-to-get-sha-1-key-in-react-native-cli

Após efetuado configuração de instalação do projeto, configurado **Firebase** e uma **release.keystore**
Execute os seguintes comandos:
```
# delete drawable folders (ONLY TO PREVENT ERRORS CASE HAS PREVIOUS DEBUG COMPILATION)
rm -rf android/app/src/main/res/drawable-*

# Copy generated sources from metro to assets
react-native bundle --platform android --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/build/intermediates/res/merged/release/

cd android

# clean packages
./gradlew clean

# re-build and generate APK
./gradlew assembleRelease
```

Após concluido seu APK poderá ser achado sobre o diretório `android/app/build/outputs/apk/release`

# Utilidades

## Gerar uma keystore
```
keytool -genkey -v -keystore KEY_NAME_HERE.keystore -alias ALIAS_NAME_HERE -keyalg RSA -keysize 2048 -validity 10000 -keypass KEYALIAS_PASSWORD -storepass KEYSTORE_PASSWORD
```

## Obter chaves SHA1 e/ou SHA256 da Keystore
```
keytool -list -v -keystore "KEY_NAME_HERE.keystore" -alias ALIAS_NAME_HERE -storepass KEYSTORE_PASSWORD -keypass KEYALIAS_PASSWORD
```

## Migrar fontes compiladas do JS e ASSETS do projeto para Android
```
# delete drawable folders (ONLY TO PREVENT ERRORS CASE HAS PREVIOUS DEBUG EXECUTIONS)
rm -rf android/app/src/main/res/drawable-*

# prevent when folder doesn't exists (OPTIONAL) 
mkdir android/app/src/main/assets

# generate sources
react-native bundle --platform android --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/build/intermediates/res/merged/release/
```
