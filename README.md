# StraviaTEC

Welcome to the StraviaTEC project repository. This project aims to provide a platform for athletes to keep track of their activities and improve their performance post-pandemic. This README offers a comprehensive guide to understanding the project, its structure, and its main objectives.

## Table of Contents

1. [General Objective](#general-objective)
2. [Specific Objectives](#specific-objectives)
3. [Problem Description](#problem-description)
4. [Software Requirements](#software-requirements)
5. [Non-functional Requirements](#non-functional-requirements)
6. [Directory Structure](#directory-structure)
7. [Getting Started](#getting-started)

## General Objective

To develop a platform for athletes and event organizers to track, share, and manage sports activities.

## Specific Objectives

- Apply conceptual and relational model concepts.
- Create a database in SQL Server and MongoDB.
- Develop two API services: one for SQL and one for MongoDB.
- Design a user-friendly web page using tools like Angular, Bootstrap, HTML5, CSS, and Reporting Services or Crystal Reports.
- Create installation documentation for cloud deployment (Azure-AWS).
- Collaborate actively in the team and follow team guidelines.

## Problem Description

Post-pandemic, individual sports like athletics, cycling, and hiking have gained popularity. StraviaTEC is a solution for athletes (beginners to elites) to record their sessions, share activities, and enhance training. The platform has two main views: "Vista Deportista" for athletes and "Vista Organizador" for event organizers.

## Software Requirements

- **Vista Deportista**: Allows athletes to view their sessions, manage accounts, upload activities, comment, register for events, and more.
- **Vista Organizador**: Allows organizers to manage events, accept registrations, oversee challenges, and handle groups.
- **Default Values**: Includes default activities (like running, swimming, hiking), sponsors, and categories.
- **Mobile Application**: Enables athletes to record activities in real-time, track distance, and store the GPS route.

## Non-functional Requirements

- Web application using Angular/React, Bootstrap, HTML5, CSS.
- Databases in Microsoft SQL Server and MongoDB.
- Logic in the database should be via Stored Procedures, Views, and Triggers.
- Service layer in C# using OOP, hosted in the cloud (Azure or AWS).
- A single point of contact for the team for communications.

## Directory Structure

- **api/sql/**: Contains the API service for SQL.
- **api/mongo/**: Contains the API service for MongoDB.
- **database/sql/**: Contains the SQL Server database scripts.
- **database/mongo/**: Contains the MongoDB scripts.
- **web/**: Contains the web application developed using Angular/React.
- **mobile/**: Houses the mobile application for athletes.

## Getting Started

To kickstart with the project, ensure you have all necessary tools and dependencies installed. Follow individual READMEs and setup guides inside each directory (`api/sql/`, `api/mongo/`, `database/sql/`, `database/mongo/`, `web/`, and `mobile/`) for more detailed installation and running instructions.
