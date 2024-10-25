import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Skeleton from '@mui/material/Skeleton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from 'react-router-dom';

const itemData = [
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853314/qp4hbpnczrphhzzpgyeu.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853309/zixb1aqkle053isqkjs5.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853288/nltjuttqvufeol3xx2eb.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853280/qszjytiayrnmi8mdrh4y.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853273/en11aldzadpg9pjmq2q7.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853267/kprvtiq8jeygwgoiqodl.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853255/tpmssgnkbsxazz7bgsma.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853247/hzbf6xlcfmddgwmu0c0a.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853239/sxylzfaqyxw7dfuxuavx.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853227/llw6ealybwm5a7dumgod.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853219/avl8jsbmhwmwdlrbzxeb.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853210/yaps8njtlsype0ngyxqf.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853202/dzv84dz27tqrgkpryprh.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853196/fbherulhg8iel8mxfoyn.png' },
];


  export default function Sponsors() {
    const location = useLocation();
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const columns = isSmallScreen ? 2 : 4;
  
    // Initialize loading states from sessionStorage or default to true
    const initialLoadingStates = JSON.parse(sessionStorage.getItem('loadingStates')) || new Array(itemData.length).fill(true);
    const [loadingStates, setLoadingStates] = React.useState(initialLoadingStates);
  
    // Save loading states in sessionStorage whenever they update
    React.useEffect(() => {
      sessionStorage.setItem('loadingStates', JSON.stringify(loadingStates));
    }, [loadingStates]);
  
    // Reset loading states when navigating back to /sponsors
    React.useEffect(() => {
      if (location.pathname === '/sponsors') {
        setLoadingStates(new Array(itemData.length).fill(true));
        sessionStorage.removeItem('loadingStates'); // Clear on re-visit
      }
    }, [location.pathname]);
  
    // Update loading state for a specific image index when it loads
    const handleImageLoad = (index) => {
      setLoadingStates((prevStates) =>
        prevStates.map((state, i) => (i === index ? false : state))
      );
    };
  
    return (
      <div key={location.pathname} className="mt-16 p-6">
        <h2 className="text-7xl font-bold mb-9 text-center">Our Past Sponsors</h2>
        <ImageList variant="masonry" cols={columns} rowHeight={200} gap={8}>
          {itemData.map((item, index) => (
            <ImageListItem key={item.img}>
              {loadingStates[index] ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={200}
                  sx={{ borderRadius: 2 }}
                />
              ) : null}
              <img
                src={`${item.img}?w=200&h=200&fit=crop&auto=format`}
                srcSet={`${item.img}?w=200&h=200&fit=crop&auto=format&dpr=2 2x`}
                alt=""
                loading="lazy"
                onLoad={() => handleImageLoad(index)} // Trigger handleImageLoad on load
                style={{ display: loadingStates[index] ? 'none' : 'block' }} // Hide image until loaded
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
  }