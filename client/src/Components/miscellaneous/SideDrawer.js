import { Box, Button, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'

const SideDrawer = () => {
  return (
    <>
    <Box>

      <Tooltip label="Search Users to chat" hasArrow placement='bottom-end'>
        <Button>

         <Text>
          Search
         </Text>
        </Button>
      </Tooltip>
    </Box>
    </>
  )
}

export default SideDrawer