// Priorities:
// 1) minimize number of topics
// 2) maximize difference 

function PairMaximizer(disagreementFactor) {

    function buildDisagreementMatrix(data) {
        var DisagreementMatrix = [];

        for (t = 0; t < data[0].length; t++) {
            let topicDisagreement = [];
            topicDisagreement.total = 0;

            for (p1 = 0; p1 < data.length; p1++) {
                let topicPersonDisagreement = [];

                for (p2 = p1 + 1; p2 < data.length; p2++) {

                    let difference = Math.abs(data[p1][t] - data[p2][t]);
                    if (difference >= disagreementFactor) {

                        topicPersonDisagreement.push({
                            topic: t,
                            person1: p1,
                            person2: p2,
                            difference: difference
                        });

                    }
                }

                topicDisagreement.push(topicPersonDisagreement);
                topicDisagreement.total += topicPersonDisagreement.length;
            }
            DisagreementMatrix.push(topicDisagreement);
        }

        return DisagreementMatrix;
    }

    function orderDisagreementMatrix(matrix) {
        function sortBy(array, map) {
            array.sort((e1, e2) => (map(e1) - map(e2)));
        };

        sortBy(matrix, topicDisagreement => -topicDisagreement.total)
        for (topicDisagreement of matrix) {
            sortBy(topicDisagreement, topicPersonDisagreement => -topicPersonDisagreement.length)
            for (topicPersonDisagreement of topicDisagreement) {
                sortBy(topicPersonDisagreement, disagreement => -disagreement.difference)
            }
        }
    }

    function match(data) {
        var pairs = [];
        var matched = new Set();

        var matrix = buildDisagreementMatrix(data);
        orderDisagreementMatrix(matrix);

        for (topicDisagreement of matrix) {

            for (topicPersonDisagreement of topicDisagreement) {

                for (disagreement of topicPersonDisagreement) {
                    [person1, person2] = [disagreement.person1, disagreement.person2];

                    if (matched.has(person1))
                        break;
                    if (matched.has(person2))
                        continue;

                    pairs.push(disagreement);
                    matched.add(person1);
                    matched.add(person2);
                }
            }
        }

        return pairs;
    }

    this.match = match;
}