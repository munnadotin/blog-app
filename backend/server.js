import 'dotenv/config'
import { app } from "./src/app.js";
import { connectDB } from "./src/config/database.js";

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on PORT ${process.env.PORT}`);
    connectDB();
}); 