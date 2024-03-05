function onOpen(e) {
  const sheetUi = SpreadsheetApp.getUi();

  sheetUi.createMenu("GPT")
    .addItem("Run", "menuItem1")
    .addSeparator()
    .addItem("Settings", "openSettingsDialog")
    .addToUi();
}

function onInstall(e) {
  onOpen(event);
}

function openSettingsDialog() {
  const html = HtmlService.createHtmlOutputFromFile('Settings');

  SpreadsheetApp.getUi()
    .showModalDialog(html, 'GPT Settings');
}

function menuItem1() {
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
     .alert('You clicked the first menu item!');
}

function menuItem2() {
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
     .alert('You clicked the second menu item!');
}

function storeInput(modelType, temperature) {
  // Process and store the input data (customize this part based on your needs)
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([modelType, temperature]);
}





























