function Assert(data, disagreementFactor) {
    this.allPairsHaveDisagreement = function (pairs) {
        for (pair of pairs)
        {
            console.assert(pair.difference >= disagreementFactor, pair, disagreementFactor);
        }
    };

    this.allPersonsAreMatched = function (pairs) {
        var personsMatched = new Set();

        for (pair of pairs) {
            personsMatched.add(pair.person1);
            personsMatched.add(pair.person2);
        }

        console.assert(personsMatched.size >= data.length, personsMatched, data.length);
    }

    this.noPersonMatchedTwice = function (pairs){
        var personsMatched = new Set();
        for (pair of pairs) {
            console.assert(!personsMatched.has(pair.person1), personsMatched, pair.person1);
            console.assert(!personsMatched.has(pair.person2), personsMatched, pair.person2);

            personsMatched.add(pair.person1);
            personsMatched.add(pair.person2);
        }
    }
}