window.addEventListener("load", function () {
    function process(data) {
        var maximizer = new PairMaximizer(4);
        var pairs = maximizer.match(data);
        var descriptions = pairs.map(pair =>
            "Person" + (pair.person1 + 1) + " vs " + "Person" + (pair.person2 + 1)
            + " on " + "Topic" + (pair.topic + 1)
            + " with difference " + pair.difference
        );

        console.dir(descriptions, "\n");

        var assert = new Assert(data, 4);
        for(var assertionName in assert){
            assert[assertionName].call(assert, pairs);
        }

        var statistics = new Statistics(data, 4);
        for(var statiticsName in statistics){
            console.log(statiticsName, statistics[statiticsName].call(statistics, pairs));
        }
    }

    process(data1);
    process(data2);
});