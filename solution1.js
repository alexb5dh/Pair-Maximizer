// Priorities:
// 1) minimize number of topics
// 2) maximize difference

// Description:
// Bottom-up approach: we sort conflict pairs in specific order and add them 1 by 1 to output
// ignoring if any person from pair is already added.
//   
// Order: first take pairs from topics with maximum number of disagreements,
// foreach topic taking them first for person with minimum number of disagreements.
// 
// Problems:
// - disagreement in problems is not well maximized
// - may include topics with just a few pairs

function PairMaximizer(config) {
    var disagreementFactor = config.disagreementFactor;

    function buildDisagreementMatrix(data) {
        var DisagreementMatrix = [];

        for (let t = 0; t < data[0].length; t++) {
            let topicDisagreement = [];
            topicDisagreement.total = 0;

            for (let p1 = 0; p1 < data.length; p1++) {
                let topicPersonDisagreement = [];

                for (let p2 = p1 + 1; p2 < data.length; p2++) {

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
        sortBy(matrix, topicDisagreement => -topicDisagreement.total)
        for (let topicDisagreement of matrix) {
            sortBy(topicDisagreement, topicPersonDisagreement => topicPersonDisagreement.length)
            for (let topicPersonDisagreement of topicDisagreement) {
                sortBy(topicPersonDisagreement, disagreement => -disagreement.difference)
            }
        }
    }

    function match(data) {
        var pairs = [];
        var matched = new Set();

        var matrix = buildDisagreementMatrix(data);
        orderDisagreementMatrix(matrix);

        for (let topicDisagreement of matrix) {

            for (let topicPersonDisagreement of topicDisagreement) {

                for (let disagreement of topicPersonDisagreement) {
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