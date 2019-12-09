/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import App from "./app";
import {MONGO_URL, PORT} from "./constants/mutants.contants";

new App(MONGO_URL).app.listen(PORT, () => console.log(`Listening on port ${PORT}`));