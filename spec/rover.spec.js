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
    let commands = [new Command("MODE_CHANGE","LOW_POWER"), new Command('STATUS_CHECK')];
    let newMessage = new Message("Test message with two commands", commands);
    expect(newRover.receiveMessage(newMessage).message).toBe("Test message with two commands")
  });

  // 9 tests here!
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let newRover = new Rover(98382);
    let commands = [new Command("MODE_CHANGE","LOW_POWER"), new Command("STATUS_CHECK")];
    let newMessage = new Message("Test message with two commands", commands);
    expect(newRover.receiveMessage(newMessage)).toHaveProperty("message");
    expect(newRover.receiveMessage(newMessage)).toHaveProperty("results");
  });

  // 10 tests here!
  test("responds correctly to the status check command", function() {
    let newRover = new Rover(98382);
    let commands = [new Command("STATUS_CHECK")];
    let newMessage = new Message("Test message with two commands", commands);
    let response = newRover.receiveMessage(newMessage);
    expect(response.results[0]).toHaveProperty("roverStatus");
    expect(response.results[0].roverStatus.mode).toBe(newRover.mode);
    expect(response.results[0].roverStatus.generatorWatts).toBe(newRover.generatorWatts);
    expect(response.results[0].roverStatus.position).toBe(newRover.position);
  });
  
  // 11 tests here!
  test("responds correctly to the mode change command", function() {
    let newRover = new Rover(98382);
    let commands = [new Command("MODE_CHANGE","LOW_POWER")];
    let newMessage = new Message("Test message with two commands", commands);
    let response = newRover.receiveMessage(newMessage);
    expect(response.results[0].completed).toBe(true);
    expect(newRover.mode).toBe('LOW_POWER');
  });

  // 12 tests here!
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let newRover = new Rover(98382);
    let commands = [new Command("MODE_CHANGE","LOW_POWER"), new Command("MOVE",99999)];
    let newMessage = new Message("Test message with two commands", commands);
    let response = newRover.receiveMessage(newMessage);
    expect(response.results[1].completed).toBe(false);
    expect(newRover.mode).toBe('LOW_POWER');
  });

  // 13 tests here!
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let newRover = new Rover(98382);
    let commands = [new Command("MOVE",99999)];
    let newMessage = new Message("Test message with two commands", commands);
    let response = newRover.receiveMessage(newMessage);
    expect(response.results[0].completed).toBe(true);
    expect(newRover.position).toBe(99999);
  });

});
