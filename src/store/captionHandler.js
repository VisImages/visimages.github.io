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
      // stat
      .forEach(item => {
          if (words.hasOwnProperty(item)) words[item]++;
          else words[item] = 1;
      })

    return words;
};

export default captionStat;
