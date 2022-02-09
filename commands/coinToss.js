function flip(){
    if(Math.floor(Math.random()*2) == 0) return "Head";
    else  return "Tail!";
}

module.exports.flip = flip;