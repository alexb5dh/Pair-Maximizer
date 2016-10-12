function Statistics(data, disagreementFactor) {
    this.byTopics = function (pairs) {
        topics = {
            count: 0
        };

        for (let pair of pairs) {
            if (!topics[pair.topic]) topics[pair.topic] = {
                minDifference: Number.POSITIVE_INFINITY,
                maxDifference: 0,
                pairs: []
            };

            var topic = topics[pair.topic];
            topic.pairs.push(pair);
            topic.maxDifference = Math.max(topic.maxDifference, pair.difference);
            topic.minDifference = Math.min(topic.minDifference, pair.difference);
        }

        topics.count = Object.keys(topics).length;
        return topics;
    };

    this.byTopicsCount = function (pairs) {
        var topics = {};
        for (let pair of pairs) {
            topics[pair.topic] = (topics[pair.topic] || 0) + 1;
        }
        return topics;
    }

    this.minDifference = function (pairs) {
        return Math.min.apply(Math, pairs.map(pair => pair.difference));
    }

    this.maxDifference = function (pairs) {
        return Math.max.apply(Math, pairs.map(pair => pair.difference));
    }

    this.byDifference = function (pairs){
        var differences = {};
        for (let pair of pairs) {
            differences[pair.difference] = (differences[pair.difference] || 0) + 1;
        }
        return differences;
    }

    this.averageDifference = function (pairs){
        return pairs.reduce((total, pair) => total + pair.difference, 0) / pairs.length;
    }
}