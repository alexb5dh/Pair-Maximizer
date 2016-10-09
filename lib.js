function sortBy(array){
    var maps = Array.prototype.slice.call(arguments, 1);

    array.sort((el1, el2) => {
        var diff = el1 - el2;
        for(let map of maps){
            diff = map(el1) - map(el2);
            if(diff != 0) return diff;
        }
        return diff;
    });
}