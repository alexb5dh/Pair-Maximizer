function Statistics(data, disagreementFactor){
    this.byTopics = function(pairs)
    {
        topics = {};
        for(let pair of pairs){
            topics[pair.topic] = (topics[pair.topic] + 1) || 0 
        }

        return topics;
    }
}