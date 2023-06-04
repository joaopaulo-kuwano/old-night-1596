// app/page.tsx
'use client'
import { Link } from '@chakra-ui/next-js'
import { Button } from '@chakra-ui/react'

export default function Page() {
  return (
    <Link href='/about' color='blue.400' _hover={{ color: 'blue.500' }}>
      <Button variant="link">Chakra BTN</Button>
    </Link>
  )
}