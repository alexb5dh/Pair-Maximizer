// Priorities:
// 1) maximize difference

// Description:
// Bottom-up approach: we sort all possible pairs in specific order and add them 1 by 1 to output
// ignoring if any person from pair is already added.

// Problems: 
// - requires too much memory
// - topics variation can be significant 

function PairMaximizer(config) {
    var disagreementFactor = config.disagreementFactor;

    function getAllPairs(data) {
        var pairs = [];

        for (let p1 = 0; p1 < data.length; p1++) {
            for (let p2 = p1; p2 < data.length; p2++) {
                for (let t = 0; t < data[0].length; t++) {
                    let difference = Math.abs(data[p1][t] - data[p2][t]);
                    if (difference >= disagreementFactor) {
                        pairs.push({
                            topic: t,
                            person1: p1,
                            person2: p2,
                            difference: difference
                        });
                    }
                }
            }
        }

        return pairs;
    }

    function getPersonCounter(pairs){
        var counter = {};

        for(let pair of pairs){
            let [person1, person2] = [pair.person1, pair.person2];

            if(!(person1 in counter)) counter[person1] = 0;
            if(!(person2 in counter)) counter[person2] = 0;

            counter[person1]++;
            counter[person2]++;
        }

        return counter;
    }

    function match(data){
        var pairs = [];
        var matched = {};

        var allPairs = getAllPairs(data);
        var personCounter = getPersonCounter(allPairs);
        sortBy(allPairs,
            pair => personCounter[pair.person1], // take by person with min total dissagreements 
            pair => -personCounter[pair.person2], // then take by person with min total dissagreements with person above
            pair => -pair.difference); // then take pair with max difference

        for(let pair of allPairs){
            if (pair.person1 in matched || pair.person2 in matched)
                continue;

            pairs.push(pair);
            matched[pair.person1] = true;
            matched[pair.person2] = true;
        }

        return pairs
    }

    this.match = match;
}