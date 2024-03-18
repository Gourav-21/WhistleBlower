import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="shortcut icon" href="/whitsle.svg" />
      <title>WhistleBlower</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="🕵️‍♂️ WhistleBlower is a platform for whistleblowers to report misconduct in a secure and private manner."
        />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
