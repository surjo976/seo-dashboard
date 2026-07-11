export default class ChartModel {
  constructor() {
    this.seoSummaryLines = [
      {
        name: "Technical SEO",
        color: "#4FCE62", // Green
        points: [
          { x: -100, y: 320, value: 55 },
          { x: 59, y: 325, value: 62 },
          { x: 183, y: 284, value: 70 },
          { x: 433, y: 330, value: 65 },
          { x: 653, y: 107, value: 91 },
          { x: 808, y: 255, value: 76 },
          { x: 950, y: 310, value: 68 }
        ]
      },
      {
        name: "SEO Health Score",
        color: "#3594ee", // Blue
        points: [
          { x: -50, y: 242, value: 68 },
          { x: 6, y: 229, value: 72 },
          { x: 195, y: 329, value: 60 },
          { x: 367, y: 187, value: 82 },
          { x: 536, y: 315, value: 64 },
          { x: 721, y: 48, value: 96 },
          { x: 902, y: 248, value: 78 }
        ]
      },
      {
        name: "AI Visibility Score",
        color: "#6645c7", // Purple
        points: [
          { x: -50, y: 310, value: 45 },
          { x: 12, y: 331, value: 48 },
          { x: 168, y: 329, value: 50 },
          { x: 342, y: 270, value: 58 },
          { x: 472, y: 183, value: 68 },
          { x: 640, y: 291, value: 52 },
          { x: 839, y: 332, value: 46 }
        ]
      },
      {
        name: "Content Quality",
        color: "#C27733", // Brown/Orange
        points: [
          { x: -50, y: 280, value: 50 },
          { x: 55, y: 273, value: 56 },
          { x: 274, y: 223, value: 64 },
          { x: 506, y: 117, value: 71 },
          { x: 687, y: 240, value: 60 },
          { x: 843, y: 270, value: 55 }
        ]
      }
    ];

    this.pagesCrawledConfig = {
      size: 290,
      segments: [
        { startDeg: 0, endDeg: 360, color: "#3594ee", radius: 108, lineWidth: 62, type: "progress", progressDeg: 299 },
        { startDeg: 0, endDeg: 360, color: "#e0e0e0", radius: 100, lineWidth: 44, type: "background" }
      ]
    };

    this.issuesOverviewConfig = {
      size: 250,
      radius: 88,
      lineWidth: 32,
      shiftDist: 9,
      segments: [
        { start: -90, end:   0, color: "#3594ee", explode: true  }, // Blue   90°
        { start:   0, end: 121, color: "#4fce62", explode: false }, // Green 121°
        { start: 121, end: 211, color: "#ff9f4e", explode: false }, // Orange 90°
        { start: 211, end: 255, color: "#a37a4c", explode: false }, // Brown  44°
        { start: 255, end: 270, color: "#ff6370", explode: false }  // Red    15°
      ]
    };
  }
}
