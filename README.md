# ☕ Habit Tracker

A cross-platform habit and consumption tracking application built with **SwiftUI**, **React**, **Firebase**, and **Bluetooth Low Energy**.

Track coffee, water, medication, exercise, and other daily habits using your phone, web browser, or even physical BLE buttons connected to an Arduino.

---

## Features

### 📱 iOS Application

* SwiftUI interface
* Local storage using SwiftData
* Firebase Authentication
* Firebase Firestore integration
* Daily goals and progress tracking
* Streak tracking
* Warning and danger thresholds
* BLE button support
* Physical habit logging using custom hardware

### 💻 Web Application

* React frontend
* Firebase Authentication
* Shared Firestore backend
* Create habits
* Log habits
* Live updates using Firestore listeners

### 🔵 Bluetooth Hardware

* Arduino based BLE button controller
* One-button habit logging
* Configurable button mapping
* Automatic event creation in the app

---

## Technology Stack

### iOS

* SwiftUI
* SwiftData
* CoreBluetooth
* Firebase Authentication
* Firebase Firestore

### Web

* React
* Firebase Authentication
* Firestore
* Bootstrap 5

### Hardware

* Arduino
* BLE module
* Push buttons

---

## Architecture

```text
iPhone App
     ↓
Firebase Firestore
     ↑
React Web App
```

The iOS app stores data locally using SwiftData for fast access while synchronizing important data with Firebase for cross-platform access.

---

## Firestore Structure

```text
users
    uid

items
    itemId
        ownerId
        name
        icon
        category
        warningLevel
        dangerLevel
        dailyGoal

logs
    logId
        ownerId
        itemId
        itemName
        timestamp
```

---

## Screenshots

### iOS

* Dashboard
* Item Details
* BLE Mapping
* Statistics
* Daily Progress

### Web

* Login
* Dashboard
* Item Logging

---

## Getting Started

### iOS

Requirements:

* Xcode 15+
* iOS 17+
* Firebase Project

```bash
git clone https://github.com/yourusername/HabitTracker.git
```

Add your:

```text
GoogleService-Info.plist
```

Then run the project in Xcode.

---

### Web

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm start
```

Create:

```text
src/firebase.js
```

and add your Firebase configuration.

---

## BLE Hardware Setup

The app supports physical BLE buttons for instant logging.

Example:

```text
BTN1 → Coffee
BTN2 → Water
BTN3 → Medication
BTN4 → Walk
```

Pressing a physical button automatically creates a log entry in the app.

---

## Future Plans

* Charts and analytics
* Cloud synchronization improvements
* Android application
* Apple Watch companion app
* Shared family tracking
* Export and reporting

---

## License

MIT License

---

## Author

Built by Billy Lundh.
