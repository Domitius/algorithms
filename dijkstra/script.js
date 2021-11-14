const graph = {
    'A' : {
        name: 'A',
        siblings: [{name: 'B', weight: 1}, {name: 'C', weight: 2}]
    },
    'B' : {
        name: 'B',
        siblings: [{name: 'D', weight: 4}]
    },
    'C' : {
        name: 'C',
        siblings: [{name: 'D', weight: 2}, {name: 'A', weight: 3}, {name: 'B', weight: 9}]
    },
    'D' : {
        name: 'D',
        siblings: [{name: 'S', weight: 7}, {name: 'B', weight: 6}, {name: 'B', weight: 9}]
    },
    'S' : {
        name: 'S',
        siblings: [{name: 'C', weight: 5}, {name: 'A', weight: 10}]
    }
};

findTheShortestPath('A', 'S', graph);


/**
 * Finds the shortest path using Dijkstra's Algorithm.
 * 
 * @param {Object} graph
 * @param {String} startNode 
 * @param {String} targetNode 
 */
function findTheShortestPath(startNode, targetNode, graph) {
    const vistied = [];
    const queue = [];
    const historyMap = {};
    
    // Initialize
    // nodeName : [weight, prevNode]
    Object.keys(graph).map(key => graph[key].name).forEach((n) => {
        historyMap[n] = [0, null];
    });

    queue.push(startNode);

    while (queue.length > 0) {
        const nodeName = queue.pop();
        const node = graph[nodeName];

        // Calculate distance from starting node to siblings
        const shortestDistanceFromStartingNode = historyMap[nodeName][0];

        let shorterSibling;
        node.siblings.forEach((sibling) => {
            if (!vistied.includes(sibling.name)) {
                const { name, weight } = sibling;
                const distance = shortestDistanceFromStartingNode + weight;
            
                // update history map if path is shorter
                if (historyMap[name][0] == 0 || distance < historyMap[name][0]) {
                    historyMap[name] = [distance, nodeName];
                }
    
                // find next node to look at by finding the min sibling
                if (!shorterSibling || distance < historyMap[shorterSibling][0]) {
                    shorterSibling = name;
                }
            }
        });

        vistied.push(nodeName);

        if (shorterSibling) {
            queue.push(shorterSibling);
        }
    }

    getResults(historyMap, startNode, targetNode);
}

function getResults(historyMap, startNode, targetNode) {
    let path = [];
    let previousNode = historyMap[targetNode][1];
    while (previousNode && previousNode !== startNode) {
        path.push(previousNode);
        previousNode = historyMap[previousNode][1];
    }

    let pathString = '-->';
    while(path.length > 0) {
        pathString += path.pop() + '-->';
    }

    console.log(`${startNode}${pathString}${targetNode}`);
    console.log(historyMap[targetNode][0]);
}