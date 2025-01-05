# 📦 @thewoowon/react-native-daum-postcode

> React Native wrapper for Daum Postcode service

Easily integrate Daum Postcode (Kakao Address API) in your React Native app for seamless address searching and selection.

---

## 🚀 Features
- 📍 **Real-time address search:** Effortlessly find addresses using the Daum Postcode API.
- 📦 **Simple integration:** Minimal setup required for React Native projects.
- 📱 **Mobile-friendly:** Optimized for both iOS and Android platforms.
- 📡 **TypeScript support:** Built with TypeScript for better developer experience.

---

## 📦 Installation

```bash
npm install @thewoowon/react-native-daum-postcode
```

or using yarn:

```bash
yarn add @thewoowon/react-native-daum-postcode
```

and iOS requires pod install because of react-native-webview.

```bash
cd ios && pod install
```
---

## 🛠️ Usage

```tsx
import React from 'react';
import { View, Alert } from 'react-native';
import Postcode from '@thewoowon/react-native-daum-postcode';

const App = () => {
  const handleAddressSelect = (data: any) => {
    console.log('Selected Address:', data);
  };

  return (
    <View style={{ flex: 1 }}>
      <Postcode
        style={{width: '100%', height: '100%'}}
        jsOptions={{animation: true}}
        onSelected={(data: any) => Alert.alert(JSON.stringify(data))}
        onError={(error: any) => Alert.alert(JSON.stringify(error))}
      />
    </View>
  );
};

export default App;
```

---

## 📚 Props

| Prop Name       | Type                  | Required | Description                        |
|----------------|-----------------------|----------|------------------------------------|
| `onSelected`   | `function`            | ✅        | Callback when an address is selected |
| `onError`      | `function`            | ✅        | Callback when an error is occured |
| `style`        | `StyleProp<ViewStyle>`| ❌        | Custom styles for the component    |

---

## 📦 Example Output

The component renders the official Daum Postcode search interface inside a WebView, allowing users to search and select addresses easily.

---

## 📖 Changelog

### v1.0.0 (Initial Release)
- 🎉 First release with basic Daum Postcode integration

---

## 💡 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`feat/new-feature`).
3. Commit your changes.
4. Open a pull request.

---

## 🛡️ License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## 📞 Support

If you have any questions or need support, feel free to open an issue on [GitHub](https://github.com/thewoowon/react-native-daum-postcode).

---

## ⭐ Show Your Support

If you find this package useful, please consider giving it a star on [GitHub](https://github.com/thewoowon/react-native-daum-postcode)!

---

This project is inspired by [@actbase/react-daum-postcode](https://github.com/actbase/react-daum-postcode).

Happy coding! 🚀

