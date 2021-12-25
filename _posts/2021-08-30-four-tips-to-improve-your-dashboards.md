---
layout: post
title: "Four Tips to Improve Your Dashboards"
description: ""
comments: true
keywords: "data-science"
---

Dashboards are a frequent by-product of a data scientist's work output. Whether it's a dashboard to monitor the performance and feature drift of a machine learning model, or an executive top-line dashboard, improving your dashboarding skills is a great return on investment for data scientists.

In this piece, we explore four tips that you can start applying today in order to improve any existing or future dashboards.

## 1. Determine The Audience and Purpose

The first thing to figure out when building out a dashboard is to determine the audience and purpose. For example, if it's for an executive you'll probably want to stick with simple key metrics rather than overloading them with operational ones. Additionally, is this dashboard going to be looked at once a week, once a quarter, or daily? What type of questions are people hoping to solve with your dashboard, and do you provide the necessary functionality to solve them? To answer these questions, it's useful to sit down with your stakeholders and hear from them directly.

## 2. Choose Relevant Key Performance Indicators

Once you know your audience and purpose, you can start coming up with the relevant KPIs. Rather than creating 20+ different graphs, focus on simplicity and curating a specific view. For those who want answers to more operational questions, consider creating a cubed dataset and teaching them some SQL so that they can answer their own questions rather than needing to spin up a dashboard that only gets looked at once.

## 3. Consider Aesthetics

In general, people perceive more aesthetic design as easier to use, so it's important to consider things like color, legend, axis labels, spacing, and the type of graph when you're designing your dashboards. The Reddit community /r/dataisbeautiful is a great place to find inspiration. I recommend saving any dashboards you like into an inspiration folder for future reference.

## 4. Think About Maintainability

An often overlooked part of dashboards is maintainability. This includes things like documentation, as well as keeping a changelog through a service like Github. Many dashboards allow you to write SQL queries and turn them into dashboards, but if you don't build an initial aggregate table, it can lead to headaches later on when you need to re-write or extend logic. Additionally having a plan for when the dashboard breaks, will go a long way to making sure that your dashboard remains a reliable source of truth.


