---
layout: post
title: "How to Become Healthier and More Productive Through Self Tracking Without Spending Hundreds of Dollars"
description: "Learn how to get into self-tracking with minimal setup and maximum results"
comments: true
keywords: "quantified-self, self-development"
---

![](https://cdn-images-1.medium.com/max/2476/1*LlFLOHQR0vg6cVOgZn5XFg.png)

From steps, to sleep, to time spent online. Every day you’re generating data which has the power to inform and shape the way you live your life. For those willing to seek, lies a treasure trove of personal insights waiting to be discovered.

In this article we’ll cover:
> 1. Why you should start tracking your data *today,* in order to take advantage of compounding effects
> 2. What to track, and how to use this data to make better data-informed decisions
> 3. How to build robust tracking systems that will stand the test of time

I’ll also talk about my journey and key learnings from quantified self over the last 6 years, along with the tools I’ve built and open-sourced, such as a [real-time personal dashboard](https://github.com/andreilys/personal_dashboard), weekly check-in bot and a daily journal.

## Why you should start tracking today

Despite our best intentions, human memory is fallible. Countless studies have proven that we simply cannot rely on our memories for an accurate picture of the past. You might look back on your week and feel accomplished, but if you dug into the data the story might be quite different.

Quantified self helps remedy this problem by identifying metrics which are trackable and can act as signals that we’re on the right track. With data, you can hold yourself accountable. If you commit to three workouts a week, you can catalog your progress rather than rely on memory alone.

Another benefit of tracking data, is that it gets more valuable as it grows in volume. It can help you identify patterns that would otherwise go undetected. For example, you may notice that while traveling your meditation time drops. This may lead you to implement a new meditation travel protocol to ensure you hit your goal.

It can also act as a historical capsule to get a sense of who your past self was, and how you’ve changed over the years. Whether it’s the websites you’ve visited, or the locations you’ve frequented, all this can act as a way to get a sense of where you’ve been, and where you’re going.

## What to Track

What you choose to track is a byproduct of how much time and money you’d like to commit to self-tracking. The great thing with quantified self is that you can start with a paper and pen, tracking something as simple as your workouts. For those who are lazy, we have technology which can help automate the tracking process.

In most cases, it’s recommended that people start with apps like [Gyroscope](https://gyrosco.pe/) which has both a free and paid tier. Apps like Gyroscope serve as general-purpose data aggregators, providing slick visualizations of your data, which make the process of collecting, and understanding your data a lot easier. They have a variety of integrations with third party data providers, and have an intuitive user interface that makes it easy to identify trends to take action on.

![[Gyroscope](https://gyrosco.pe/)](https://cdn-images-1.medium.com/max/2000/1*yqtk5iRX4gH1_bySt2XVZQ.png)*[Gyroscope](https://gyrosco.pe/)*

For those with technical skills, you can access your data through API’s from services and websites that you use. Below are some examples of things I track:

> - Time spent online — [Rescuetime](https://www.rescuetime.com/)
> - Focus time — [Toggl](https://toggl.com/)
> - Workouts, weight, steps — [Withings](https://www.withings.com/)
> - Meditation — [Insight Timer](https://insighttimer.com/)
> - Workouts, weight, steps — [Withings](https://www.withings.com/)
> - Finances — [Status Money](https://statusmoney.com/)
> - Books — [Goodreads](https://www.goodreads.com/)
> - Writing — [Medium](https://medium.com/)
> - Programming — [Wakatime](https://wakatime.com/)

This data is then aggregated and summarized in three different ways. One is through a dashboard that I have in the corner of my room. This gives me context on how my day is going and whether I’m on track to hit my daily goals. The other is my daily evening journal which uses a [vimwiki](https://vimwiki.github.io) template to grab all my data for the day, giving me another opportunity to reflect on my day. Finally we have a Facebook Messenger bot that pings me on Sundays with the results of the week. Responding to this bot via Messenger with my reflections is then captured in a Google spreadsheet.

![](https://cdn-images-1.medium.com/max/2624/1*I6PKAnzVrdFrPO3r5r7gJA.png)

## Making Better Decisions

Quantified self can help with both micro day-to-day decision making, as well as macro life-altering decisions. In my case, the immediate impact of seeing how I’m spending my day based on the real-time dashboard I have helps me adjust accordingly. If I see that I’m approaching my daily limit for unproductive time on my computer, I can take evasive action to prevent a loss in my daily goals streak. Jerry Seinfeld used the same technique by marking a physical calendar every day that he wrote new comedic material. In this way, he would build momentum and avoid [“breaking chain”](https://www.writersstore.com/dont-break-the-chain-jerry-seinfeld/).

![](https://cdn-images-1.medium.com/max/2208/1*Ang8HOeKHkNrTS9WzxNYKQ.png)

Below are three other data-driven decisions I’ve made with the help of quantified self:

*Accomplishing Internal Goals*

Reading through my journals, I realized that the days where I felt most nourished were the days that I spent focusing, meditating and not having my attention get hijacked by time-wasting sites. To that end, I decided to setup some internal goals which consist of spending 2.5 hours focusing ([Toggl](https://toggl.com/)), 20mins meditating ([Insight Timer](https://insighttimer.com/)), and less than 1 hour on unproductive websites ([RescueTime](https://www.rescuetime.com/)). After implementing these measures and building out a dashboard to track this, I was able to make better micro-decisions around how I spent my day, which significantly affected the macro-outlook of my life.

*Scheduled Walks*

I’ve always viewed myself as a fairly active person and am well aware of the risks of a sedentary lifestyle. That’s why I was surprised when I learned I was walking less than 5000 steps a day. Noticing this pattern, I decided to take action and implement a solution. Each afternoon, when I would typically experience a drop in productivity, I blocked off 30 minutes to go for a walk. This served as a natural break in the day, which resulted in increased steps, and a much more productive afternoon.

*Limiting Online Communications*

Looking at the visualization of my Rescue Time data, I realized how frequently I checked email and social media throughout the day. To combat this, I purged my phone of apps that weren’t necessary and disabled notifications on everything that wasn’t essential. I also implemented content blocking through the[ iOS content restriction feature](https://support.apple.com/en-us/HT201304), and installed a [Chrome extension](https://chrome.google.com/webstore/detail/go-fucking-work/hibmkkpfegfiinilnlabbfnjcopdiiig?hl=en) whose purpose was to block me from visiting unproductive sites during work hours. I also experimented with phone-free Sunday’s, with the help of a [timed-lock box](https://www.amazon.com/Kitchen-Safe-Locking-Container-Height/dp/B00JGFQTD2), which would prevent me from using my phone until the time I set expired.

## My Three Rules for Quantified Self

### Tracking must be frictionless

I am a firm proponent of lazy tracking, which requires little to no input from you. Having spent years trying out various quantified self apps, I’ve come to the conclusion that anything requiring manual input from me is going to fail long term. When I consider adding a new data source, I always ask myself “Will I still be doing this 5 years from now?”. In this way I’m able to build robust systems that I can commit to for the long term.

### There’s a process in place to review my data and make decisions

Having a dashboard in the corner of my room displaying my goals forces me to review and make adjustments during my day. Same thing with my daily journal and weekly check-in bot, I get messaged and can review the data without much hassle. Having a proper feedback loop will ensure that you get the most out of your personal data collection.

### Embracing open data

One of my guiding principles for integrating a new data source is that the website or device must have an API or way of exporting the data. Too many quantified self devices and websites lock down your data behind proprietary systems. Typically the visualization tools are limited and there is a very real chance of the company shutting down or being acquired. Once that happens, all the data that you built up over the years is as good as gone.

Adhering to these three rules is what has helped me stick with my current quantified self system for over 3 years now. Where before I had many false starts, now I’m much more consistent and systematic in the way I collect and review my data. This ensures that I will be much more likely to comply long-term, it also allows me to evaluate future extensions of the data this way.

As you go about setting up your own tracking system, I encourage you to keep iterating and improving on your system.
