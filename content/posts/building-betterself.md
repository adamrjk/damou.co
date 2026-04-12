---
title: "What I learned shipping BetterSelf"
date: "2025-03-20"
description: "Notes on building and launching my first iOS app."
tags: ["building", "ios", "betterself"]
---

BetterSelf is a habit tracker and daily reflection app for iOS. I shipped it a few months ago. Here's what stuck.

## The thing nobody tells you about shipping

The hardest part isn't the code. The code is actually the fun part. The hardest part is the last 20% — all the things that aren't features.

App Store screenshots. Privacy policy. Support email. Icon at every required size. Edge cases on older OS versions. Review guidelines you didn't know existed.

None of that is interesting. All of it takes time.

## What I'd do differently

**Ship earlier.** I spent a long time polishing things nobody cared about. The first version should have been half the features, out the door twice as fast.

**Talk to users sooner.** I made assumptions about what people wanted and built accordingly. Most of those assumptions were wrong. Fifteen minutes of user interviews early on would have saved weeks of work.

**Separate "building" from "deciding."** I wasted a lot of time making decisions mid-build. Things like architecture choices or feature scope shouldn't be figured out while you're writing code. Decide first, then build.

## What worked

Swift and Firebase turned out to be a good combo for a solo project. Firebase handled auth and storage so I could focus on the actual product. SwiftUI made iteration fast.

Keeping the scope small. BetterSelf does one thing. That was tempting to expand and I'm glad I didn't.

## What's next

I'm still working on it. Adding a journaling section and fixing a sync bug that's been annoying me for weeks. The goal is to make it something I use every day — which it mostly is.

If you're building something, ship it. The feedback from real users is worth more than another week of polishing in private.
