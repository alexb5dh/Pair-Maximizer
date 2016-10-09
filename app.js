function process(data) {
    var maximizer = new PairMaximizer({ disagreementFactor: 4 });
    var pairs = maximizer.match(data).map(pair => {
        pair.topic = "Topic" + pair.topic;
        pair.person1 = "Person" + pair.person1;
        pair.person2 = "Person" + pair.person2;
        return pair;
    });

    console.dir(pairs);

    var assert = new Assert(data, 4);
    for (let assertionName in assert) {
        assert[assertionName].call(assert, pairs);
    }

    var statistics = new Statistics(data, 4);
    for (let statiticsName in statistics) {
        console.log(statiticsName, statistics[statiticsName].call(statistics, pairs));
    }
}

process(data1);
process(data2);