import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from './components/dashboard-layout';

const Dashboard = () => (
  <>
    <title>
      Dashboard | Material Kit
    </title>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>

      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
