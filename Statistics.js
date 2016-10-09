function Statistics(data, disagreementFactor){
    this.topicsIncluded = function(pairs)
    {
        return Array.from(new Set(pairs.map(pair => pair.topic)));
    }
}