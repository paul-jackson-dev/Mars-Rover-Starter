class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
    }

    receiveMessage(message){ //message is a message object
      let object = {}; //create a new object to return
      let resultsArray = [];
      for(let command of message.commands){
         let resultsObject = {};

         if (command.commandType === "MOVE"){
            if (this.mode === 'NORMAL'){
               this.position = command.value;
               resultsObject['completed'] = this.position === command.value ? true : false;
               resultsObject['position'] = this.position;
            } else{
               resultsObject['completed'] = false
            }
         }
         else if (command.commandType === "STATUS_CHECK"){
            let specialObject = {}
            specialObject['completed'] = true;
            specialObject['mode'] = this.mode;
            specialObject['generatorWatts'] = this.generatorWatts;
            specialObject['position'] = this.position;
            resultsObject['roverStatus'] = specialObject

         }
         else if (command.commandType === "MODE_CHANGE"){
            this.mode = command.value;
            resultsObject['completed'] = this.mode === command.value ? true : false;
         }

         resultsArray.push(resultsObject);
      }

      object['message'] = message.name;
      object['results'] = resultsArray;

      return object;
    }
}

module.exports = Rover;