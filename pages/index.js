import { Button, Box } from '@mui/material'

import Profile from '../componetns/Profile'

export default function Home() {
  return (
    <Box p={4}>
      <Button variant="contained">ボタン</Button>
      <Profile id="1" />
      <Profile id="2" />
    </Box>
  )
}
