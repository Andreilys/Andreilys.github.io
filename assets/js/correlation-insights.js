(() => {
  const MIN_DAYS = 14;
  const CORRELATION_THRESHOLD = 0.3;
  const SIGNIFICANCE_THRESHOLD = 0.05;
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  const metricLabels = {
    sleepDuration: "Sleep duration",
    wellnessScore: "Wellness score",
    steps: "Steps",
    sleepQuality: "Sleep quality",
    workout: "Workout days",
    hrv: "HRV",
    mindfulness: "Mindfulness",
    restingHeartRate: "Resting heart rate",
    bedtimeConsistency: "Bedtime consistency",
    isWeekend: "Weekend",
  };

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  const pseudoRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const generateSampleData = (days = 30) => {
    const today = new Date();
    const data = [];

    for (let i = days - 1; i >= 0; i -= 1) {
      const date = new Date(today.getTime() - i * ONE_DAY_MS);
      const dayIndex = days - 1 - i;
      const isWeekend = date.getDay() === 0 || date.getDay() === 6 ? 1 : 0;
      const noise = (seed, scale = 1) => (pseudoRandom(seed) - 0.5) * scale;

      const sleepDuration =
        6.8 +
        Math.sin(dayIndex / 4) * 0.8 +
        (isWeekend ? 0.5 : 0) +
        noise(dayIndex * 3, 0.4);
      const steps =
        7600 +
        Math.cos(dayIndex / 3.5) * 1200 +
        (isWeekend ? -1800 : 400) +
        noise(dayIndex * 4, 500);
      const sleepQuality =
        72 +
        sleepDuration * 3.2 +
        steps / 6000 +
        noise(dayIndex * 5, 2.5);
      const workout = dayIndex % 3 === 0 ? 1 : 0;
      const hrv =
        52 +
        workout * 6 +
        sleepDuration * 1.6 +
        noise(dayIndex * 6, 3);
      const mindfulness = 6 + (dayIndex % 5) * 4 + (isWeekend ? 6 : 0);
      const restingHeartRate =
        61 - mindfulness * 0.18 - workout * 1.4 + noise(dayIndex * 7, 2);
      const bedtimeConsistency =
        18 + (isWeekend ? 16 : 4) + (dayIndex % 6) * 2;
      const wellnessScore =
        60 + sleepDuration * 4.4 + workout * 4 + noise(dayIndex * 8, 3);

      data.push({
        date,
        sleepDuration: Number(sleepDuration.toFixed(2)),
        wellnessScore: Number(wellnessScore.toFixed(2)),
        steps: Math.round(steps),
        sleepQuality: Number(sleepQuality.toFixed(2)),
        workout,
        hrv: Number(hrv.toFixed(2)),
        mindfulness,
        restingHeartRate: Number(restingHeartRate.toFixed(2)),
        bedtimeConsistency: Number(bedtimeConsistency.toFixed(2)),
        isWeekend,
      });
    }

    return data;
  };

  const mean = (values) =>
    values.reduce((total, value) => total + value, 0) / values.length;

  const pearsonCorrelation = (xValues, yValues) => {
    const xMean = mean(xValues);
    const yMean = mean(yValues);

    let numerator = 0;
    let xDenominator = 0;
    let yDenominator = 0;

    for (let i = 0; i < xValues.length; i += 1) {
      const xDiff = xValues[i] - xMean;
      const yDiff = yValues[i] - yMean;
      numerator += xDiff * yDiff;
      xDenominator += xDiff ** 2;
      yDenominator += yDiff ** 2;
    }

    return numerator / Math.sqrt(xDenominator * yDenominator);
  };

  const gamma = (z) => {
    const coefficients = [
      0.99999999999980993,
      676.5203681218851,
      -1259.1392167224028,
      771.32342877765313,
      -176.61502916214059,
      12.507343278686905,
      -0.13857109526572012,
      0.000009984369578019572,
      0.00000015056327351493116,
    ];

    if (z < 0.5) {
      return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    }

    const g = 7;
    z -= 1;
    let x = coefficients[0];
    for (let i = 1; i < coefficients.length; i += 1) {
      x += coefficients[i] / (z + i);
    }

    const t = z + g + 0.5;
    return Math.sqrt(2 * Math.PI) * t ** (z + 0.5) * Math.exp(-t) * x;
  };

  const studentTPdf = (tValue, degreesOfFreedom) => {
    const numerator = gamma((degreesOfFreedom + 1) / 2);
    const denominator =
      Math.sqrt(degreesOfFreedom * Math.PI) * gamma(degreesOfFreedom / 2);
    return (
      (numerator / denominator) *
      (1 + tValue ** 2 / degreesOfFreedom) ** (-(degreesOfFreedom + 1) / 2)
    );
  };

  const studentTCdf = (tValue, degreesOfFreedom) => {
    const steps = 1200;
    const upper = Math.abs(tValue);
    const stepSize = upper / steps;
    let sum = 0;

    for (let i = 0; i <= steps; i += 1) {
      const x = i * stepSize;
      const weight = i === 0 || i === steps ? 1 : i % 2 === 0 ? 2 : 4;
      sum += weight * studentTPdf(x, degreesOfFreedom);
    }

    const integral = (stepSize / 3) * sum;
    const cdf = 0.5 + integral * Math.sign(tValue || 1);
    return Math.min(1, Math.max(0, cdf));
  };

  const pValueFromCorrelation = (correlation, n) => {
    if (n < 3) {
      return 1;
    }

    const tValue =
      Math.abs(correlation) * Math.sqrt((n - 2) / (1 - correlation ** 2));
    const cdf = studentTCdf(tValue, n - 2);
    return 2 * (1 - cdf);
  };

  const formatPercentage = (value) => `${Math.abs(value).toFixed(1)}%`;

  const formatDelta = (value, unit = "") =>
    `${Math.abs(value).toFixed(1)}${unit}`;

  const buildInsight = ({
    metric1,
    metric2,
    correlation,
    insight,
    confidence,
    sampleCount,
    pValue,
  }) => ({
    metric1,
    metric2,
    correlation,
    insight,
    confidence,
    sampleCount,
    pValue,
  });

  const computeInsights = (data) => {
    const insights = [];

    const sleepDuration = data.map((entry) => entry.sleepDuration);
    const nextDayWellness = data
      .slice(1)
      .map((entry) => entry.wellnessScore);
    const sleepDurationLagged = data
      .slice(0, -1)
      .map((entry) => entry.sleepDuration);

    if (sleepDurationLagged.length >= MIN_DAYS) {
      const correlation = pearsonCorrelation(sleepDurationLagged, nextDayWellness);
      const pValue = pValueFromCorrelation(correlation, sleepDurationLagged.length);
      const aboveThreshold = sleepDurationLagged.filter((value) => value >= 7.5);
      const belowThreshold = sleepDurationLagged.filter((value) => value < 7.5);

      const nextDayWellnessAbove = data
        .slice(1)
        .filter((_, index) => sleepDurationLagged[index] >= 7.5)
        .map((entry) => entry.wellnessScore);
      const nextDayWellnessBelow = data
        .slice(1)
        .filter((_, index) => sleepDurationLagged[index] < 7.5)
        .map((entry) => entry.wellnessScore);

      if (aboveThreshold.length && belowThreshold.length) {
        const delta = mean(nextDayWellnessAbove) - mean(nextDayWellnessBelow);
        insights.push(
          buildInsight({
            metric1: "sleepDuration",
            metric2: "wellnessScore",
            correlation,
            pValue,
            sampleCount: sleepDurationLagged.length,
            insight: `On nights with 7.5+ hours of sleep, your next-day wellness score averages ${formatDelta(
              delta,
            )} points ${delta >= 0 ? "higher" : "lower"}.`,
            confidence: Math.min(1, Math.abs(correlation)) * (1 - pValue),
          }),
        );
      }
    }

    const steps = data.map((entry) => entry.steps);
    const sleepQuality = data.map((entry) => entry.sleepQuality);
    if (steps.length >= MIN_DAYS) {
      const correlation = pearsonCorrelation(steps, sleepQuality);
      const pValue = pValueFromCorrelation(correlation, steps.length);
      const medianSteps = steps.slice().sort((a, b) => a - b)[
        Math.floor(steps.length / 2)
      ];
      const qualityHighSteps = sleepQuality.filter(
        (_, index) => steps[index] >= medianSteps,
      );
      const qualityLowSteps = sleepQuality.filter(
        (_, index) => steps[index] < medianSteps,
      );
      const delta = mean(qualityHighSteps) - mean(qualityLowSteps);

      insights.push(
        buildInsight({
          metric1: "steps",
          metric2: "sleepQuality",
          correlation,
          pValue,
          sampleCount: steps.length,
          insight: `Higher step days are linked to sleep quality that is ${formatDelta(
            delta,
          )} points ${delta >= 0 ? "better" : "worse"} on average.`,
          confidence: Math.min(1, Math.abs(correlation)) * (1 - pValue),
        }),
      );
    }

    const workouts = data.map((entry) => entry.workout);
    const hrv = data.map((entry) => entry.hrv);
    if (workouts.length >= MIN_DAYS) {
      const correlation = pearsonCorrelation(workouts, hrv);
      const pValue = pValueFromCorrelation(correlation, workouts.length);
      const hrvWorkout = hrv.filter((_, index) => workouts[index] === 1);
      const hrvRest = hrv.filter((_, index) => workouts[index] === 0);
      const delta = ((mean(hrvWorkout) - mean(hrvRest)) / mean(hrvRest)) * 100;

      insights.push(
        buildInsight({
          metric1: "workout",
          metric2: "hrv",
          correlation,
          pValue,
          sampleCount: workouts.length,
          insight: `Your HRV is ${formatPercentage(delta)} ${
            delta >= 0 ? "higher" : "lower"
          } on workout days.`,
          confidence: Math.min(1, Math.abs(correlation)) * (1 - pValue),
        }),
      );
    }

    const mindfulness = data.map((entry) => entry.mindfulness);
    const restingHeartRate = data.map((entry) => entry.restingHeartRate);
    if (mindfulness.length >= MIN_DAYS) {
      const correlation = pearsonCorrelation(mindfulness, restingHeartRate);
      const pValue = pValueFromCorrelation(correlation, mindfulness.length);
      const mindfulDays = restingHeartRate.filter(
        (_, index) => mindfulness[index] >= 10,
      );
      const lightDays = restingHeartRate.filter(
        (_, index) => mindfulness[index] < 10,
      );
      const delta = mean(mindfulDays) - mean(lightDays);

      insights.push(
        buildInsight({
          metric1: "mindfulness",
          metric2: "restingHeartRate",
          correlation,
          pValue,
          sampleCount: mindfulness.length,
          insight: `On days with 10+ minutes of mindfulness, your resting heart rate is ${formatDelta(
            delta,
            " bpm",
          )} ${delta <= 0 ? "lower" : "higher"} on average.`,
          confidence: Math.min(1, Math.abs(correlation)) * (1 - pValue),
        }),
      );
    }

    const bedtimeConsistency = data.map((entry) => entry.bedtimeConsistency);
    if (bedtimeConsistency.length >= MIN_DAYS) {
      const correlation = pearsonCorrelation(bedtimeConsistency, sleepQuality);
      const pValue = pValueFromCorrelation(correlation, bedtimeConsistency.length);
      const consistentQuality = sleepQuality.filter(
        (_, index) => bedtimeConsistency[index] <= 30,
      );
      const inconsistentQuality = sleepQuality.filter(
        (_, index) => bedtimeConsistency[index] > 30,
      );
      const delta = mean(consistentQuality) - mean(inconsistentQuality);

      insights.push(
        buildInsight({
          metric1: "bedtimeConsistency",
          metric2: "sleepQuality",
          correlation,
          pValue,
          sampleCount: bedtimeConsistency.length,
          insight: `Keeping bedtime within 30 minutes is linked to sleep quality that is ${formatDelta(
            delta,
          )} points ${delta >= 0 ? "higher" : "lower"}.`,
          confidence: Math.min(1, Math.abs(correlation)) * (1 - pValue),
        }),
      );
    }

    const isWeekend = data.map((entry) => entry.isWeekend);
    if (isWeekend.length >= MIN_DAYS) {
      const correlation = pearsonCorrelation(isWeekend, steps);
      const pValue = pValueFromCorrelation(correlation, isWeekend.length);
      const weekendSteps = steps.filter((_, index) => isWeekend[index] === 1);
      const weekdaySteps = steps.filter((_, index) => isWeekend[index] === 0);
      const weekendWellness = data
        .filter((entry) => entry.isWeekend === 1)
        .map((entry) => entry.wellnessScore);
      const weekdayWellness = data
        .filter((entry) => entry.isWeekend === 0)
        .map((entry) => entry.wellnessScore);
      const stepsDelta =
        ((mean(weekendSteps) - mean(weekdaySteps)) / mean(weekdaySteps)) * 100;
      const wellnessDelta = mean(weekendWellness) - mean(weekdayWellness);

      insights.push(
        buildInsight({
          metric1: "isWeekend",
          metric2: "steps",
          correlation,
          pValue,
          sampleCount: isWeekend.length,
          insight: `Weekends show ${formatPercentage(stepsDelta)} fewer steps but wellness scores are ${formatDelta(
            wellnessDelta,
          )} points ${wellnessDelta >= 0 ? "higher" : "lower"} on average.`,
          confidence: Math.min(1, Math.abs(correlation)) * (1 - pValue),
        }),
      );
    }

    return insights
      .filter(
        (insight) =>
          Math.abs(insight.correlation) >= CORRELATION_THRESHOLD &&
          insight.pValue < SIGNIFICANCE_THRESHOLD &&
          insight.sampleCount >= MIN_DAYS,
      )
      .sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));
  };

  const renderInsights = (insights, metadata) => {
    const list = document.querySelector("#correlation-insights");
    const refreshedAt = document.querySelector("#correlation-refreshed");
    const emptyState = document.querySelector("#correlation-empty");

    if (!list || !refreshedAt || !emptyState) {
      return;
    }

    list.innerHTML = "";

    if (!insights.length) {
      emptyState.hidden = false;
      refreshedAt.textContent = formatDate(metadata.lastRefresh);
      return;
    }

    emptyState.hidden = true;

    insights.forEach((insight) => {
      const item = document.createElement("li");
      item.classList.add("correlation-item");

      const title = document.createElement("h3");
      title.textContent = `${metricLabels[insight.metric1]} vs. ${
        metricLabels[insight.metric2]
      }`;

      const summary = document.createElement("p");
      summary.textContent = insight.insight;

      const stats = document.createElement("p");
      stats.classList.add("correlation-stats");
      stats.textContent = `r = ${insight.correlation.toFixed(
        2,
      )} · p = ${insight.pValue.toFixed(3)} · confidence ${Math.round(
        insight.confidence * 100,
      )}%`;

      item.appendChild(title);
      item.appendChild(summary);
      item.appendChild(stats);
      list.appendChild(item);
    });

    refreshedAt.textContent = formatDate(metadata.lastRefresh);
  };

  const refreshInsights = () => {
    const lastRefresh = new Date();
    const data = generateSampleData(30);
    const insights = computeInsights(data);
    renderInsights(insights, { lastRefresh, dataRange: data.length });
  };

  const shouldRefresh = () => {
    const key = "correlationLastRefresh";
    const stored = localStorage.getItem(key);
    const today = new Date().toDateString();
    if (stored !== today) {
      localStorage.setItem(key, today);
      return true;
    }
    return false;
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (shouldRefresh()) {
      refreshInsights();
      return;
    }

    refreshInsights();
  });
})();
