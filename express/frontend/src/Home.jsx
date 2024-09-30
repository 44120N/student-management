import { Button, Container, Stack, Typography } from '@mui/material' 
import LoginRequired from './Components/LoginRequired';
import StudentTable from './API/StudentTable';

export default function Home() {
  const user = sessionStorage.getItem('user');
  return (
    <LoginRequired>
      <Container>
        <Stack spacing={2} direction={'column'} justifyContent={'center'}>
          <Stack alignItems={'center'} direction={'row'} justifyContent={'space-between'} flexWrap={'wrap'}>
            <Typography variant="h4" color='primary'>Hello, {user}</Typography>
            <Button variant='contained' color='primary' href='/student/add'>Add User</Button>
          </Stack>
          <StudentTable />
        </Stack>
      </Container>
    </LoginRequired>
  )
}
