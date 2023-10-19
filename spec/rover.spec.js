const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let roverObject = new Rover(111);
  let roverResponse = roverObject.receiveMessage(message)

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let defaultRoverObject = new Rover(112);
    expect(defaultRoverObject.mode).toEqual("NORMAL");
    expect(defaultRoverObject.generatorWatts).toEqual(110);
    });

  it("response returned by receiveMessage contains the name of the message", function() {
    expect(roverResponse.message).toEqual("Test message with two commands");
    });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    expect(roverResponse.results.length).toEqual(2);
    });

  it("responds correctly to the status check command", function() {

    expect(roverResponse.results[1].roverStatus.mode).toEqual("LOW_POWER");
    expect(roverResponse.results[1].roverStatus.position).toEqual(111);
    expect(roverResponse.results[1].roverStatus.generatorWatts).toEqual(110);
    });

  it("responds correctly to the mode change command", function() {
    commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    message = new Message('Test message with two commands', commands);
    roverResponse = roverObject.receiveMessage(message)

    expect(roverResponse.results[1].roverStatus.mode).toEqual("LOW_POWER");

    commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK')];
    message = new Message('Test message with two commands', commands);
    roverResponse = roverObject.receiveMessage(message)

    expect(roverResponse.results[1].roverStatus.mode).toEqual("NORMAL");
    });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 113)];
    message = new Message('Test message with two commands', commands);
    roverResponse = roverObject.receiveMessage(message)

    expect(roverResponse.results[1].completed).toEqual(false);

    });

  it("responds with the position for the move command", function() {
    commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 113)];
    message = new Message('Test message with two commands', commands);
    roverResponse = roverObject.receiveMessage(message)

    expect(roverResponse.results[1].position).toEqual(113);

    });


});
