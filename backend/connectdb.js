const mongoose = require('mongoose')


connectdb = async () => {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/crud');
      } catch (error) {
        handleError(error);
      }
}

export default connectdb = connectdb
