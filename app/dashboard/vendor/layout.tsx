// src/app/layout.tsx

import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is a server component. We put client-only providers in ./providers.tsx
  return <Providers>{children}</Providers>;
}
