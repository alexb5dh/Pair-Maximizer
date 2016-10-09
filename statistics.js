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

    this.minDifference = function(pairs){
        return Math.min.apply(Math, pairs.map(pair => pair.difference));
    }

    this.maxDifference = function(pairs){
        return Math.max.apply(Math, pairs.map(pair => pair.difference));
    }
}