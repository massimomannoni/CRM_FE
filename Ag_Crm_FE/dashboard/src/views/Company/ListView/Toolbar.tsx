import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addFilter } from '../../../features/filters/filtersSlice';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

interface Toolbar {
    className? : string
}

const Toolbar = ({ className, ...rest } : Toolbar) => {

  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch(addFilter(event.currentTarget.value))
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end">

        <Button
          color="primary"
          variant="contained"
          onClick={() => navigate('../company', { replace: true })}>
          Add company
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action" >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                onChange={(
                  ev: React.ChangeEvent<HTMLInputElement> ): void => onChange(ev)}
                placeholder="Search company"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};



export default Toolbar;
