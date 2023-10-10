import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRef } from 'react'

export function DrawerNavigation() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <IconButton
        ref={btnRef}
        colorScheme="green"
        onClick={onOpen}
        position="absolute"
        right={2}
        aria-label="hamburger icon"
        icon={<HamburgerIcon />}
        variant="ghost"
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton _hover={{ backgroundColor: 'red.100' }} />
          <DrawerHeader textAlign="center">Navigation</DrawerHeader>

          <DrawerBody
            display="flex"
            flexDir="column"
            sx={{
              button: {
                minWidth: '100%',
              },
            }}
          >
            <Link href="/medications">
              <Button colorScheme="green" variant="ghost">
                Medications
              </Button>
            </Link>
            <Link href="/medications/create">
              <Button colorScheme="green" variant="ghost">
                Create Medications
              </Button>
            </Link>
          </DrawerBody>

          <DrawerFooter justifyContent="center">
            <Button colorScheme="red" onClick={() => signOut()}>
              Sign out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
