import fetch from 'node-fetch';
import HTMLParser from 'fast-html-parser';
import { IMSLPWork } from '../typescript/IMSLPInterfaces';
import { Score } from '../../../entity/Score';

export const imslpFetchScoresFromWork = async (
  work: IMSLPWork,
  secondTry?: boolean
): Promise<Score[]> => {
  secondTry = secondTry || false;
  const scores: Score[] = [];
  try {
    // Fetch IMSLP work page and parse it into queryable HTML
    const url = encodeURI(work.link);
    const response = await fetch(url, {
      timeout: 5000,
    });
    const text = await response.text();
    const root = HTMLParser.parse(text);

    // Get the global score download container
    const rootContainer = root.querySelector('#wpscore_tabs');

    // Get the individual download containers
    const fileContainers = rootContainer.querySelectorAll(
      'div.we_file_download'
    );

    // Loop through the download containers and pull off the relevant information
    fileContainers.forEach(container => {
      // Get the score download link
      const linkContainer = container.querySelector('a.external');
      const href = linkContainer.attributes.href;

      // Get the unparsed title
      const unparsedTitle = linkContainer.querySelector('span').childNodes[1]
        .rawText;
      const unparsedTitleArray = unparsedTitle.split('');

      // Parse the title, removing unwanted characters
      // like "&#160;" (a space) and "&amp;" (an ampersand)
      let title = '';
      for (let i = 0; i < unparsedTitleArray.length; i += 1) {
        const char = unparsedTitleArray[i];
        if (char === '&') {
          if (unparsedTitle.substring(i, i + 6) === '&#160;') {
            i += 5;
            title += ' ';
          } else if (unparsedTitle.substring(i, i + 5) === '&amp;') {
            i += 4;
            title += '&';
          }
        } else {
          title += char;
        }
      }

      // Get the size of the score (in megabytes and in number of pages)
      const infoContainer = container.querySelector('span.we_file_info2');
      const unparsedSize = infoContainer.childNodes[2].text;
      const size = unparsedSize.substring(3, unparsedSize.length - 1);

      // Create the score object with the retrieved information
      // /wiki/Special:ImagefromIndex/36310
      const score = new Score();
      score.url = encodeURI(href);
      score.title = title;
      score.description = size;

      // Add the score object to the array that will be returned
      scores.push(score);
    });
  } catch (error) {
    console.log(error);
    console.error(
      `ERROR: Failed to fetch scores for work (${work.title}, ${work.composer})`
    );
    if (!secondTry) {
      console.log(
        `Trying to fetch scores for (${work.title}, ${work.composer}) again...`
      );
      return imslpFetchScoresFromWork(work, true);
    } else {
      console.log(
        `Already tried to fetch (${work.title}, ${work.composer}) again, aborting fetch.`
      );
    }
  }

  return scores;
};
