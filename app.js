window.processData = function process(data) {
    console.log("Data:", data);

    var maximizer = new PairMaximizer({ disagreementFactor: 4 });
    var pairs = maximizer.match(data).map(pair => {
        return {
            topic: "Topic" + pair.topic,
            person1: "Person" + pair.person1,
            person2: "Person" + pair.person2,
            difference: pair.difference
        };
    });

    console.log("Pairs:", pairs);

    var assert = new Assert(data, 4);
    for (let assertionName in assert) {
        assert[assertionName].call(assert, pairs);
    }

    var statistics = new Statistics(data, 4);
    for (let statiticsName in statistics) {
        console.log(statiticsName, statistics[statiticsName].call(statistics, pairs));
    }

    console.log("\n");
};