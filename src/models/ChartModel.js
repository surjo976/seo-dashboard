export default class ChartModel {
  constructor() {
    this.seoSummaryLines = [
      { // Technical SEO (Green)
        color: "#30b8a4",
        points: [[-263, 295.9], [-113, 295.9], [59, 325], [183, 284], [433, 330], [653, 107], [808, 255], [1005, 295.9], [1156, 295.9]]
      },
      { // SEO Health (Blue)
        color: "#3594ee",
        points: [[-263, 242], [-113, 242], [6, 229], [195, 329], [367, 187], [536, 315], [721, 48], [902, 248], [1005, 242], [1156, 242]]
      },
      { // AI Visibility (Purple)
        color: "#6645c7",
        points: [[-260, 265], [-110, 265], [12, 331], [168, 329], [342, 270], [472, 183], [640, 291], [839, 332], [1008, 265], [1159, 265]]
      },
      { // Content Quality (Orange)
        color: "#ff9f4e",
        points: [[-260, 265], [-110, 265], [55, 273], [274, 223], [506, 117], [687, 240], [843, 270], [1159, 265]]
      }
    ];

    this.pagesCrawledConfig = {
      size: 160,
      radius: 56,
      lineWidth: 40,
      segments: [
        { startDeg: 295, endDeg: 172, color: "#3594ee" }, // Blue
        { startDeg: 188, endDeg: 278, color: "#e0e0e0" }  // Gray
      ]
    };

    this.issuesOverviewConfig = {
      size: 200,
      radius: 75,
      lineWidth: 22,
      shiftDist: 6,
      segments: [
        { start: -88, end: -2, color: "#3594ee", explode: true },   // Blue (exploded)
        { start: 2, end: 118, color: "#2bb755", explode: false },   // Green
        { start: 122, end: 208, color: "#ff9f4e", explode: false }, // Orange
        { start: 212, end: 253, color: "#a37a4c", explode: false }, // Brown
        { start: 257, end: 268, color: "#ff4b55", explode: false }  // Red
      ]
    };
  }
}
