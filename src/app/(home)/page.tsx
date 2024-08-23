import { Container } from "@mantine/core"
import type { Metadata } from "next/types"

export const metadata: Metadata = {
  title: "トップ",
  description: "トップ",
}

export default function RootPage() {
  return <Container py={40}>トップ</Container>
}
