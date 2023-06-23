import { Box, Button, Flex, Image, Link } from "@chakra-ui/react"

export const Header = () => {
  return (
    <Flex borderBottomWidth={1} borderBottomColor="gray.200" justifyContent="space-between">
      <Box></Box>
      <Image src="/images/logo.png" h={120} />
      <Link href='/login' color='blue.400' _hover={{ color: 'blue.500' }}>
        <Button variant="solid">Fazer Login</Button>
      </Link>
    </Flex>
  )
}
