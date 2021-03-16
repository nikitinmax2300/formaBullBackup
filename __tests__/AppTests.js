const Application = require("spectron").Application;
const electronPath = require("electron");
const path = require("path");

let app;

beforeAll(() => {
  app = new Application({
    path: electronPath,

    args: [path.join(__dirname, "../../")],
  });

  return app.start();
}, 15000);

afterAll(function () {
  if (app && app.isRunning()) {
    return app.stop();
  }
});

test("Displays App window", async function () {
  let windowCount = await app.client.getWindowCount();

  expect(windowCount).toBe(1);
});

test("Header displays appropriate text", async function () {
  // const headerElement = await app.client.$("h1");
  // let headerText = await headerElement.getText();
  
  let titleText = "formaBull | Hook 'em by the Horns";
  let title = await app.client.getTitle();
  expect(title).toBe(titleText);

  // expect(headerText).toBe("💖 Hello World!");
});



// app.start().then(function () {
//   // Check if the window is visible
//   return app.browserWindow.isVisible()
// }).then(function (isVisible) {
//   // Verify the window is visible
//   assert.equal(isVisible, true)
// }).then(function () {
//   // Get the window's title
//   return app.client.getTitle()
// }).then(function (title) {
//   // Verify the window's title
//   assert.equal(title, 'My App')
// }).then(function () {
//   // Stop the application
//   return app.stop()
// }).catch(function (error) {
//   // Log any failures
//   console.error('Test failed', error.message)
// })