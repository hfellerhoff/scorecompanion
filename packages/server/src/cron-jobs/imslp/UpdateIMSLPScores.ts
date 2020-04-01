import bent from 'bent';
import { HasMetadata } from './typescript/IMSLPInterfaces';
import { getConnection } from 'typeorm';
import { imslpUpdateScore } from './helper/IMSLPUpdateScore';
const getJSON = bent('json');

export const updateIMSLPScores = async () => {
  // Get a connection to the database
  const connection = getConnection();

  // --- Variables to configure the request ---
  const sort = 'parent'; // Sort alphabetically by composer
  const searchType = 2; // 1 = search by composer; 2 = search by work
  const formatType = 'json'; // Options: pretty | json | php | wddx

  let start = 0; // Start index of request
  let limit = 1000; // Results per request. Max limit = 1000
  const stopLimit = 160000; // Stop after this many individual work fetches
  const batchSize = 25; // Amount of promises to evaluate at the same time. A large batch size risks a request-timeout if they cannot be evaluated quickly enough.
  let shouldFetch = true; // Should another request be made

  while (shouldFetch) {
    // Perform a batch fetch of (limit) works
    const url = `https://imslp.org/imslpscripts/API.ISCR.php?account=worklist/disclaimer=accepted/sort=${sort}/type=${searchType}/start=${start}/limit=${limit}/retformat=${formatType}`;
    const response = await getJSON(url);

    // Loop through works in response.
    // Note: using a standard for loop here as opposed to a for-of, as the final element
    // in the response is the metadata and it is handled later.
    let promises = [];
    for (let i = 0; i < limit; i += 1) {
      const work = response[i];
      // imslpUpdateScore(connection, work);
      promises.push(imslpUpdateScore(connection, work));
      if (i % batchSize === 0) {
        // console.log(`~~~~~ Iteration ${i}, evaluating all promises ~~~~~`);
        await Promise.all(promises);
        promises = [];
      }
    }
    await Promise.all(promises);
    promises = [];

    // Pull metadata off of response
    const metadata = (response as HasMetadata).metadata;
    const thereAreMoreResponses = metadata.moreresultsavailable;

    // Check if should fetch again
    if (thereAreMoreResponses) {
      if (start >= stopLimit) {
        shouldFetch = false;
      } else {
        start += limit;
        if (start >= stopLimit) {
          shouldFetch = false;
        }
        if (start + limit >= stopLimit) {
          limit = stopLimit - start;
        }
      }
    } else {
      shouldFetch = false;
    }
  }

  return;
};
