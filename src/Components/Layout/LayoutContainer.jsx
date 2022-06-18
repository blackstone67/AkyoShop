import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const LayoutContainer = ({ classes, children }) => {
  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container>
        <Grid xs={12} item>
          {children}
          {/* <Paper className={classes.paper}>{children}</Paper> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default LayoutContainer;
