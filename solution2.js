// Not finished

function PairMaximizer(config) {
    var disagreementFactor = config.disagreementFactor;

    function getAllPossiblePairs(data) {
        var pairs = []

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

    function orderPairs(pairs){
        sortBy(pairs, pair => pair.difference);
    }

    function match(data){
        var allPairs = getAllPossiblePairs(data);
        orderPairs(allPairs);

        var pairs = [];
        var matched = {};
        for(let pair of allPairs){
            let [person1, person2] = [pair.person1, pair.person2];
            if(pair.person1 in matched || pair.person2 in matched)
                continue;
            matched[person1] = matched[person2] = true;
            pairs.push(pair);
        }

        return pairs;
    }

    this.match = match;
}