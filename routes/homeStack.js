import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import one from '../one';
import two from '../two';

const screens = {
  one: {
    screen: one,
  },
  two: {
    screen: two,
  },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);