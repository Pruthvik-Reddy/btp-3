import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import one from '../one';
import two from '../two';
import three from '../three';

const screens = {
  one: {
    screen: one,
  },
  two: {
    screen: two,
  },
  three:{
    screen:three,
  },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);