---
layout: post
title: "Driver Trees: A Simple Concept to Understand Your Metrics"
description: ""
comments: true
keywords: "data-science"
---

As data scientists, one of the key responsibilities is creating and understanding the key metrics that power the products and businesses that we support. One of the most useful exercises in understanding metrics is the creation of a driver tree.

For example, say you're a startup whose north star metric is net profit. Now, what happens when you decompose that metric? The first layer would be something like revenue and cost. We would then go layer, by layer decomposing the metrics that contribute to the composite metric a level above. For example, we might break down revenue into the various revenue streams we have (i.e. ad and subscription revenue).

As you drill further and further into the flow you can start uncovering low-hanging fruit. Perhaps the reason subscription revenue isn't growing as fast as transactional is because the conversion rate for the page happens to be low. If you notice this, then you can escalate and fix this issue by running A/B tests with new design variants.

One of the other great benefits of driver trees is that it makes it much easier to explain why metrics are moving up or down. I remember the first time I got a call on a Sunday asking me why a certain metric had dropped, and it took me nearly an hour to come up with an adequate explanation. After this happened, I followed the three-step process below to ensure that I wouldn't waste time running queries on a Sunday.

1. Create a cubed dataset of all your driver metrics, grouping on filters like country and device.

2. Use this dataset to create a dashboard that allows you to see all your driver metrics in one place

3. Add anomaly detection so that you can get ahead of problems and be proactive about solutions

By setting up this infrastructure, you'll empower your stakeholders to also understand why things are moving the way they are, which means fewer ad-hocs for you to deal with.
