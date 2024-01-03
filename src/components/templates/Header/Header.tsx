import React, { useState, useEffect, useContext } from 'react';
import { StyledFormControl, StyledLink, Wrapper } from './style';
import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { ValueContext, Langs } from '../../Context/ValueContext';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const { language, setLanguage } = useContext(ValueContext);

  const handleScroll = () => {
    const offset = window.scrollY;
    setIsSticky(offset > 50);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as Langs);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Wrapper container isSticky={isSticky}>
      <Grid item xs={6}>
        <StyledLink width="150px" to={'/'}>
          Welcome page
        </StyledLink>
      </Grid>

      <Grid container item xs={6} justifyContent={'flex-end'} gap={'20px'}>
        <StyledFormControl>
          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            label="Language"
            onChange={handleChange}
          >
            <MenuItem value={Langs.ru}>RU</MenuItem>
            <MenuItem value={Langs.en}>EN</MenuItem>
          </Select>
        </StyledFormControl>
        <StyledLink width="100px" to={'/signOut'}>
          Sign Out
        </StyledLink>
      </Grid>
    </Wrapper>
  );
};

export default Header;
