import Reactotron , {asyncStorage, networking} from 'reactotron-react-native'
import {reactotronRedux} from 'reactotron-redux'

const reactotron = Reactotron
  .configure({ name: 'carRental' })
  .use(networking())
  .use(asyncStorage())
  .use(reactotronRedux()) 
  .connect()

export default reactotron;