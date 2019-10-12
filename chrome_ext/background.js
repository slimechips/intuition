// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const generateReport = (text) => {
  const query = text.selectionText;
  const reportUrl = `http://localhost:3000/report#selectionText=${query}`;
  chrome.tabs.create({
    url: reportUrl,
  })
};


chrome.runtime.onInstalled.addListener(function() {
  
});


chrome.contextMenus.create({
  title: 'Get Global Perspective on "%s"',
  contexts: ['selection'],
  id: 'generate_report',
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === 'generate_report') {
    generateReport(info.selectionText);
  }
});