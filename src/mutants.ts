/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

const LENGTH_REQUIRED: number = 4;         // min match length
const MATCHES_REQUIRED: number = 2; // number of matches required

function isMutantAux(dna: string[], required: number, minimum: number) : boolean
{
  // null or empty matrix is not mutant, return false
  if(dna == null || dna.length == 0)
    return false;

  const firstRow = dna[0]; // we can access to first element since dna.length != 0

  // check if array has same length as firstRow length
  if(firstRow.length != dna.length)
    return false;

  // all rows excluding first one
  const allButFirst = dna.filter((value, index) => index > 0);

  const sameLength = allButFirst.every((row) => row.length == firstRow.length);

  // every row should have same length as first one to be a matrix
  if(!sameLength)
    return false;

  const length : number = firstRow.length;
  let matches = 0;

  /*
   coords system

   -----> u
   |
   |
   |v

   */

  // TODO:
  // - stop searching before end (we cannot find a new match at end)
  // - mark already search cells
  // - only search for A T C G characters

  // check horizontal
  for(let v = 0; v < length; v++)
  {
    let aux = '';
    let count = 0;
    for(let u = 0; u < length; u++)
    {
      const el = dna[v].charAt(u);
      if(aux != el)
      {
        // try with this character, set count to 1
        aux = el;
        count = 1;
        continue;
      }
      else
      {
        // we found match, increase count
        count++;
        if(count == required)
        {
          matches++;
          break;
        }
      }
    }
  }

  // TODO. can we check horizontal and vertical at same time?
  // check vertical
  // console.log("check vertical");
  for(let u = 0; u < length; u++)
  {
    let aux = '';
    let count = 0;
    for(let v = 0; v < length; v++)
    {
      const el = dna[v].charAt(u);
      if(aux != el)
      {
        // try with this character
        aux = el;
        count = 1;
        continue;
      }
      else
      {
        // we found match, increase count
        count++;
        if(count == required)
        {
          matches++;
          break;
        }
      }
    }
  }

  // check diagonal (right -> down)
  const limit = length - required;
  const diagonals = 2 * limit + 1; // total number of diagonals in matrix

  // iterate over diagonals
  for(let d = 0; d < diagonals; d++)
  {

    //TODO: check d1 and d2 for other REQUIRED values
    /*
    diagonal length

    d1 = d + REQUIRED
    d2 = REQUIRED - length + d
    diagonalLength = d1 - 2 * MAX(0, d2)

    d | d1 | d2 | d2+ | -2*d2+    | diagonalLength
    0 | 4  | -4 | 0   |  0        | 4
    1 | 5  | -2 | 0   |  0        | 5
    2 | 6  |  0 | 0   |  0        | 6
    3 | 7  |  2 | 2   | -2        | 5
    4 | 8  |  4 | 4   | -4        | 4
     */

    let aux = '';
    let count = 0;
    const d1 = d + required;
    const d2 = required - length + d
    const mirror = Math.max(0, d2);
    const diagLength = d1 - 2 * mirror;
    for(let i = 0; i < diagLength; i++)
    {
      const v = Math.max(0, limit - d) + i;
      const u = Math.max(0, d - limit) + i;
      const el = dna[v].charAt(u);
      if(aux != el)
      {
        // try with this character
        aux = el;
        count = 1;
        continue;
      }
      else
      {
        // we found match, increase count
        count++;
        if(count == required)
        {
          matches++;
        }
      }
    }
  }

  return matches >= minimum;
}

/*
matrix is mutant if
 - more than 1 match for A T C G characters is found
    --- horizontal
    |   vertical
    |
    -   diagonal
     -
      -
 - we are not checking left down direction
*/
export function isMutant(dna: string[])
{
  return isMutantAux(dna, LENGTH_REQUIRED, MATCHES_REQUIRED);
}