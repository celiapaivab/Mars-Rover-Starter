const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts", function() {
    let newRover = new Rover(98382);
    expect(newRover.position).toBe(98382);
    expect(newRover.mode).toBe("NORMAL");
    expect(newRover.generatorWatts).toBe(110);
  });

  // 8 tests here!
  test("response returned by receiveMessage contains the name of the message", function() {
    let newRover = new Rover(98382);
    let newMessage = new Message("Test message with two commands");
    expect(newRover.receiveMessage(newMessage).message).toBe("Test message with two commands")
  });

  // 9 tests here!
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let newRover = new Rover(98382);
    let commands = [new Command("MODE_CHANGE","LOW_POWER"), new Command('STATUS_CHECK')];
    let newMessage = new Message("Test message with two commands", commands);
    expect(newRover.receiveMessage(newMessage)).toHaveProperty("message");
    expect(newRover.receiveMessage(newMessage)).toHaveProperty("results");
  });

  // 10 tests here!
  // 11 tests here!
  // 12 tests here!
  // 13 tests here!
});

// let newCommand = [new Command("MODE_CHANGE","LOW_POWER"), new Command('STATUS_CHECK')];
// let newMessage = new Message("Test message with two commands", commands);
// let newRover = new Rover(98382);

// expect(newRover.position).toBe(98382);
// expect(newRover.value).toBe("LOW_POWER");
// expect(newRover.value).toBe("LOW_POWER");
