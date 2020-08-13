// import natural from 'natural';
// import stem from 'stem-porter';
// import {lemmatizer} from 'lemmatizer';
import Lemmatizer from 'javascript-lemmatizer';

const blackList = [
    'figure',
    'fig',

    'of',
    'in',
    'between',
    'on',
    'before',
    'behind',
    'while',
    'and',
    'for',
    'to',
    'with',
    'by',
    'as', 'from', 'or', 'into', 'after', 'when', 'only', 'at', 'not', 'but', 'over', 'among',

    'one', 'two', 'three', 'four', 'five', 'six', 'seven',

    'more',

    'an',
    'the',

    'it',
    'its',
    'this',
    'that',
    'these',
    'those',
    'we',
    'their',
    'our',
    'other',

    'each',
    'every',
    'both',
    'all',

    'which',
    'where',
    'how',

    'are', 'is', 'be', 'was', 'were', 'can', 'could', 'have', 'has', 'had',
]
const lemmatizer = new Lemmatizer();

const stemWord = word => {
    // console.log(word, stem(word))
    // return stem(word);
    // return natural.PorterStemmer.stem(word);
    let lemma = word;
    try {
        // lemma = lemmatizer(word);
        lemmatizer.lemmas(word, 'noun');
    } catch (e) {
        console.log(e, word);
    }
    return lemma;
};

const captionStat = caption => {
    if (!caption) return {};
    const words = {};

    caption
      // parse
      .split(' ')
      // trim
      .map(item => {
          let s, e;
          for (s = 0; s < item.length; s++)
              if (item[s].match(/[a-zA-z]/))
                  break;
          for (e = item.length; e--;)
              if (item[e].match(/[a-zA-z]/))
                  break;
          if (s > e) return "";
          return item.substring(s, e + 1).toLowerCase();
      })
      // filter
      .filter(item => {
          return item.length > 1 && !blackList.includes(item)
      })
      // stem
      .map(item => stemWord(item))
      .filter((item, i, arr) => arr.indexOf(item) === i)
      // stat
      .forEach(item => {
          if (words.hasOwnProperty(item)) words[item]++;
          else words[item] = 1;
      });

    return words;
};

// console.log(stemWord("desks"))
// console.log(stemWord("shown"))
// console.log(stemWord("example"))

export default captionStat;
