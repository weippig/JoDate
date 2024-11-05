import { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const GoTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };

  return (
    <>
      {showButton && (
        <IconButton
          onClick={scrollToTop} 
          size='large'
          sx={{
            position: 'fixed',
            right: '5%',
            bottom: '5%',
          }}>
          <ArrowUpwardIcon />
        </IconButton>
      )}
    </>
  );
};
export default GoTop;