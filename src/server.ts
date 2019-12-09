/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import app from "./app";
import { PORT } from "./constants/mutants.contants";

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));