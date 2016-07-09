'use strict';

// File created by Artem
//

// take cards that are in the table and one of the hands

// in form:
//  [
//      {rank: 3, suit: diamonds},
//      {rank: 8, suit: spades},
//      ......
//      ......
//  ]
//
//  return combination that has a player
//
function handCombination(hand) {

    // get ordered hand by rank, from biggest to smallest.
    let ordered = highToLow(hand);
    // get the string of differences between ranks
    // difference determined by the second argument
    let oneDistance = distance(ordered, 1);
    let zeroDistance = distance(ordered, 0);
     // just additional vars
    let result;
    let temp;
     // flush check
    temp = flush(ordered);
    // if we have flush, check then for straight
    // else return withought cheking
    // couse flush are highest combo in this situation
    if (temp) {
        result = temp;
        temp = combo(result, distance(result, 1), /1{4}/, 5);
        if (temp) {
            result = temp;
            return {
                result: result.result,
                combo: 'straigth flush'
            };
        }
        return {
            result: result,
            combo: 'flush'
        };
    }
      // Four of the Kings
    temp = combo(ordered, zeroDistance, /1{3}/, 4);
    if (temp !== false) {
        result = fill(temp);
        return {
            result: result,
            combo: 'Four of the Kings'
        };
    }
     temp = combo(ordered, zeroDistance, /1{2}/, 3);
     if (temp) {
        result = temp;
        // Full house
        temp = combo(result.rest.result, result.rest.restDist, /1{1}/, 2);
        if (temp) {
            return {
                result: result.result.concat(temp.result),
                combo: 'Full house'
            };
        }
         // three
        result = fill(result);
        return {
            result: result,
            combo: 'three'
        };
     }
    // straight
    temp = combo(ordered, oneDistance, /1{4}/, 5);
     if (temp) {
        result = temp;
        return {
            result: result,
            combo: 'straigtht'
        };
    }
     // pair
    temp = combo(ordered, zeroDistance, /1{1}/, 2);
    if (temp) {
        result = temp;
        // two pairs
        temp = combo(result.rest.result, result.rest.restDist, /1{1}/, 2);
         if (temp) {
            return {
                result: fill({
                    result: result.result.concat(temp.result),
                    rest: {
                        result: temp.rest.result,
                        dist: temp.rest.dost
                    }
                }),
                combo: 'two FCkN pairs'
            };
        }
        return {
            result: fill(result),
            combo: 'pair'
        }
    }
     return fill(ordered);
}
 // take array of cards and sort it by rank, from high to low
function highToLow(arr) {
    for (let i = 0, length = arr.length; i < length; i += 1) {
        for (let j = i + 1, v; j < length; j += 1) {
            if (arr[i].rank < arr[j].rank) {
                v = arr[i];
                arr[i] = arr[j];
                arr[j] = v;
            }
        }
    }
    return arr;
}
 // take array of cards {rank:.., suit: ...}
// return the sting thet represent difference between rank of nearby card
// get 1 if defffernce equal to RANGE variable
function distance(arr, range) {
    let result = '';
    for (let i = 0, end = arr.length - 1; i < end; i += 1) {
        result += (arr[i].rank === arr[i + 1].rank + range) ? 1 : 0;
    }
    return result;
}
  // return combination that we could find,
// (exact pattern that we coul find) in given hand
// l - length of conmbination that we search
// arr - given cards
// distStr - string of matched distancess
// pattern - exact pattern that we want to find if distStr
function combo(arr, distStr, pattern, l) {
    // position of matched pattern in string that show distances
    let pos = distStr.search(pattern);
    // delete match from string distances
    let restDist = distStr.replace(pattern, '');
     if (pos === -1) {
        return false;
    }
    return {
        // our cards that are care combinathion
        result: arr.slice(pos, pos + l),
        rest: {
            result: arr.slice(0, pos).concat(arr.slice(pos + l, arr. length)),
            restDist: distStr.slice(0, pos) + distStr.slice(pos + l)
        }
    };
}
 // flush check
function flush(cards) {
    let result;
    // possible suit type
    let suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    // test cards for flush taking all suits one by one
    suits.forEach((elem) => {
        if (suitFilter(cards, elem).length >= 5) {
            result = suitFilter(cards, elem).slice(0, 5);
        }
    });
    return result || false;
};
 // take array of cards and suit
// return filtered array by given suit
function suitFilter(cards, suit){
    return cards.filter(elem => elem['suit'] === suit);
};
  function fill(arr) {
    for (let i = 0, length = arr.result.length; i < 5 - length; i += 1) {
        arr.result.push(arr.rest.result[i]);
    }
    return arr.result;
}

module.exports = handCombination;
