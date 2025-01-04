import React, { useCallback, useMemo, useState } from 'react';
import { Linking, View } from 'react-native';
import WebView from 'react-native-webview';
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';

import { PostcodeProps } from './types';

const html = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <style> 
    * { box-sizing: border-box; }
    html, body { width: 100%; height: 100%; margin: 0; padding: 0; background-color: #ececec; }
  </style>
</head>
<body>
  <div id="layer" style="width:100%; height:100%;"></div>
  <script type="text/javascript">
    function initPostcode(options) {
      window.options = options;
      var script = document.createElement('script');
      script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.onload = () => {
        new daum.Postcode({
          ...window.options,
          oncomplete: (data) => {
            window.ReactNativeWebView.postMessage(JSON.stringify(data));
          }
        }).embed(document.getElementById('layer'));
      };
      document.head.appendChild(script);
    }
  </script>
</body>
</html>`;

const Postcode = ({
  jsOptions,
  onSelected,
  onError,
  style,
  ...otherProps
}: PostcodeProps) => {
  const [shouldStartLoad, setShouldStartLoad] = useState(true);

  const injectedJavaScript = useMemo(
    () => `initPostcode(${JSON.stringify(jsOptions)});`,
    [jsOptions]
  );

  const onMessage = useCallback(
    ({ nativeEvent: { data } }: { nativeEvent: { data: string } }) => {
      try {
        if (data) {
          onSelected?.(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error parsing postcode data:', error);
        onError?.(error);
      }
    },
    [onSelected, onError]
  );

  const onShouldStartLoadWithRequest = useCallback(
    (request: ShouldStartLoadRequest) => {
      if (request.url === 'about:blank') {
        return false;
      }

      const allowedUrls = [
        'https://postcode.map.daum.net',
        'http://postcode.map.daum.net',
      ];

      if (allowedUrls.some((url) => request.url.startsWith(url))) {
        return true;
      }

      Linking.openURL(request.url).catch((error) =>
        console.error('Failed to open URL:', error)
      );
      return false;
    },
    []
  );

  return (
    <View style={style}>
      <WebView
        source={{ html, baseUrl: 'https://postcode.map.daum.net' }}
        onMessage={onMessage}
        injectedJavaScript={injectedJavaScript}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        {...otherProps}
      />
    </View>
  );
};

export default Postcode;
