const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/healthcare_portal",{
  useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(()=>console.log("<== mongodb is connected ==>"))
.catch(err=>console.log(err))