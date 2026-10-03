/**
 * SmartWaste AI - Municipal Waste Collection Optimization Platform
 * Complete Prototype Implementation
 * AI DEMO — SIMULATED DATA
 */

// Global State Store
const SmartWasteStore = {
  activeView: 'dashboard',
  searchQuery: '',
  priorityFilter: 'ALL',
  fleetFilter: 'ALL',
  opsFilter: 'ALL',
  selectedPoint: null,
  selectedVehicle: null,
  showRoutesOnMap: true,
  showPointsOnMap: true,
  showVehiclesOnMap: true,
  showZonesOnMap: true,
  aiPipelineRan: false,

  // 20 Fictional Municipal Collection Points
  collectionPoints: [
    {
      id: "CP-101",
      area: "Metro City Center - Central",
      zone: "Central Zone",
      x: 390,
      y: 240,
      currentWasteLevel: 88,
      historicalLevels: [52, 60, 71, 79, 88],
      accumulationRate: 12,
      lastCollectionHours: 32,
      lastCollection: "32h ago",
      priority: "CRITICAL",
      priorityReason: "High current waste (88%) + rapid accumulation (+12%/day) + over 24h since collection.",
      predictedLevel: 96,
      predictedLevel2d: 100,
      recommendedTime: "08:15 AM",
      assignedVehicle: "TRK-01",
      assignedRoute: "R-01",
      status: "In Progress",
      recommendation: "Critical overflow risk within 12 hours. Immediate collection assigned."
    },
    {
      id: "CP-102",
      area: "North Bay Plaza - Commercial",
      zone: "North Zone",
      x: 320,
      y: 110,
      currentWasteLevel: 64,
      historicalLevels: [35, 42, 50, 58, 64],
      accumulationRate: 8,
      lastCollectionHours: 24,
      lastCollection: "24h ago",
      priority: "HIGH",
      priorityReason: "Steady commercial accumulation (+8%/day) approaching 75% threshold.",
      predictedLevel: 72,
      predictedLevel2d: 80,
      recommendedTime: "10:30 AM",
      assignedVehicle: "TRK-03",
      assignedRoute: "R-02",
      status: "Scheduled",
      recommendation: "Include in morning collection cycle before peak afternoon commerce."
    },
    {
      id: "CP-103",
      area: "Grand Market Square - Central",
      zone: "Central Zone",
      x: 430,
      y: 280,
      currentWasteLevel: 94,
      historicalLevels: [48, 61, 74, 85, 94],
      accumulationRate: 14,
      lastCollectionHours: 38,
      lastCollection: "38h ago",
      priority: "CRITICAL",
      priorityReason: "Severe accumulation (+14%/day) at food market with 94% volume.",
      predictedLevel: 99,
      predictedLevel2d: 100,
      recommendedTime: "08:45 AM",
      assignedVehicle: "TRK-01",
      assignedRoute: "R-01",
      status: "In Progress",
      recommendation: "Immediate priority stop. Heavy organic waste hazard."
    },
    {
      id: "CP-104",
      area: "Pinecrest Residential - Sector 4",
      zone: "West Zone",
      x: 180,
      y: 260,
      currentWasteLevel: 78,
      historicalLevels: [40, 51, 62, 70, 78],
      accumulationRate: 9,
      lastCollectionHours: 30,
      lastCollection: "30h ago",
      priority: "HIGH",
      priorityReason: "High current waste + rapid accumulation + long time since collection.",
      predictedLevel: 87,
      predictedLevel2d: 96,
      recommendedTime: "09:30 AM",
      assignedVehicle: "TRK-04",
      assignedRoute: "R-03",
      status: "Scheduled",
      recommendation: "Include in next collection cycle due to high predicted fill level."
    },
    {
      id: "CP-105",
      area: "Harbor Seafood Terminal - Port",
      zone: "Harbor District",
      x: 610,
      y: 360,
      currentWasteLevel: 91,
      historicalLevels: [42, 55, 68, 80, 91],
      accumulationRate: 13,
      lastCollectionHours: 34,
      lastCollection: "34h ago",
      priority: "CRITICAL",
      priorityReason: "Dense wet waste nearing capacity (+13%/day); high odor penalty.",
      predictedLevel: 98,
      predictedLevel2d: 100,
      recommendedTime: "09:00 AM",
      assignedVehicle: "TRK-06",
      assignedRoute: "R-04",
      status: "In Progress",
      recommendation: "Dispatch dedicated compactor unit. High odor mitigation protocol."
    },
    {
      id: "CP-106",
      area: "Oakridge High School - Campus",
      zone: "West Zone",
      x: 140,
      y: 330,
      currentWasteLevel: 45,
      historicalLevels: [22, 28, 34, 40, 45],
      accumulationRate: 6,
      lastCollectionHours: 18,
      lastCollection: "18h ago",
      priority: "MEDIUM",
      priorityReason: "Moderate institutional generation; safe buffer remaining (55%).",
      predictedLevel: 51,
      predictedLevel2d: 57,
      recommendedTime: "02:15 PM",
      assignedVehicle: "TRK-04",
      assignedRoute: "R-03",
      status: "Scheduled",
      recommendation: "Collect during secondary afternoon sweep after residential clusters."
    },
    {
      id: "CP-107",
      area: "Tech Park Phase 1 - East Park",
      zone: "East Industrial",
      x: 650,
      y: 190,
      currentWasteLevel: 58,
      historicalLevels: [30, 38, 44, 52, 58],
      accumulationRate: 7,
      lastCollectionHours: 22,
      lastCollection: "22h ago",
      priority: "MEDIUM",
      priorityReason: "Recyclable packaging volume steady; collection optimal in 24h.",
      predictedLevel: 65,
      predictedLevel2d: 72,
      recommendedTime: "01:45 PM",
      assignedVehicle: "TRK-05",
      assignedRoute: "R-05",
      status: "Scheduled",
      recommendation: "Standard industrial dry-waste pickup schedule."
    },
    {
      id: "CP-108",
      area: "Waterfront Boardwalk - Promenade",
      zone: "Harbor District",
      x: 570,
      y: 410,
      currentWasteLevel: 82,
      historicalLevels: [38, 49, 60, 71, 82],
      accumulationRate: 11,
      lastCollectionHours: 26,
      lastCollection: "26h ago",
      priority: "HIGH",
      priorityReason: "High tourist pedestrian flow; will breach 90% by tomorrow morning.",
      predictedLevel: 93,
      predictedLevel2d: 100,
      recommendedTime: "10:15 AM",
      assignedVehicle: "TRK-06",
      assignedRoute: "R-04",
      status: "Scheduled",
      recommendation: "Fast-track on Harbor Route before peak tourist hours."
    },
    {
      id: "CP-109",
      area: "South Railway Hub - Transit",
      zone: "Central Zone",
      x: 410,
      y: 370,
      currentWasteLevel: 86,
      historicalLevels: [46, 56, 67, 76, 86],
      accumulationRate: 10,
      lastCollectionHours: 29,
      lastCollection: "29h ago",
      priority: "CRITICAL",
      priorityReason: "High public density; bins at 86% capacity with steady +10%/day flow.",
      predictedLevel: 96,
      predictedLevel2d: 100,
      recommendedTime: "08:30 AM",
      assignedVehicle: "TRK-01",
      assignedRoute: "R-01",
      status: "In Progress",
      recommendation: "Include in immediate central sweep."
    },
    {
      id: "CP-110",
      area: "Eastgate Logistics Hub - Depot",
      zone: "East Industrial",
      x: 710,
      y: 250,
      currentWasteLevel: 76,
      historicalLevels: [44, 52, 60, 68, 76],
      accumulationRate: 8,
      lastCollectionHours: 35,
      lastCollection: "35h ago",
      priority: "HIGH",
      priorityReason: "Heavy corrugated packaging bins at 76%; exceeds 3-day service limit.",
      predictedLevel: 84,
      predictedLevel2d: 92,
      recommendedTime: "11:00 AM",
      assignedVehicle: "TRK-05",
      assignedRoute: "R-05",
      status: "Scheduled",
      recommendation: "Assign large-capacity roll-off truck."
    },
    {
      id: "CP-111",
      area: "Sunset Boulevard Mall - Retail",
      zone: "West Zone",
      x: 230,
      y: 310,
      currentWasteLevel: 52,
      historicalLevels: [25, 33, 40, 46, 52],
      accumulationRate: 7,
      lastCollectionHours: 19,
      lastCollection: "19h ago",
      priority: "MEDIUM",
      priorityReason: "Normal retail foot traffic; capacity safe until tomorrow afternoon.",
      predictedLevel: 59,
      predictedLevel2d: 66,
      recommendedTime: "03:00 PM",
      assignedVehicle: "TRK-04",
      assignedRoute: "R-03",
      status: "Scheduled",
      recommendation: "Standard collection window. No urgent intervention required."
    },
    {
      id: "CP-112",
      area: "Riverside Promenade - Central",
      zone: "Central Zone",
      x: 350,
      y: 290,
      currentWasteLevel: 89,
      historicalLevels: [47, 58, 69, 79, 89],
      accumulationRate: 11,
      lastCollectionHours: 31,
      lastCollection: "31h ago",
      priority: "CRITICAL",
      priorityReason: "High public recreation area at 89% fill with weekend peak rate.",
      predictedLevel: 97,
      predictedLevel2d: 100,
      recommendedTime: "09:15 AM",
      assignedVehicle: "TRK-02",
      assignedRoute: "R-01",
      status: "In Progress",
      recommendation: "High priority collection before noon crowds gather."
    },
    {
      id: "CP-113",
      area: "Cedar Community Park - Green Space",
      zone: "North Zone",
      x: 270,
      y: 170,
      currentWasteLevel: 25,
      historicalLevels: [10, 14, 18, 21, 25],
      accumulationRate: 4,
      lastCollectionHours: 12,
      lastCollection: "12h ago",
      priority: "LOW",
      priorityReason: "Low accumulation rate (+4%/day) with 75% spare volume.",
      predictedLevel: 29,
      predictedLevel2d: 33,
      recommendedTime: "Tomorrow",
      assignedVehicle: "Unassigned",
      assignedRoute: "Pending",
      status: "Pending",
      recommendation: "Defer collection to next cycle; save trip fuel."
    },
    {
      id: "CP-114",
      area: "University Campus North - Quad",
      zone: "North Zone",
      x: 380,
      y: 140,
      currentWasteLevel: 67,
      historicalLevels: [31, 40, 50, 59, 67],
      accumulationRate: 9,
      lastCollectionHours: 23,
      lastCollection: "23h ago",
      priority: "HIGH",
      priorityReason: "High student dining generation; projected to exceed 75% overnight.",
      predictedLevel: 76,
      predictedLevel2d: 85,
      recommendedTime: "11:30 AM",
      assignedVehicle: "TRK-03",
      assignedRoute: "R-02",
      status: "Scheduled",
      recommendation: "Schedule between class break hours for optimal access."
    },
    {
      id: "CP-115",
      area: "Industrial Complex B - Chemical Park",
      zone: "East Industrial",
      x: 680,
      y: 120,
      currentWasteLevel: 83,
      historicalLevels: [45, 55, 65, 74, 83],
      accumulationRate: 10,
      lastCollectionHours: 33,
      lastCollection: "33h ago",
      priority: "HIGH",
      priorityReason: "High non-hazardous municipal industrial waste accumulating steadily.",
      predictedLevel: 93,
      predictedLevel2d: 100,
      recommendedTime: "10:45 AM",
      assignedVehicle: "TRK-05",
      assignedRoute: "R-05",
      status: "Scheduled",
      recommendation: "Include in morning industrial route run."
    },
    {
      id: "CP-116",
      area: "Greenfields Residential - East Sector",
      zone: "North Zone",
      x: 450,
      y: 90,
      currentWasteLevel: 34,
      historicalLevels: [18, 22, 26, 30, 34],
      accumulationRate: 4,
      lastCollectionHours: 15,
      lastCollection: "15h ago",
      priority: "LOW",
      priorityReason: "Quiet residential sector with minimal generation rate.",
      predictedLevel: 38,
      predictedLevel2d: 42,
      recommendedTime: "Tomorrow",
      assignedVehicle: "Unassigned",
      assignedRoute: "Pending",
      status: "Pending",
      recommendation: "Hold for scheduled weekly neighborhood cycle."
    },
    {
      id: "CP-117",
      area: "Fisherman's Wharf - West Dock",
      zone: "Harbor District",
      x: 640,
      y: 430,
      currentWasteLevel: 72,
      historicalLevels: [35, 45, 54, 63, 72],
      accumulationRate: 9,
      lastCollectionHours: 27,
      lastCollection: "27h ago",
      priority: "HIGH",
      priorityReason: "Commercial dock packaging; predicted to hit 81% tomorrow.",
      predictedLevel: 81,
      predictedLevel2d: 90,
      recommendedTime: "11:45 AM",
      assignedVehicle: "TRK-06",
      assignedRoute: "R-04",
      status: "Scheduled",
      recommendation: "Route along coastal sweep with CP-105 & CP-108."
    },
    {
      id: "CP-118",
      area: "Hilltop View Point - Scenic Overlook",
      zone: "West Zone",
      x: 120,
      y: 190,
      currentWasteLevel: 29,
      historicalLevels: [14, 18, 22, 25, 29],
      accumulationRate: 4,
      lastCollectionHours: 16,
      lastCollection: "16h ago",
      priority: "LOW",
      priorityReason: "Spacious scenic bins; ample volume left for 3+ days.",
      predictedLevel: 33,
      predictedLevel2d: 37,
      recommendedTime: "Tomorrow",
      assignedVehicle: "Unassigned",
      assignedRoute: "Pending",
      status: "Pending",
      recommendation: "No trip needed today. Trip savings achieved."
    },
    {
      id: "CP-119",
      area: "Civic Administrative Plaza - Hall",
      zone: "Central Zone",
      x: 480,
      y: 210,
      currentWasteLevel: 61,
      historicalLevels: [28, 36, 45, 53, 61],
      accumulationRate: 8,
      lastCollectionHours: 21,
      lastCollection: "21h ago",
      priority: "MEDIUM",
      priorityReason: "Government office paper & cafeteria waste; stable pattern.",
      predictedLevel: 69,
      predictedLevel2d: 77,
      recommendedTime: "01:15 PM",
      assignedVehicle: "TRK-02",
      assignedRoute: "R-01",
      status: "Scheduled",
      recommendation: "Mid-day collection slot coordinated with truck return."
    },
    {
      id: "CP-120",
      area: "Manufacturing Sector 4 - Heavy Hub",
      zone: "East Industrial",
      x: 740,
      y: 310,
      currentWasteLevel: 95,
      historicalLevels: [50, 62, 73, 84, 95],
      accumulationRate: 15,
      lastCollectionHours: 37,
      lastCollection: "37h ago",
      priority: "CRITICAL",
      priorityReason: "Maximum capacity (95%) with severe +15%/day industrial accumulation.",
      predictedLevel: 100,
      predictedLevel2d: 100,
      recommendedTime: "08:00 AM",
      assignedVehicle: "TRK-05",
      assignedRoute: "R-05",
      status: "In Progress",
      recommendation: "First stop dispatch. Risk of overflow onto public loading bay."
    }
  ],

  // 10 Fictional Municipal Vehicles
  vehicles: [
    {
      id: "TRK-01",
      type: "Heavy Compactor (15t)",
      capacity: 15,
      currentLoad: 12.3,
      status: "ACTIVE",
      location: "Central Zone",
      assignedRoute: "R-01",
      eta: "10:15 AM",
      x: 410,
      y: 260,
      driver: "Marcus Vance",
      completedStops: 2,
      totalStops: 4,
      efficiencyScore: 92
    },
    {
      id: "TRK-02",
      type: "Medium Compactor (10t)",
      capacity: 10,
      currentLoad: 8.2,
      status: "ACTIVE",
      location: "Central Zone",
      assignedRoute: "R-01",
      eta: "11:45 AM",
      x: 370,
      y: 280,
      driver: "Elena Rostova",
      completedStops: 3,
      totalStops: 4,
      efficiencyScore: 89
    },
    {
      id: "TRK-03",
      type: "Heavy Compactor (15t)",
      capacity: 15,
      currentLoad: 0.0,
      status: "AVAILABLE",
      location: "North Depot",
      assignedRoute: "R-02",
      eta: "Standby",
      x: 350,
      y: 80,
      driver: "David Chen",
      completedStops: 0,
      totalStops: 3,
      efficiencyScore: 94
    },
    {
      id: "TRK-04",
      type: "Electric Light Collector (5t)",
      capacity: 5,
      currentLoad: 3.8,
      status: "ACTIVE",
      location: "West Zone",
      assignedRoute: "R-03",
      eta: "01:20 PM",
      x: 190,
      y: 280,
      driver: "Amina Al-Mansoor",
      completedStops: 2,
      totalStops: 4,
      efficiencyScore: 96
    },
    {
      id: "TRK-05",
      type: "Roll-off Multi-lift (12t)",
      capacity: 12,
      currentLoad: 9.4,
      status: "ACTIVE",
      location: "East Industrial",
      assignedRoute: "R-05",
      eta: "12:30 PM",
      x: 700,
      y: 230,
      driver: "Carlos Mendez",
      completedStops: 1,
      totalStops: 3,
      efficiencyScore: 88
    },
    {
      id: "TRK-06",
      type: "Medium Compactor (10t)",
      capacity: 10,
      currentLoad: 7.9,
      status: "ACTIVE",
      location: "Harbor District",
      assignedRoute: "R-04",
      eta: "02:00 PM",
      x: 620,
      y: 390,
      driver: "Siddharth Rao",
      completedStops: 2,
      totalStops: 3,
      efficiencyScore: 91
    },
    {
      id: "TRK-07",
      type: "Heavy Compactor (15t)",
      capacity: 15,
      currentLoad: 14.8,
      status: "RETURNING",
      location: "Central Transfer Station",
      assignedRoute: "R-01",
      eta: "09:50 AM",
      x: 480,
      y: 310,
      driver: "Tomasz Nowak",
      completedStops: 5,
      totalStops: 5,
      efficiencyScore: 95
    },
    {
      id: "TRK-08",
      type: "Electric Light Collector (5t)",
      capacity: 5,
      currentLoad: 0.0,
      status: "AVAILABLE",
      location: "North Depot",
      assignedRoute: "Unassigned",
      eta: "Standby",
      x: 370,
      y: 70,
      driver: "Chloe Bennett",
      completedStops: 0,
      totalStops: 0,
      efficiencyScore: 97
    },
    {
      id: "TRK-09",
      type: "Roll-off Multi-lift (12t)",
      capacity: 12,
      currentLoad: 0.0,
      status: "MAINTENANCE",
      location: "Municipal Garage West",
      assignedRoute: "None",
      eta: "Off Service",
      x: 110,
      y: 390,
      driver: "Fleet Mechanics Team",
      completedStops: 0,
      totalStops: 0,
      efficiencyScore: 0
    },
    {
      id: "TRK-10",
      type: "Medium Compactor (10t)",
      capacity: 10,
      currentLoad: 0.0,
      status: "AVAILABLE",
      location: "West Sub-Station",
      assignedRoute: "Standby",
      eta: "Ready",
      x: 150,
      y: 220,
      driver: "Lars Lindqvist",
      completedStops: 0,
      totalStops: 0,
      efficiencyScore: 93
    }
  ],

  // Optimized Routes
  routes: [
    {
      id: "R-01",
      vehicleId: "TRK-01",
      name: "Central Metro Dense Core Loop",
      stops: ["CP-101", "CP-103", "CP-109", "CP-112"],
      distance: 18.4,
      estimatedTime: 42,
      utilization: 86,
      status: "In Progress",
      color: "#dc2626"
    },
    {
      id: "R-02",
      vehicleId: "TRK-03",
      name: "North Corridor & Campus Sweep",
      stops: ["CP-102", "CP-114", "CP-116"],
      distance: 22.1,
      estimatedTime: 50,
      utilization: 78,
      status: "Ready",
      color: "#ea580c"
    },
    {
      id: "R-03",
      vehicleId: "TRK-04",
      name: "West Residential & High School Run",
      stops: ["CP-104", "CP-106", "CP-111", "CP-118"],
      distance: 21.6,
      estimatedTime: 48,
      utilization: 82,
      status: "In Progress",
      color: "#059669"
    },
    {
      id: "R-04",
      vehicleId: "TRK-06",
      name: "Harbor & Seafood Waterfront Loop",
      stops: ["CP-105", "CP-108", "CP-117"],
      distance: 16.2,
      estimatedTime: 38,
      utilization: 91,
      status: "In Progress",
      color: "#0284c7"
    },
    {
      id: "R-05",
      vehicleId: "TRK-05",
      name: "East Industrial & Heavy Logistics Run",
      stops: ["CP-120", "CP-115", "CP-110", "CP-107"],
      distance: 23.8,
      estimatedTime: 56,
      utilization: 89,
      status: "In Progress",
      color: "#7c3aed"
    }
  ],

  // Route Comparison Benchmark (Simulated Demo Values)
  benchmarks: {
    traditionalDistance: 128,
    optimizedDistance: 94,
    traditionalTimeHours: 4.8,
    optimizedTimeHours: 3.2,
    traditionalFuelLiters: 42,
    optimizedFuelLiters: 31,
    savedDistance: 34,
    savedPercentage: 26.5,
    co2SavedKg: 88.4
  }
};

// UI Toast Notification Utility
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = '⚡';
  if (type === 'ai') icon = '🤖';
  if (type === 'route') icon = '🗺️';
  if (type === 'schedule') icon = '📅';

  toast.innerHTML = `
    <span style="font-size: 1.1rem;">${icon}</span>
    <div style="flex: 1;">
      <div style="font-weight: 600; font-size: 0.82rem;">${message}</div>
    </div>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// -------------------------------------------------------------
// AI WORKFLOW ENGINES (Local Simulation)
// -------------------------------------------------------------

// 1. Waste Prediction Engine
function runWastePredictionEngine() {
  SmartWasteStore.collectionPoints.forEach(cp => {
    // Prediction formula: current + accumulation rate adjusted with realistic micro-variance
    const variance = (Math.random() * 2 - 1); // -1% to +1%
    const nextDay = Math.min(100, Math.round(cp.currentWasteLevel + cp.accumulationRate + variance));
    const twoDay = Math.min(100, Math.round(nextDay + cp.accumulationRate + variance * 0.8));

    cp.predictedLevel = nextDay;
    cp.predictedLevel2d = twoDay;

    // Recalculate priority dynamically based on new prediction
    const priorityResult = evaluatePriorityScore(cp);
    cp.priority = priorityResult.level;
    cp.priorityReason = priorityResult.reason;
    cp.recommendation = priorityResult.recommendation;
  });

  SmartWasteStore.aiPipelineRan = true;
  showToast("Waste Prediction Engine: Updated 24h & 48h forecasts for all 20 collection points!", "ai");
  renderCurrentView();
}

// 2. Priority Calculation Engine
function evaluatePriorityScore(cp) {
  // Factors: Current Waste, Predicted Level, Hours since collection, Accumulation rate
  const currentFactor = cp.currentWasteLevel * 0.40;
  const predFactor = cp.predictedLevel * 0.35;
  const timeFactor = Math.min(40, cp.lastCollectionHours) * 0.15;
  const rateFactor = cp.accumulationRate * 1.5;

  const totalScore = currentFactor + predFactor + timeFactor + rateFactor;

  if (totalScore >= 80 || cp.currentWasteLevel >= 85 || cp.predictedLevel >= 95) {
    return {
      level: "CRITICAL",
      reason: `High current waste (${cp.currentWasteLevel}%) + rapid accumulation (+${cp.accumulationRate}%/day) + long time since collection.`,
      recommendation: "Critical overflow imminent. Dispatch dedicated collector within next cycle."
    };
  } else if (totalScore >= 60 || cp.currentWasteLevel >= 65 || cp.predictedLevel >= 75) {
    return {
      level: "HIGH",
      reason: `Accumulation rate (+${cp.accumulationRate}%/day) pushing level above 70% threshold.`,
      recommendation: "Include in next scheduled collection wave to prevent overload."
    };
  } else if (totalScore >= 40 || cp.currentWasteLevel >= 40) {
    return {
      level: "MEDIUM",
      reason: `Moderate fill level (${cp.currentWasteLevel}%) with steady baseline generation.`,
      recommendation: "Schedule during secondary afternoon collection window."
    };
  } else {
    return {
      level: "LOW",
      reason: `Sufficient remaining capacity (${100 - cp.currentWasteLevel}%) and slow accumulation rate.`,
      recommendation: "Defer collection; unnecessary trip eliminated to conserve municipal fuel."
    };
  }
}

// 3. Vehicle Assignment Engine
function runVehicleAssignmentEngine() {
  // Logic: Match available vehicles to high/critical priority zones by capacity
  const availableVehicles = SmartWasteStore.vehicles.filter(v => v.status === "AVAILABLE" || v.status === "ACTIVE");
  
  SmartWasteStore.collectionPoints.forEach(cp => {
    if (cp.priority === "CRITICAL" || cp.priority === "HIGH") {
      if (cp.assignedVehicle === "Unassigned" || !cp.assignedVehicle) {
        // Pick best vehicle for zone
        const bestVehicle = availableVehicles.find(v => v.location.includes(cp.zone.split(' ')[0])) || availableVehicles[0];
        if (bestVehicle) {
          cp.assignedVehicle = bestVehicle.id;
          cp.status = "Scheduled";
        }
      }
    }
  });

  // Ensure TRK-03 and TRK-10 are optimized
  const trk03 = SmartWasteStore.vehicles.find(v => v.id === "TRK-03");
  if (trk03 && trk03.status === "AVAILABLE") {
    trk03.status = "ACTIVE";
    trk03.assignedRoute = "R-02";
    trk03.eta = "11:15 AM";
    trk03.currentLoad = 4.5;
  }

  showToast("Fleet Assignment: Optimized vehicle capacity allocations based on priority demand!", "route");
  renderCurrentView();
}

// 4. Route Optimization Engine
function runRouteOptimizationEngine() {
  // Run simulated cluster TSP optimization
  SmartWasteStore.routes.forEach(route => {
    // Simulate slight optimized route fine-tuning
    route.utilization = Math.min(96, Math.max(76, Math.round(route.utilization + (Math.random() * 4 - 2))));
  });

  // Calculate simulated savings
  SmartWasteStore.benchmarks.optimizedDistance = 94;
  SmartWasteStore.benchmarks.savedDistance = SmartWasteStore.benchmarks.traditionalDistance - SmartWasteStore.benchmarks.optimizedDistance;
  SmartWasteStore.benchmarks.savedPercentage = Number(((SmartWasteStore.benchmarks.savedDistance / SmartWasteStore.benchmarks.traditionalDistance) * 100).toFixed(1));
  SmartWasteStore.showRoutesOnMap = true;

  showToast("AI Route Optimization: Traditional (128 km) → Optimized (94 km). Saved 34 km!", "route");
  renderCurrentView();
}

// 5. Smart Scheduling Engine
function runSmartSchedulingEngine() {
  const timeslots = {
    CRITICAL: ["08:00 AM", "08:15 AM", "08:30 AM", "08:45 AM", "09:00 AM", "09:15 AM"],
    HIGH: ["09:30 AM", "10:00 AM", "10:15 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    MEDIUM: ["01:15 PM", "01:45 PM", "02:15 PM", "02:45 PM", "03:15 PM"],
    LOW: ["Deferred", "Tomorrow", "Tomorrow"]
  };

  SmartWasteStore.collectionPoints.forEach((cp, idx) => {
    const list = timeslots[cp.priority] || timeslots.MEDIUM;
    cp.recommendedTime = list[idx % list.length];
    if (cp.priority === "LOW") {
      cp.status = "Pending";
    } else if (cp.status === "Pending") {
      cp.status = "Scheduled";
    }
  });

  showToast("Smart Scheduling Engine: Generated demand-responsive collection time windows!", "schedule");
  renderCurrentView();
}

// Run Full Pipeline
function runFullAIPipeline() {
  runWastePredictionEngine();
  runVehicleAssignmentEngine();
  runRouteOptimizationEngine();
  runSmartSchedulingEngine();
  showToast("Complete Municipal Workflow Executed: Predict → Prioritize → Assign → Optimize → Schedule", "ai");
}

// Operational Simulation Step
function advanceOperationStep() {
  // Advance an active truck
  const activeTruck = SmartWasteStore.vehicles.find(v => v.status === "ACTIVE" && v.completedStops < v.totalStops);
  if (activeTruck) {
    activeTruck.completedStops += 1;
    activeTruck.currentLoad = Math.min(activeTruck.capacity, Number((activeTruck.currentLoad + 2.1).toFixed(1)));
    
    // Find matching route stop and mark collected
    const route = SmartWasteStore.routes.find(r => r.id === activeTruck.assignedRoute);
    if (route && route.stops[activeTruck.completedStops - 1]) {
      const stopId = route.stops[activeTruck.completedStops - 1];
      const point = SmartWasteStore.collectionPoints.find(p => p.id === stopId);
      if (point) {
        point.currentWasteLevel = 8; // Emptied!
        point.lastCollectionHours = 0;
        point.lastCollection = "Just now";
        point.status = "Collected";
        const evalRes = evaluatePriorityScore(point);
        point.priority = evalRes.level;
        point.priorityReason = "Freshly collected; low current volume.";
      }
    }

    if (activeTruck.completedStops >= activeTruck.totalStops) {
      activeTruck.status = "RETURNING";
      activeTruck.eta = "Depot Return (15 min)";
    }

    showToast(`Live Ops: ${activeTruck.id} completed stop ${activeTruck.completedStops}/${activeTruck.totalStops}. Bins emptied!`, "success");
    renderCurrentView();
  } else {
    showToast("Live Ops: All active shifts completed! Click Reset or Predict to refresh.", "success");
  }
}

function resetOperationSimulation() {
  SmartWasteStore.vehicles.forEach(v => {
    if (v.id === "TRK-01" || v.id === "TRK-02" || v.id === "TRK-04" || v.id === "TRK-06") {
      v.status = "ACTIVE";
      v.completedStops = 1;
    } else if (v.id === "TRK-09") {
      v.status = "MAINTENANCE";
      v.completedStops = 0;
    } else {
      v.status = "AVAILABLE";
      v.completedStops = 0;
      v.currentLoad = 0;
    }
  });
  showToast("Operational simulation counters reset.", "success");
  renderCurrentView();
}

// -------------------------------------------------------------
// VIEW RENDERERS
// -------------------------------------------------------------

function renderCurrentView() {
  const container = document.getElementById('main-content-view');
  if (!container) return;

  // Update active state in sidebar
  document.querySelectorAll('.nav-item').forEach(el => {
    if (el.getAttribute('data-view') === SmartWasteStore.activeView) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  switch (SmartWasteStore.activeView) {
    case 'dashboard':
      container.innerHTML = renderDashboardHTML();
      break;
    case 'points':
      container.innerHTML = renderCollectionPointsHTML();
      break;
    case 'map':
      container.innerHTML = renderLiveMapHTML();
      break;
    case 'predictions':
      container.innerHTML = renderAIPredictionsHTML();
      break;
    case 'fleet':
      container.innerHTML = renderFleetManagementHTML();
      break;
    case 'routes':
      container.innerHTML = renderRouteOptimizationHTML();
      break;
    case 'scheduling':
      container.innerHTML = renderSmartSchedulingHTML();
      break;
    case 'operations':
      container.innerHTML = renderLiveOperationsHTML();
      break;
    case 'analytics':
      container.innerHTML = renderAnalyticsHTML();
      break;
    default:
      container.innerHTML = renderDashboardHTML();
  }

  // Update Workflow banner active step
  updateWorkflowBannerState();
}

function updateWorkflowBannerState() {
  const steps = ['predict', 'prioritize', 'assign', 'optimize', 'schedule', 'monitor', 'analyze'];
  const viewMap = {
    'dashboard': 'predict',
    'predictions': 'predict',
    'points': 'prioritize',
    'fleet': 'assign',
    'routes': 'optimize',
    'scheduling': 'schedule',
    'operations': 'monitor',
    'map': 'monitor',
    'analytics': 'analyze'
  };

  const currentStep = viewMap[SmartWasteStore.activeView] || 'predict';
  steps.forEach(s => {
    const el = document.getElementById(`wf-${s}`);
    if (el) {
      if (s === currentStep) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    }
  });
}

// -------------------------------------------------------------
// 1. DASHBOARD VIEW
// -------------------------------------------------------------
function renderDashboardHTML() {
  const points = SmartWasteStore.collectionPoints;
  const criticalCount = points.filter(p => p.priority === "CRITICAL").length;
  const highCount = points.filter(p => p.priority === "HIGH").length;
  const mediumCount = points.filter(p => p.priority === "MEDIUM").length;
  const lowCount = points.filter(p => p.priority === "LOW").length;
  
  const vehicles = SmartWasteStore.vehicles;
  const availCount = vehicles.filter(v => v.status === "AVAILABLE").length;
  const activeCount = vehicles.filter(v => v.status === "ACTIVE").length;
  const returnCount = vehicles.filter(v => v.status === "RETURNING").length;
  const maintCount = vehicles.filter(v => v.status === "MAINTENANCE").length;

  const pendingCount = points.filter(p => p.status === "Pending" || p.status === "Scheduled").length;
  const completedCount = points.filter(p => p.status === "Collected").length;
  const inProgressCount = points.filter(p => p.status === "In Progress").length;

  return `
    <div class="page-container">
      <!-- Top Action Bar -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">Municipal Waste Operations Dashboard</h2>
          <p style="font-size: 0.85rem; color: #64748b;">Autonomous demand prediction, smart routing, and operational intelligence.</p>
        </div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="btn-primary" onclick="runWastePredictionEngine()">
            <span>🤖</span> PREDICT WASTE
          </button>
          <button class="btn-primary" onclick="runRouteOptimizationEngine()">
            <span>🗺️</span> OPTIMIZE ROUTES
          </button>
          <button class="btn-accent" onclick="runSmartSchedulingEngine()">
            <span>📅</span> GENERATE SCHEDULE
          </button>
        </div>
      </div>

      <!-- 8 Mandatory KPI Cards -->
      <div class="kpi-grid">
        <div class="kpi-card" onclick="navigateTo('points')" style="cursor: pointer;">
          <div class="kpi-header">
            <span class="kpi-title">Total Points</span>
            <div class="kpi-icon-wrap" style="background-color: #ecfdf5; color: #059669;">📍</div>
          </div>
          <div class="kpi-value">${points.length}</div>
          <div class="kpi-subtext">5 Municipal Sectors</div>
        </div>

        <div class="kpi-card" onclick="filterPointsBy('CRITICAL')" style="cursor: pointer; border-left: 4px solid #dc2626;">
          <div class="kpi-header">
            <span class="kpi-title">Critical Points</span>
            <div class="kpi-icon-wrap" style="background-color: #fee2e2; color: #dc2626;">⚠️</div>
          </div>
          <div class="kpi-value" style="color: #dc2626;">${criticalCount}</div>
          <div class="kpi-subtext" style="color: #dc2626; font-weight: 600;">Immediate action required</div>
        </div>

        <div class="kpi-card" onclick="filterPointsBy('HIGH')" style="cursor: pointer; border-left: 4px solid #ea580c;">
          <div class="kpi-header">
            <span class="kpi-title">High-Priority Points</span>
            <div class="kpi-icon-wrap" style="background-color: #ffedd5; color: #ea580c;">🔥</div>
          </div>
          <div class="kpi-value" style="color: #ea580c;">${highCount}</div>
          <div class="kpi-subtext">Approaching threshold</div>
        </div>

        <div class="kpi-card" onclick="navigateTo('fleet')" style="cursor: pointer;">
          <div class="kpi-header">
            <span class="kpi-title">Available Vehicles</span>
            <div class="kpi-icon-wrap" style="background-color: #dcfce7; color: #16a34a;">🚛</div>
          </div>
          <div class="kpi-value" style="color: #16a34a;">${availCount} <span style="font-size: 1rem; color: #64748b;">/ ${vehicles.length}</span></div>
          <div class="kpi-subtext">Ready for dispatch</div>
        </div>

        <div class="kpi-card" onclick="navigateTo('operations')" style="cursor: pointer;">
          <div class="kpi-header">
            <span class="kpi-title">Active Vehicles</span>
            <div class="kpi-icon-wrap" style="background-color: #e0f2fe; color: #0284c7;">⚡</div>
          </div>
          <div class="kpi-value" style="color: #0284c7;">${activeCount}</div>
          <div class="kpi-subtext">Currently on collection routes</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Pending Collections</span>
            <div class="kpi-icon-wrap" style="background-color: #fef3c7; color: #d97706;">⏳</div>
          </div>
          <div class="kpi-value">${pendingCount}</div>
          <div class="kpi-subtext">In queue or scheduled</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Completed Collections</span>
            <div class="kpi-icon-wrap" style="background-color: #dcfce7; color: #15803d;">✅</div>
          </div>
          <div class="kpi-value">${completedCount}</div>
          <div class="kpi-subtext">Emptied this shift</div>
        </div>

        <div class="kpi-card" onclick="navigateTo('routes')" style="cursor: pointer;">
          <div class="kpi-header">
            <span class="kpi-title">Optimized Routes</span>
            <div class="kpi-icon-wrap" style="background-color: #ede9fe; color: #7c3aed;">🗺️</div>
          </div>
          <div class="kpi-value" style="color: #7c3aed;">${SmartWasteStore.routes.length}</div>
          <div class="kpi-subtext">-26.5% Simulated Distance</div>
        </div>
      </div>

      <!-- Core Visual Charts Grid -->
      <div class="dashboard-grid-2col">
        <!-- 1. Waste Level Trend Chart (Historical Accumulation vs Predicted) -->
        <div class="card-panel">
          <div class="panel-header">
            <div>
              <div class="panel-title">
                <span>📈</span> Waste Level Trend & 48-Hour Forecast
              </div>
              <div class="panel-subtitle">Average municipal fill rate across 5 days history + AI next 2 days</div>
            </div>
            <span class="badge-simulated">SIMULATED TREND</span>
          </div>

          <!-- High fidelity SVG Chart -->
          <div style="width: 100%; height: 240px; position: relative;">
            <svg viewBox="0 0 600 240" style="width: 100%; height: 100%; overflow: visible;">
              <!-- Grid lines -->
              <line x1="40" y1="30" x2="580" y2="30" stroke="#f1f5f9" stroke-width="1" />
              <line x1="40" y1="80" x2="580" y2="80" stroke="#f1f5f9" stroke-width="1" />
              <line x1="40" y1="130" x2="580" y2="130" stroke="#f1f5f9" stroke-width="1" />
              <line x1="40" y1="180" x2="580" y2="180" stroke="#f1f5f9" stroke-width="1" />

              <!-- Y-Axis Labels -->
              <text x="30" y="34" font-size="10" fill="#94a3b8" text-anchor="end">100%</text>
              <text x="30" y="84" font-size="10" fill="#94a3b8" text-anchor="end">75%</text>
              <text x="30" y="134" font-size="10" fill="#94a3b8" text-anchor="end">50%</text>
              <text x="30" y="184" font-size="10" fill="#94a3b8" text-anchor="end">25%</text>

              <!-- Threshold line at 80% (Critical) -->
              <line x1="40" y1="70" x2="580" y2="70" stroke="#fca5a5" stroke-width="1.5" stroke-dasharray="4,4" />
              <text x="575" y="65" font-size="9" fill="#dc2626" text-anchor="end" font-weight="600">CRITICAL OVERFLOW THRESHOLD (80%)</text>

              <!-- Historical Trend Area & Line (Days 1 to 5) -->
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#10b981" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="#10b981" stop-opacity="0.0"/>
                </linearGradient>
                <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.0"/>
                </linearGradient>
              </defs>

              <!-- Points: Day-4 (44%), Day-3 (52%), Day-2 (63%), Yesterday (72%), Today (81%) -->
              <!-- Coordinates: (70, 152), (150, 136), (230, 114), (310, 96), (390, 78) -->
              <!-- Predicted: Tomorrow (88% -> 470, 64), Day After (96% -> 550, 48) -->
              
              <polygon points="70,180 70,152 150,136 230,114 310,96 390,78 390,180" fill="url(#trendGrad)" />
              <polyline points="70,152 150,136 230,114 310,96 390,78" fill="none" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

              <!-- Prediction dashed line -->
              <polygon points="390,180 390,78 470,64 550,48 550,180" fill="url(#predGrad)" />
              <polyline points="390,78 470,64 550,48" fill="none" stroke="#d97706" stroke-width="3" stroke-dasharray="5,5" stroke-linecap="round" stroke-linejoin="round" />

              <!-- Circles for data points -->
              <circle cx="70" cy="152" r="4.5" fill="#059669" stroke="#ffffff" stroke-width="2" />
              <circle cx="150" cy="136" r="4.5" fill="#059669" stroke="#ffffff" stroke-width="2" />
              <circle cx="230" cy="114" r="4.5" fill="#059669" stroke="#ffffff" stroke-width="2" />
              <circle cx="310" cy="96" r="4.5" fill="#059669" stroke="#ffffff" stroke-width="2" />
              <circle cx="390" cy="78" r="6" fill="#047857" stroke="#ffffff" stroke-width="2.5" />
              
              <!-- Predicted circles -->
              <circle cx="470" cy="64" r="5" fill="#d97706" stroke="#ffffff" stroke-width="2" />
              <circle cx="550" cy="48" r="5" fill="#dc2626" stroke="#ffffff" stroke-width="2" />

              <!-- X-Axis Labels -->
              <text x="70" y="202" font-size="10" fill="#64748b" text-anchor="middle">Day -4</text>
              <text x="150" y="202" font-size="10" fill="#64748b" text-anchor="middle">Day -3</text>
              <text x="230" y="202" font-size="10" fill="#64748b" text-anchor="middle">Day -2</text>
              <text x="310" y="202" font-size="10" fill="#64748b" text-anchor="middle">Yesterday</text>
              <text x="390" y="202" font-size="10" fill="#0f172a" font-weight="700" text-anchor="middle">Today (81%)</text>
              <text x="470" y="202" font-size="10" fill="#d97706" font-weight="700" text-anchor="middle">+24h Pred (88%)</text>
              <text x="550" y="202" font-size="10" fill="#dc2626" font-weight="700" text-anchor="middle">+48h Pred (96%)</text>

              <!-- Legend embedded -->
              <g transform="translate(180, 224)">
                <circle cx="0" cy="0" r="4" fill="#059669" />
                <text x="8" y="3" font-size="10" fill="#475569">Historical Recorded</text>
                <circle cx="140" cy="0" r="4" fill="#d97706" />
                <text x="148" y="3" font-size="10" fill="#475569">AI Forecast (+24h/+48h)</text>
              </g>
            </svg>
          </div>
        </div>

        <!-- 2. Priority Distribution Chart -->
        <div class="card-panel">
          <div class="panel-header">
            <div>
              <div class="panel-title">
                <span>🎯</span> Collection Priority Breakdown
              </div>
              <div class="panel-subtitle">Real-time status across 20 points</div>
            </div>
            <span class="badge-simulated">LOCAL SCORING</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 10px;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 4px; font-weight: 600;">
                <span style="color: #dc2626;">🔴 Critical (>85% or rapid surge)</span>
                <span>${criticalCount} points (${Math.round(criticalCount/points.length*100)}%)</span>
              </div>
              <div class="progress-bar-wrap">
                <div class="progress-bar-fill fill-critical" style="width: ${(criticalCount/points.length)*100}%;"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 4px; font-weight: 600;">
                <span style="color: #ea580c;">🟠 High Priority (65% - 85%)</span>
                <span>${highCount} points (${Math.round(highCount/points.length*100)}%)</span>
              </div>
              <div class="progress-bar-wrap">
                <div class="progress-bar-fill fill-high" style="width: ${(highCount/points.length)*100}%;"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 4px; font-weight: 600;">
                <span style="color: #ca8a04;">🟡 Medium Priority (40% - 65%)</span>
                <span>${mediumCount} points (${Math.round(mediumCount/points.length*100)}%)</span>
              </div>
              <div class="progress-bar-wrap">
                <div class="progress-bar-fill fill-medium" style="width: ${(mediumCount/points.length)*100}%;"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 4px; font-weight: 600;">
                <span style="color: #16a34a;">🟢 Low Priority (<40%)</span>
                <span>${lowCount} points (${Math.round(lowCount/points.length*100)}%)</span>
              </div>
              <div class="progress-bar-wrap">
                <div class="progress-bar-fill fill-low" style="width: ${(lowCount/points.length)*100}%;"></div>
              </div>
            </div>

            <div style="background-color: #f8fafc; border-radius: 8px; padding: 10px 14px; font-size: 0.76rem; color: #475569; margin-top: 6px; border: 1px solid #e2e8f0;">
              💡 <strong>Intelligent Deferral:</strong> ${lowCount} low-priority points are deferred today, avoiding ~18 km of unnecessary truck loops.
            </div>
          </div>
        </div>
      </div>

      <!-- Second Row: Collection Status & Vehicle Fleet Status -->
      <div class="dashboard-grid-equal">
        <!-- 3. Collection Status Chart -->
        <div class="card-panel">
          <div class="panel-header">
            <div>
              <div class="panel-title">
                <span>📋</span> Collection Cycle Status
              </div>
              <div class="panel-subtitle">Shift progression breakdown</div>
            </div>
            <button class="btn-secondary" style="padding: 4px 10px; font-size: 0.75rem;" onclick="navigateTo('operations')">View Operations</button>
          </div>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; text-align: center; margin-bottom: 18px;">
            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 6px;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #15803d;">${completedCount}</div>
              <div style="font-size: 0.72rem; font-weight: 700; color: #166534; text-transform: uppercase;">Completed</div>
            </div>
            <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px 6px;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #1d4ed8;">${inProgressCount}</div>
              <div style="font-size: 0.72rem; font-weight: 700; color: #1e40af; text-transform: uppercase;">In Progress</div>
            </div>
            <div style="background-color: #fefce8; border: 1px solid #fef08a; border-radius: 8px; padding: 12px 6px;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #a16207;">${pendingCount}</div>
              <div style="font-size: 0.72rem; font-weight: 700; color: #854d0e; text-transform: uppercase;">Scheduled</div>
            </div>
            <div style="background-color: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 6px;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #64748b;">0</div>
              <div style="font-size: 0.72rem; font-weight: 700; color: #475569; text-transform: uppercase;">Delayed</div>
            </div>
          </div>

          <div style="font-size: 0.8rem; color: #475569; display: flex; align-items: center; justify-content: space-between;">
            <span>Current Shift Efficiency: <strong>94.2%</strong></span>
            <span style="color: #059669; font-weight: 600;">✓ On schedule</span>
          </div>
        </div>

        <!-- 4. Vehicle Status Summary -->
        <div class="card-panel">
          <div class="panel-header">
            <div>
              <div class="panel-title">
                <span>🚛</span> Municipal Fleet Status
              </div>
              <div class="panel-subtitle">10 municipal collection vehicles</div>
            </div>
            <button class="btn-secondary" style="padding: 4px 10px; font-size: 0.75rem;" onclick="navigateTo('fleet')">Manage Fleet</button>
          </div>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; text-align: center; margin-bottom: 18px;">
            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 6px;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #16a34a;">${availCount}</div>
              <div style="font-size: 0.72rem; font-weight: 700; color: #15803d; text-transform: uppercase;">Available</div>
            </div>
            <div style="background-color: #e0f2fe; border: 1px solid #bae6fd; border-radius: 8px; padding: 12px 6px;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #0284c7;">${activeCount}</div>
              <div style="font-size: 0.72rem; font-weight: 700; color: #0369a1; text-transform: uppercase;">Active</div>
            </div>
            <div style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 12px 6px;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #d97706;">${returnCount}</div>
              <div style="font-size: 0.72rem; font-weight: 700; color: #b45309; text-transform: uppercase;">Returning</div>
            </div>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 6px;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #64748b;">${maintCount}</div>
              <div style="font-size: 0.72rem; font-weight: 700; color: #475569; text-transform: uppercase;">Maintenance</div>
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; color: #475569;">
            <span>Total Tonnage Capacity: <strong>104 Tons</strong></span>
            <span>Average Fleet Utilization: <strong>84.6%</strong></span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 2. COLLECTION POINTS VIEW
// -------------------------------------------------------------
function renderCollectionPointsHTML() {
  let points = SmartWasteStore.collectionPoints;

  // Search filter
  if (SmartWasteStore.searchQuery) {
    const q = SmartWasteStore.searchQuery.toLowerCase();
    points = points.filter(p => p.id.toLowerCase().includes(q) || p.area.toLowerCase().includes(q) || p.zone.toLowerCase().includes(q));
  }

  // Priority filter
  if (SmartWasteStore.priorityFilter !== 'ALL') {
    points = points.filter(p => p.priority === SmartWasteStore.priorityFilter);
  }

  return `
    <div class="page-container">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a;">Municipal Collection Points</h2>
          <p style="font-size: 0.85rem; color: #64748b;">Real-time bin monitoring, historical accumulation rates, and AI prioritization.</p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn-primary" onclick="runWastePredictionEngine()">
            <span>🤖</span> PREDICT WASTE
          </button>
          <button class="btn-secondary" onclick="navigateTo('map')">
            <span>🗺️</span> View on Map
          </button>
        </div>
      </div>

      <!-- Controls Toolbar (Search & Priority Filters) -->
      <div class="toolbar-container">
        <div class="search-box">
          <span>🔍</span>
          <input type="text" placeholder="Search by ID, Area, or Sector..." value="${SmartWasteStore.searchQuery}" oninput="handleSearch(this.value)" />
        </div>

        <div class="filter-btn-group">
          <button class="filter-btn ${SmartWasteStore.priorityFilter === 'ALL' ? 'active' : ''}" onclick="setPriorityFilter('ALL')">ALL (${SmartWasteStore.collectionPoints.length})</button>
          <button class="filter-btn ${SmartWasteStore.priorityFilter === 'CRITICAL' ? 'active' : ''}" onclick="setPriorityFilter('CRITICAL')">🔴 CRITICAL (${SmartWasteStore.collectionPoints.filter(p=>p.priority==='CRITICAL').length})</button>
          <button class="filter-btn ${SmartWasteStore.priorityFilter === 'HIGH' ? 'active' : ''}" onclick="setPriorityFilter('HIGH')">🟠 HIGH (${SmartWasteStore.collectionPoints.filter(p=>p.priority==='HIGH').length})</button>
          <button class="filter-btn ${SmartWasteStore.priorityFilter === 'MEDIUM' ? 'active' : ''}" onclick="setPriorityFilter('MEDIUM')">🟡 MEDIUM (${SmartWasteStore.collectionPoints.filter(p=>p.priority==='MEDIUM').length})</button>
          <button class="filter-btn ${SmartWasteStore.priorityFilter === 'LOW' ? 'active' : ''}" onclick="setPriorityFilter('LOW')">🟢 LOW (${SmartWasteStore.collectionPoints.filter(p=>p.priority==='LOW').length})</button>
        </div>
      </div>

      <!-- Table Component -->
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Point ID</th>
              <th>Area / Sector</th>
              <th>Current Waste</th>
              <th>Predicted (+24h)</th>
              <th>Last Collection</th>
              <th>Accumulation</th>
              <th>Priority</th>
              <th>Rec. Time</th>
              <th>Assigned Vehicle</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${points.length === 0 ? `
              <tr><td colspan="11" style="text-align: center; padding: 32px; color: #94a3b8;">No collection points matched the current filter.</td></tr>
            ` : points.map(p => `
              <tr onclick="openPointModal('${p.id}')">
                <td style="font-weight: 700; color: #0f172a;">${p.id}</td>
                <td>
                  <div style="font-weight: 600;">${p.area}</div>
                  <div style="font-size: 0.72rem; color: #64748b;">${p.zone}</div>
                </td>
                <td style="min-width: 130px;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 700; margin-bottom: 3px;">
                    <span>${p.currentWasteLevel}%</span>
                  </div>
                  <div class="progress-bar-wrap">
                    <div class="progress-bar-fill fill-${p.priority.toLowerCase()}" style="width: ${p.currentWasteLevel}%;"></div>
                  </div>
                </td>
                <td style="font-weight: 700; color: ${p.predictedLevel >= 85 ? '#dc2626' : '#1e293b'};">
                  ${p.predictedLevel}%
                </td>
                <td>${p.lastCollection}</td>
                <td style="color: #059669; font-weight: 600;">+${p.accumulationRate}%/day</td>
                <td>
                  <span class="badge-priority ${p.priority.toLowerCase()}">${p.priority}</span>
                </td>
                <td style="font-weight: 600;">${p.recommendedTime}</td>
                <td>
                  <span style="font-weight: 600; color: #0369a1;">${p.assignedVehicle || 'Unassigned'}</span>
                </td>
                <td>
                  <span class="badge-status ${p.status === 'Collected' ? 'available' : p.status === 'In Progress' ? 'active' : 'scheduled'}">${p.status}</span>
                </td>
                <td>
                  <button class="btn-secondary" style="padding: 4px 8px; font-size: 0.72rem;" onclick="event.stopPropagation(); openPointModal('${p.id}')">Details</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 3. LIVE MAP VIEW (Simulated City SVG Map)
// -------------------------------------------------------------
function renderLiveMapHTML() {
  const points = SmartWasteStore.collectionPoints;
  const vehicles = SmartWasteStore.vehicles;
  const routes = SmartWasteStore.routes;

  return `
    <div class="page-container">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a;">Municipal Live Map Visualization</h2>
          <p style="font-size: 0.85rem; color: #64748b;">Simulated metropolitan grid with priority pins, active collection vehicles, and AI-optimized route paths.</p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn-primary" onclick="runRouteOptimizationEngine()">
            <span>🗺️</span> OPTIMIZE ROUTES
          </button>
          <button class="btn-secondary" onclick="advanceOperationStep()">
            <span>⏩</span> Step Operations
          </button>
        </div>
      </div>

      <!-- SVG Map Viewport -->
      <div class="map-viewport-wrapper">
        <!-- Floating Info Panel -->
        <div class="map-floating-panel">
          <div style="font-weight: 700; font-size: 0.84rem; color: #0f172a; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
            <span>🏙️</span> Metro Operations Center
          </div>
          <div style="font-size: 0.75rem; color: #64748b; line-height: 1.4;">
            Showing 20 monitored collection points across 5 municipal districts. Active routes dynamically drawn.
          </div>
          <div style="margin-top: 8px; font-size: 0.72rem; color: #059669; font-weight: 600;">
            Click any pin or vehicle for live operational telemetry.
          </div>
        </div>

        <!-- Floating Controls Panel -->
        <div class="map-controls-panel">
          <button class="btn-secondary" style="padding: 6px 12px; font-size: 0.75rem; background: white;" onclick="toggleMapLayer('routes')">
            ${SmartWasteStore.showRoutesOnMap ? '✓ Hide Routes' : 'Show Routes'}
          </button>
          <button class="btn-secondary" style="padding: 6px 12px; font-size: 0.75rem; background: white;" onclick="toggleMapLayer('vehicles')">
            ${SmartWasteStore.showVehiclesOnMap ? '✓ Hide Vehicles' : 'Show Vehicles'}
          </button>
        </div>

        <!-- SVG Map Content -->
        <svg viewBox="0 0 850 520" class="map-svg-container">
          <!-- Background Grid & Land masses -->
          <rect x="0" y="0" width="850" height="520" fill="#f8fafc" />

          <!-- Water Body (Harbor District on East Coast) -->
          <path d="M 580,0 Q 640,180 540,320 T 630,520 L 850,520 L 850,0 Z" fill="#e0f2fe" opacity="0.7" />
          <text x="730" y="470" font-size="12" fill="#0284c7" font-weight="700" letter-spacing="0.1em">HARBOR BAY</text>

          <!-- Zone Boundary Polygons & Labels -->
          <!-- Zone B: North Zone -->
          <rect x="220" y="30" width="320" height="150" fill="#f1f5f9" rx="12" opacity="0.6" stroke="#cbd5e1" stroke-dasharray="4,4" />
          <text x="240" y="55" font-size="11" fill="#64748b" font-weight="700">ZONE B: NORTH SECTOR</text>

          <!-- Zone A: Central Core -->
          <rect x="300" y="190" width="260" height="200" fill="#ecfdf5" rx="12" opacity="0.5" stroke="#a7f3d0" stroke-dasharray="4,4" />
          <text x="320" y="215" font-size="11" fill="#047857" font-weight="700">ZONE A: CENTRAL METRO CORE</text>

          <!-- Zone C: West Hills -->
          <rect x="60" y="150" width="220" height="260" fill="#fef9c3" rx="12" opacity="0.4" stroke="#fde047" stroke-dasharray="4,4" />
          <text x="80" y="175" font-size="11" fill="#a16207" font-weight="700">ZONE C: WEST RESIDENTIAL</text>

          <!-- Zone D: East Industrial -->
          <rect x="620" y="70" width="180" height="280" fill="#ede9fe" rx="12" opacity="0.5" stroke="#ddd6fe" stroke-dasharray="4,4" />
          <text x="635" y="95" font-size="11" fill="#6d28d9" font-weight="700">ZONE D: INDUSTRIAL PARK</text>

          <!-- City Street Grid Lines -->
          <!-- Horizontal Arterials -->
          <line x1="60" y1="120" x2="800" y2="120" stroke="#e2e8f0" stroke-width="6" />
          <line x1="60" y1="240" x2="800" y2="240" stroke="#e2e8f0" stroke-width="8" />
          <line x1="60" y1="360" x2="800" y2="360" stroke="#e2e8f0" stroke-width="6" />
          <!-- Vertical Arterials -->
          <line x1="200" y1="40" x2="200" y2="480" stroke="#e2e8f0" stroke-width="6" />
          <line x1="380" y1="40" x2="380" y2="480" stroke="#e2e8f0" stroke-width="8" />
          <line x1="560" y1="40" x2="560" y2="480" stroke="#e2e8f0" stroke-width="6" />

          <!-- Depot Landmark Icons -->
          <!-- Central Transfer Depot -->
          <g transform="translate(480, 290)">
            <rect x="-16" y="-16" width="32" height="32" rx="6" fill="#0f172a" />
            <text x="0" y="5" font-size="12" fill="#ffffff" text-anchor="middle">🏢</text>
            <text x="0" y="26" font-size="9" fill="#0f172a" font-weight="700" text-anchor="middle">Central Depot</text>
          </g>

          <!-- North Depot -->
          <g transform="translate(360, 60)">
            <rect x="-14" y="-14" width="28" height="28" rx="6" fill="#0f172a" />
            <text x="0" y="4" font-size="11" fill="#ffffff" text-anchor="middle">🏢</text>
            <text x="0" y="24" font-size="9" fill="#0f172a" font-weight="700" text-anchor="middle">North Depot</text>
          </g>

          <!-- Route Lines (Rendered when showRoutesOnMap is true) -->
          ${SmartWasteStore.showRoutesOnMap ? routes.map(r => {
            const stopCoords = r.stops.map(sid => {
              const pt = points.find(p => p.id === sid);
              return pt ? `${pt.x},${pt.y}` : null;
            }).filter(Boolean);

            if (stopCoords.length < 2) return '';
            const pathData = "M " + stopCoords.join(" L ");
            return `
              <path d="${pathData}" fill="none" stroke="${r.color}" stroke-width="3.5" stroke-dasharray="8,5" opacity="0.85" stroke-linecap="round" stroke-linejoin="round">
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="8s" repeatCount="indefinite" />
              </path>
            `;
          }).join('') : ''}

          <!-- Collection Point Markers -->
          ${points.map(p => {
            const colorMap = {
              CRITICAL: '#dc2626',
              HIGH: '#ea580c',
              MEDIUM: '#ca8a04',
              LOW: '#16a34a'
            };
            const pinColor = colorMap[p.priority] || '#16a34a';

            return `
              <g transform="translate(${p.x}, ${p.y})" style="cursor: pointer;" onclick="openPointModal('${p.id}')">
                ${p.priority === 'CRITICAL' ? `
                  <circle cx="0" cy="0" r="14" fill="#fee2e2" opacity="0.7">
                    <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite"/>
                  </circle>
                ` : ''}
                <circle cx="0" cy="0" r="8" fill="${pinColor}" stroke="#ffffff" stroke-width="2.5" />
                <text x="0" y="-12" font-size="9" font-weight="700" fill="#0f172a" text-anchor="middle">${p.id}</text>
                <text x="0" y="20" font-size="8" font-weight="600" fill="${pinColor}" text-anchor="middle">${p.currentWasteLevel}%</text>
              </g>
            `;
          }).join('')}

          <!-- Vehicle Markers (Rendered when showVehiclesOnMap is true) -->
          ${SmartWasteStore.showVehiclesOnMap ? vehicles.map(v => {
            if (v.status === 'MAINTENANCE') return '';
            return `
              <g transform="translate(${v.x}, ${v.y})" style="cursor: pointer;" onclick="openVehicleModal('${v.id}')">
                <rect x="-14" y="-12" width="28" height="24" rx="6" fill="#0284c7" stroke="#ffffff" stroke-width="2" />
                <text x="0" y="3" font-size="11" fill="#ffffff" text-anchor="middle">🚛</text>
                <text x="0" y="-16" font-size="9" font-weight="800" fill="#0369a1" text-anchor="middle">${v.id}</text>
              </g>
            `;
          }).join('') : ''}
        </svg>

        <!-- Map Legend Panel -->
        <div class="map-legend-panel">
          <div class="legend-item"><div class="legend-circle" style="background-color: #dc2626;"></div> Critical Priority</div>
          <div class="legend-item"><div class="legend-circle" style="background-color: #ea580c;"></div> High Priority</div>
          <div class="legend-item"><div class="legend-circle" style="background-color: #ca8a04;"></div> Medium Priority</div>
          <div class="legend-item"><div class="legend-circle" style="background-color: #16a34a;"></div> Low Priority</div>
          <div class="legend-item" style="margin-left: 8px;"><span>🚛</span> Active Vehicle</div>
          <div class="legend-item"><span>🏢</span> Operations Depot</div>
          <div class="legend-item"><span style="color: #059669; font-weight: 700;">---</span> AI Route</div>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 4. AI PREDICTIONS VIEW
// -------------------------------------------------------------
function renderAIPredictionsHTML() {
  const points = SmartWasteStore.collectionPoints;

  return `
    <div class="page-container">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a;">AI Waste Prediction Engine</h2>
            <span class="badge-simulated">AI DEMO — SIMULATED PREDICTION</span>
          </div>
          <p style="font-size: 0.85rem; color: #64748b;">
            Calculates 24-hour and 48-hour municipal bin capacity projection using current fill levels, diurnal accumulation rates, and historical variance.
          </p>
        </div>
        <button class="btn-primary" onclick="runWastePredictionEngine()">
          <span>🤖</span> PREDICT WASTE NOW
        </button>
      </div>

      <!-- Logic Explanation Card -->
      <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 22px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <h4 style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
          <span>⚙️</span> Local AI Prediction & Scoring Formulation
        </h4>
        <p style="font-size: 0.82rem; color: #475569; margin-bottom: 12px;">
          The simulated engine computes predicted fill using: <code>Predicted Level (+24h) = Current Level + Historical Daily Accumulation Rate + Sector Variance Factor</code>. 
          Locations crossing 80% volume trigger autonomous priority escalation.
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; font-size: 0.78rem;">
          <div style="background-color: #f8fafc; padding: 10px 12px; border-radius: 6px; border-left: 3px solid #059669;">
            <strong>Waste Accumulation Rate:</strong> Derived from 5-day sensor logs (+4% to +15%/day).
          </div>
          <div style="background-color: #f8fafc; padding: 10px 12px; border-radius: 6px; border-left: 3px solid #d97706;">
            <strong>Urgency Multiplier:</strong> Points with >30 hours since last sweep receive +15% weight.
          </div>
          <div style="background-color: #f8fafc; padding: 10px 12px; border-radius: 6px; border-left: 3px solid #dc2626;">
            <strong>Overflow Risk Guardrail:</strong> Bins forecast >95% marked Critical with immediate morning slot.
          </div>
        </div>
      </div>

      <!-- Predictions Table -->
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Point ID</th>
              <th>Sector Area</th>
              <th>Current Level</th>
              <th>Historical Rate</th>
              <th>Predicted +24h</th>
              <th>Predicted +48h</th>
              <th>Priority Impact</th>
              <th>AI Decision Recommendation</th>
            </tr>
          </thead>
          <tbody>
            ${points.map(p => `
              <tr onclick="openPointModal('${p.id}')">
                <td style="font-weight: 700; color: #0f172a;">${p.id}</td>
                <td>
                  <div style="font-weight: 600;">${p.area}</div>
                  <div style="font-size: 0.72rem; color: #64748b;">${p.zone}</div>
                </td>
                <td>
                  <span style="font-weight: 700;">${p.currentWasteLevel}%</span>
                </td>
                <td style="color: #059669; font-weight: 600;">+${p.accumulationRate}% / day</td>
                <td>
                  <strong style="color: ${p.predictedLevel >= 85 ? '#dc2626' : p.predictedLevel >= 70 ? '#ea580c' : '#1e293b'}; font-size: 0.95rem;">
                    ${p.predictedLevel}%
                  </strong>
                </td>
                <td>
                  <span style="color: ${p.predictedLevel2d >= 90 ? '#dc2626' : '#64748b'}; font-weight: 600;">
                    ${p.predictedLevel2d}%
                  </span>
                </td>
                <td>
                  <span class="badge-priority ${p.priority.toLowerCase()}">${p.priority}</span>
                </td>
                <td style="font-size: 0.8rem; color: #334155;">
                  ${p.recommendation}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 5. FLEET MANAGEMENT VIEW
// -------------------------------------------------------------
function renderFleetManagementHTML() {
  const vehicles = SmartWasteStore.vehicles;

  return `
    <div class="page-container">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a;">Municipal Fleet Management</h2>
          <p style="font-size: 0.85rem; color: #64748b;">10 municipal collection vehicles, real-time load distribution, capacity matching, and maintenance telemetry.</p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn-primary" onclick="runVehicleAssignmentEngine()">
            <span>🚛</span> ASSIGN VEHICLES
          </button>
        </div>
      </div>

      <!-- Fleet Overview KPI Strip -->
      <div class="kpi-grid" style="margin-bottom: 20px;">
        <div class="kpi-card">
          <div class="kpi-header"><span class="kpi-title">Total Fleet</span><span>🚛</span></div>
          <div class="kpi-value">${vehicles.length} Units</div>
          <div class="kpi-subtext">Heavy, Medium & Electric</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-header"><span class="kpi-title">Active Dispatched</span><span style="color: #0284c7;">⚡</span></div>
          <div class="kpi-value" style="color: #0284c7;">${vehicles.filter(v=>v.status==='ACTIVE').length}</div>
          <div class="kpi-subtext">Collecting on assigned routes</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-header"><span class="kpi-title">Available in Depots</span><span style="color: #16a34a;">🟢</span></div>
          <div class="kpi-value" style="color: #16a34a;">${vehicles.filter(v=>v.status==='AVAILABLE').length}</div>
          <div class="kpi-subtext">Standby for dynamic dispatch</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-header"><span class="kpi-title">Maintenance</span><span style="color: #64748b;">🔧</span></div>
          <div class="kpi-value" style="color: #64748b;">${vehicles.filter(v=>v.status==='MAINTENANCE').length}</div>
          <div class="kpi-subtext">Scheduled municipal inspection</div>
        </div>
      </div>

      <!-- Fleet Table -->
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Vehicle Type</th>
              <th>Capacity</th>
              <th>Current Load</th>
              <th>Status</th>
              <th>Current Area</th>
              <th>Assigned Route</th>
              <th>Stops Done</th>
              <th>ETA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${vehicles.map(v => {
              const loadPercent = Math.round((v.currentLoad / v.capacity) * 100) || 0;
              return `
                <tr onclick="openVehicleModal('${v.id}')">
                  <td style="font-weight: 800; color: #0f172a;">${v.id}</td>
                  <td style="font-weight: 600;">${v.type}</td>
                  <td>${v.capacity} Tons</td>
                  <td style="min-width: 140px;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 700; margin-bottom: 2px;">
                      <span>${v.currentLoad} / ${v.capacity} t</span>
                      <span>${loadPercent}%</span>
                    </div>
                    <div class="progress-bar-wrap">
                      <div class="progress-bar-fill fill-primary" style="width: ${loadPercent}%;"></div>
                    </div>
                  </td>
                  <td>
                    <span class="badge-status ${v.status.toLowerCase()}">${v.status}</span>
                  </td>
                  <td>${v.location}</td>
                  <td>
                    <span style="font-weight: 700; color: #7c3aed;">${v.assignedRoute || 'Standby'}</span>
                  </td>
                  <td>${v.completedStops} / ${v.totalStops}</td>
                  <td>${v.eta}</td>
                  <td>
                    <button class="btn-secondary" style="padding: 4px 8px; font-size: 0.72rem;" onclick="event.stopPropagation(); openVehicleModal('${v.id}')">View</button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 6. ROUTE OPTIMIZATION VIEW (Main Feature)
// -------------------------------------------------------------
function renderRouteOptimizationHTML() {
  const routes = SmartWasteStore.routes;
  const b = SmartWasteStore.benchmarks;

  return `
    <div class="page-container">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a;">AI Route Optimization Engine</h2>
            <span class="badge-simulated">SIMULATED DEMO RESULT</span>
          </div>
          <p style="font-size: 0.85rem; color: #64748b;">
            Autonomous cluster routing replacing rigid municipal daily loops with demand-responsive, capacity-balanced paths.
          </p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn-primary" onclick="runRouteOptimizationEngine()">
            <span>🗺️</span> OPTIMIZE ROUTES
          </button>
          <button class="btn-secondary" onclick="navigateTo('map')">
            <span>👁️</span> View on Live Map
          </button>
        </div>
      </div>

      <!-- MANDATORY ROUTE COMPARISON BANNER -->
      <div class="comparison-hero-card">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #bbf7d0; padding-bottom: 12px;">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: #065f46; margin-bottom: 2px;">
              TRADITIONAL FIXED ROUTE vs. AI-OPTIMIZED DEMAND ROUTE
            </h3>
            <p style="font-size: 0.8rem; color: #047857;">Comparative evaluation across 20 municipal collection points and 5 active truck routes</p>
          </div>
          <span class="badge-simulated" style="background: white; border-color: #86efac; color: #065f46;">
            SIMULATED BENCHMARK
          </span>
        </div>

        <div class="comparison-grid">
          <div class="comparison-box">
            <div class="comp-label">Traditional Fixed Route</div>
            <div class="comp-metric" style="color: #64748b;">${b.traditionalDistance} <span style="font-size: 1.1rem; font-weight: 600;">km</span></div>
            <div class="comp-sub">Estimated Travel: <strong>${b.traditionalTimeHours} hrs</strong> • Fuel: <strong>${b.traditionalFuelLiters} L</strong></div>
            <div style="font-size: 0.72rem; color: #94a3b8; margin-top: 6px;">Rigid fixed daily schedule visits every bin regardless of fill level.</div>
          </div>

          <div class="comparison-box highlight">
            <div class="comp-label" style="color: #065f46;">AI-Optimized Route</div>
            <div class="comp-metric" style="color: #059669;">${b.optimizedDistance} <span style="font-size: 1.1rem; font-weight: 600;">km</span></div>
            <div class="comp-sub" style="color: #065f46;">Estimated Travel: <strong>${b.optimizedTimeHours} hrs</strong> • Fuel: <strong>${b.optimizedFuelLiters} L</strong></div>
            <div style="font-size: 0.72rem; color: #059669; margin-top: 6px; font-weight: 600;">Intelligently skips low-fill points; optimal sequence clusters.</div>
          </div>

          <div class="comparison-box savings">
            <div class="comp-label" style="color: #b45309;">Net Municipal Savings</div>
            <div class="comp-metric" style="color: #d97706;">-${b.savedDistance} <span style="font-size: 1.1rem; font-weight: 600;">km (-${b.savedPercentage}%)</span></div>
            <div class="comp-sub" style="color: #b45309;">Time Saved: <strong>1.6 hrs</strong> • Fuel Saved: <strong>11 L</strong></div>
            <div style="font-size: 0.72rem; color: #92400e; margin-top: 6px; font-weight: 600;">CO₂ Avoided: ~${b.co2SavedKg} kg (Simulated estimate).</div>
          </div>
        </div>
      </div>

      <!-- Optimized Routes Table -->
      <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size: 1rem; font-weight: 700; color: #0f172a;">Generated Route Clusters & Assignments</h4>
        <span style="font-size: 0.78rem; color: #64748b;">5 Active Route Loops Generated</span>
      </div>

      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Route ID</th>
              <th>Assigned Vehicle</th>
              <th>Collection Sequence</th>
              <th>Stops</th>
              <th>Distance</th>
              <th>Est. Travel Time</th>
              <th>Vehicle Utilization</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${routes.map(r => `
              <tr>
                <td style="font-weight: 800; color: ${r.color};">${r.id}</td>
                <td>
                  <strong style="color: #0369a1;">${r.vehicleId}</strong>
                </td>
                <td style="font-family: monospace; font-size: 0.8rem; font-weight: 600; color: #334155;">
                  Depot → ${r.stops.join(' → ')} → Depot
                </td>
                <td style="font-weight: 700;">${r.stops.length} stops</td>
                <td><strong>${r.distance} km</strong></td>
                <td>${r.estimatedTime} min</td>
                <td style="min-width: 120px;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; margin-bottom: 2px;">
                    <span>${r.utilization}%</span>
                  </div>
                  <div class="progress-bar-wrap">
                    <div class="progress-bar-fill fill-primary" style="width: ${r.utilization}%;"></div>
                  </div>
                </td>
                <td>
                  <span class="badge-status ${r.status === 'Ready' ? 'available' : 'active'}">${r.status}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 7. SMART SCHEDULING VIEW
// -------------------------------------------------------------
function renderSmartSchedulingHTML() {
  const points = SmartWasteStore.collectionPoints;

  return `
    <div class="page-container">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a;">Smart Demand-Based Scheduling</h2>
          <p style="font-size: 0.85rem; color: #64748b;">Dynamic time windows allocated based on fill urgency rather than static calendar timetables.</p>
        </div>
        <button class="btn-accent" onclick="runSmartSchedulingEngine()">
          <span>📅</span> GENERATE SCHEDULE
        </button>
      </div>

      <!-- Schedule Table -->
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Collection Point</th>
              <th>Sector Area</th>
              <th>Priority Level</th>
              <th>Recommended Time Window</th>
              <th>Assigned Vehicle</th>
              <th>Optimized Route</th>
              <th>Scheduled Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${points.map(p => `
              <tr onclick="openPointModal('${p.id}')">
                <td style="font-weight: 700; color: #0f172a;">${p.id}</td>
                <td>${p.area}</td>
                <td>
                  <span class="badge-priority ${p.priority.toLowerCase()}">${p.priority}</span>
                </td>
                <td style="font-weight: 700; color: #0f172a;">
                  🕒 ${p.recommendedTime}
                </td>
                <td>
                  <span style="font-weight: 600; color: #0369a1;">${p.assignedVehicle || 'Unassigned'}</span>
                </td>
                <td>
                  <span style="font-weight: 600; color: #7c3aed;">${p.assignedRoute || 'Pending'}</span>
                </td>
                <td>
                  <span class="badge-status ${p.status === 'Collected' ? 'available' : p.status === 'In Progress' ? 'active' : 'scheduled'}">${p.status}</span>
                </td>
                <td>
                  <button class="btn-secondary" style="padding: 4px 8px; font-size: 0.72rem;" onclick="event.stopPropagation(); openPointModal('${p.id}')">View</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 8. LIVE OPERATIONS VIEW
// -------------------------------------------------------------
function renderLiveOperationsHTML() {
  let vehicles = SmartWasteStore.vehicles;

  if (SmartWasteStore.opsFilter !== 'ALL') {
    vehicles = vehicles.filter(v => v.status === SmartWasteStore.opsFilter);
  }

  return `
    <div class="page-container">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a;">Municipal Live Operations Center</h2>
            <span class="badge-simulated">LIVE OPERATIONS — DEMO SIMULATION</span>
          </div>
          <p style="font-size: 0.85rem; color: #64748b;">
            Operational monitoring of field crews, route progress percentages, stop execution, and return ETAs.
          </p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn-primary" onclick="advanceOperationStep()">
            <span>⏩</span> SIMULATE NEXT STOP STEP
          </button>
          <button class="btn-secondary" onclick="resetOperationSimulation()">
            <span>🔄</span> Reset Simulation
          </button>
        </div>
      </div>

      <!-- Filters Strip -->
      <div class="toolbar-container">
        <div class="filter-btn-group">
          <button class="filter-btn ${SmartWasteStore.opsFilter === 'ALL' ? 'active' : ''}" onclick="setOpsFilter('ALL')">ALL FLEET (${SmartWasteStore.vehicles.length})</button>
          <button class="filter-btn ${SmartWasteStore.opsFilter === 'ACTIVE' ? 'active' : ''}" onclick="setOpsFilter('ACTIVE')">ACTIVE (${SmartWasteStore.vehicles.filter(v=>v.status==='ACTIVE').length})</button>
          <button class="filter-btn ${SmartWasteStore.opsFilter === 'RETURNING' ? 'active' : ''}" onclick="setOpsFilter('RETURNING')">RETURNING (${SmartWasteStore.vehicles.filter(v=>v.status==='RETURNING').length})</button>
          <button class="filter-btn ${SmartWasteStore.opsFilter === 'AVAILABLE' ? 'active' : ''}" onclick="setOpsFilter('AVAILABLE')">AVAILABLE (${SmartWasteStore.vehicles.filter(v=>v.status==='AVAILABLE').length})</button>
          <button class="filter-btn ${SmartWasteStore.opsFilter === 'MAINTENANCE' ? 'active' : ''}" onclick="setOpsFilter('MAINTENANCE')">MAINTENANCE (${SmartWasteStore.vehicles.filter(v=>v.status==='MAINTENANCE').length})</button>
        </div>
        <span style="font-size: 0.78rem; color: #059669; font-weight: 600;">● Live Simulation Engine Active</span>
      </div>

      <!-- Live Operations Table -->
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Assigned Crew</th>
              <th>Current Sector</th>
              <th>Route</th>
              <th>Route Progress</th>
              <th>Completed Stops</th>
              <th>Remaining</th>
              <th>Current ETA</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${vehicles.map(v => {
              const progress = v.totalStops > 0 ? Math.round((v.completedStops / v.totalStops) * 100) : 0;
              const remaining = Math.max(0, v.totalStops - v.completedStops);
              return `
                <tr onclick="openVehicleModal('${v.id}')">
                  <td style="font-weight: 800; color: #0f172a;">${v.id}</td>
                  <td>
                    <div style="font-weight: 600;">${v.driver}</div>
                    <div style="font-size: 0.72rem; color: #64748b;">${v.type}</div>
                  </td>
                  <td>${v.location}</td>
                  <td><strong style="color: #7c3aed;">${v.assignedRoute || 'N/A'}</strong></td>
                  <td style="min-width: 140px;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 700; margin-bottom: 2px;">
                      <span>${progress}%</span>
                    </div>
                    <div class="progress-bar-wrap">
                      <div class="progress-bar-fill fill-primary" style="width: ${progress}%;"></div>
                    </div>
                  </td>
                  <td style="font-weight: 700; color: #059669;">${v.completedStops} / ${v.totalStops}</td>
                  <td style="color: ${remaining > 0 ? '#d97706' : '#64748b'}; font-weight: 600;">
                    ${remaining} remaining
                  </td>
                  <td style="font-weight: 600;">${v.eta}</td>
                  <td>
                    <span class="badge-status ${v.status.toLowerCase()}">${v.status}</span>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 9. ANALYTICS VIEW
// -------------------------------------------------------------
function renderAnalyticsHTML() {
  const b = SmartWasteStore.benchmarks;
  const points = SmartWasteStore.collectionPoints;
  const criticalCount = points.filter(p => p.priority === "CRITICAL").length;
  const highCount = points.filter(p => p.priority === "HIGH").length;
  const mediumCount = points.filter(p => p.priority === "MEDIUM").length;
  const lowCount = points.filter(p => p.priority === "LOW").length;

  return `
    <div class="page-container">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a;">Municipal Analytics & Performance</h2>
            <span class="badge-simulated">SIMULATED DATA</span>
          </div>
          <p style="font-size: 0.85rem; color: #64748b;">
            Comprehensive efficiency metrics, traditional vs AI distance benchmarks, and vehicle utilization rates.
          </p>
        </div>
      </div>

      <!-- Analytics KPI Row -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-header"><span class="kpi-title">Total Collections</span><span>📍</span></div>
          <div class="kpi-value">${points.length}</div>
          <div class="kpi-subtext">Across 5 City Sectors</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-header"><span class="kpi-title">Completed Collections</span><span>✅</span></div>
          <div class="kpi-value">${points.filter(p=>p.status==='Collected').length}</div>
          <div class="kpi-subtext">Successfully Emptied</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-header"><span class="kpi-title">Critical Handled</span><span style="color: #dc2626;">⚠️</span></div>
          <div class="kpi-value" style="color: #dc2626;">${criticalCount}</div>
          <div class="kpi-subtext">High urgency resolved</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-header"><span class="kpi-title">Distance Traveled</span><span>🗺️</span></div>
          <div class="kpi-value">${b.optimizedDistance} km</div>
          <div class="kpi-subtext">AI-Optimized Route Loop</div>
        </div>
        <div class="kpi-card" style="border-left: 4px solid #10b981;">
          <div class="kpi-header"><span class="kpi-title">Distance Saved</span><span style="color: #059669;">🌱</span></div>
          <div class="kpi-value" style="color: #059669;">${b.savedDistance} km</div>
          <div class="kpi-subtext"><strong>${b.savedPercentage}% reduction</strong></div>
        </div>
        <div class="kpi-card">
          <div class="kpi-header"><span class="kpi-title">CO₂ Avoided</span><span>🌍</span></div>
          <div class="kpi-value">${b.co2SavedKg} kg</div>
          <div class="kpi-subtext">Fuel savings impact</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-header"><span class="kpi-title">Avg Utilization</span><span>📊</span></div>
          <div class="kpi-value">84.6%</div>
          <div class="kpi-subtext">High payload efficiency</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-header"><span class="kpi-title">Route Efficiency</span><span>⚡</span></div>
          <div class="kpi-value" style="color: #7c3aed;">94.2%</div>
          <div class="kpi-subtext">Cluster quality score</div>
        </div>
      </div>

      <!-- 4 Mandatory Analytics Charts -->
      <div class="dashboard-grid-equal" style="margin-bottom: 24px;">
        <!-- Chart 1: Waste Accumulation Trend -->
        <div class="card-panel">
          <div class="panel-header">
            <div class="panel-title">1. Waste Accumulation Trend (7-Day Average)</div>
            <span class="badge-simulated">HISTORICAL SENSOR LOG</span>
          </div>
          <svg viewBox="0 0 450 180" style="width: 100%; height: 180px;">
            <line x1="30" y1="20" x2="430" y2="20" stroke="#f1f5f9" />
            <line x1="30" y1="65" x2="430" y2="65" stroke="#f1f5f9" />
            <line x1="30" y1="110" x2="430" y2="110" stroke="#f1f5f9" />
            <line x1="30" y1="155" x2="430" y2="155" stroke="#e2e8f0" />
            <!-- Bar columns for 7 days -->
            ${[
              { day: 'Mon', val: 58, y: 70 },
              { day: 'Tue', val: 64, y: 62 },
              { day: 'Wed', val: 71, y: 52 },
              { day: 'Thu', val: 78, y: 42 },
              { day: 'Fri', val: 89, y: 26 },
              { day: 'Sat', val: 92, y: 22 },
              { day: 'Sun', val: 76, y: 45 }
            ].map((d, idx) => {
              const x = 50 + idx * 56;
              const h = 155 - d.y;
              return `
                <rect x="${x}" y="${d.y}" width="28" height="${h}" rx="4" fill="#10b981" opacity="0.85" />
                <text x="${x + 14}" y="${d.y - 5}" font-size="9" fill="#0f172a" font-weight="700" text-anchor="middle">${d.val}%</text>
                <text x="${x + 14}" y="170" font-size="9" fill="#64748b" text-anchor="middle">${d.day}</text>
              `;
            }).join('')}
          </svg>
        </div>

        <!-- Chart 2: Priority Distribution -->
        <div class="card-panel">
          <div class="panel-header">
            <div class="panel-title">2. Priority Distribution</div>
            <span class="badge-simulated">20 COLLECTION POINTS</span>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-around; height: 180px;">
            <svg viewBox="0 0 160 160" style="width: 140px; height: 140px;">
              <!-- Donut Chart -->
              <circle cx="80" cy="80" r="55" fill="none" stroke="#fee2e2" stroke-width="22" stroke-dasharray="86 260" stroke-dashoffset="0" />
              <circle cx="80" cy="80" r="55" fill="none" stroke="#ffedd5" stroke-width="22" stroke-dasharray="103 260" stroke-dashoffset="-86" />
              <circle cx="80" cy="80" r="55" fill="none" stroke="#fef9c3" stroke-width="22" stroke-dasharray="52 260" stroke-dashoffset="-189" />
              <circle cx="80" cy="80" r="55" fill="none" stroke="#dcfce7" stroke-width="22" stroke-dasharray="52 260" stroke-dashoffset="-241" />
              <text x="80" y="85" font-size="14" font-weight="800" fill="#0f172a" text-anchor="middle">20</text>
              <text x="80" y="98" font-size="8" fill="#64748b" text-anchor="middle">Points</text>
            </svg>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.8rem;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="color: #dc2626;">🔴</span> <strong>Critical:</strong> ${criticalCount} (${Math.round(criticalCount/points.length*100)}%)
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="color: #ea580c;">🟠</span> <strong>High:</strong> ${highCount} (${Math.round(highCount/points.length*100)}%)
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="color: #ca8a04;">🟡</span> <strong>Medium:</strong> ${mediumCount} (${Math.round(mediumCount/points.length*100)}%)
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="color: #16a34a;">🟢</span> <strong>Low:</strong> ${lowCount} (${Math.round(lowCount/points.length*100)}%)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard-grid-equal">
        <!-- Chart 3: Vehicle Fleet Utilization -->
        <div class="card-panel">
          <div class="panel-header">
            <div class="panel-title">3. Vehicle Payload Utilization</div>
            <span class="badge-simulated">10 FLEET UNITS</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 6px;">
            ${SmartWasteStore.vehicles.slice(0, 5).map(v => {
              const util = Math.round((v.currentLoad / v.capacity) * 100) || 0;
              return `
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 600; margin-bottom: 2px;">
                    <span>${v.id} (${v.type.split(' ')[0]})</span>
                    <span>${util}% (${v.currentLoad}t / ${v.capacity}t)</span>
                  </div>
                  <div class="progress-bar-wrap">
                    <div class="progress-bar-fill fill-primary" style="width: ${util}%;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Chart 4: Traditional vs AI-Optimized Route -->
        <div class="card-panel">
          <div class="panel-header">
            <div class="panel-title">4. Traditional vs. AI Route Comparison</div>
            <span class="badge-simulated">SIMULATED BENCHMARK</span>
          </div>
          <svg viewBox="0 0 450 180" style="width: 100%; height: 180px;">
            <!-- Horizontal comparison bar -->
            <text x="20" y="45" font-size="11" font-weight="700" fill="#475569">Traditional Fixed Route</text>
            <rect x="20" y="55" width="380" height="24" rx="6" fill="#94a3b8" />
            <text x="410" y="72" font-size="11" font-weight="800" fill="#475569">128 km</text>

            <text x="20" y="115" font-size="11" font-weight="700" fill="#047857">AI-Optimized Route</text>
            <rect x="20" y="125" width="278" height="24" rx="6" fill="#10b981" />
            <text x="310" y="142" font-size="11" font-weight="800" fill="#059669">94 km (-26.5%)</text>
          </svg>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// MODALS & EVENT HANDLERS
// -------------------------------------------------------------

function openPointModal(id) {
  const point = SmartWasteStore.collectionPoints.find(p => p.id === id);
  if (!point) return;

  const modal = document.getElementById('details-modal');
  const content = document.getElementById('modal-body-content');

  content.innerHTML = `
    <div style="margin-bottom: 16px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <h3 style="font-size: 1.3rem; font-weight: 800; color: #0f172a;">${point.id} — ${point.area}</h3>
        <span class="badge-priority ${point.priority.toLowerCase()}">${point.priority}</span>
      </div>
      <p style="font-size: 0.84rem; color: #64748b;">${point.zone} • Coordinates (${point.x}, ${point.y})</p>
    </div>

    <!-- Current Waste Gauge -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">
        <span>Current Waste Volume</span>
        <span style="color: ${point.currentWasteLevel >= 85 ? '#dc2626' : '#0f172a'};">${point.currentWasteLevel}% Capacity</span>
      </div>
      <div class="progress-bar-wrap" style="height: 12px;">
        <div class="progress-bar-fill fill-${point.priority.toLowerCase()}" style="width: ${point.currentWasteLevel}%;"></div>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #64748b; margin-top: 6px;">
        <span>Last Collection: <strong>${point.lastCollection}</strong></span>
        <span>Rate: <strong>+${point.accumulationRate}% / day</strong></span>
      </div>
    </div>

    <!-- 5-Day Historical Sparkline -->
    <div style="margin-bottom: 16px;">
      <div style="font-size: 0.8rem; font-weight: 700; color: #475569; margin-bottom: 6px;">5-Day Recorded Waste Levels</div>
      <div style="display: flex; gap: 8px; align-items: flex-end; height: 60px; background: #f8fafc; padding: 8px 12px; border-radius: 8px; border: 1px solid #e2e8f0;">
        ${point.historicalLevels.map((val, idx) => `
          <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px;">
            <div style="width: 100%; height: ${(val/100)*40}px; background-color: #10b981; border-radius: 3px;"></div>
            <span style="font-size: 0.68rem; color: #64748b;">${val}%</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Forecast & Recommendations -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
      <div style="background-color: #fefce8; border: 1px solid #fef08a; padding: 10px 12px; border-radius: 8px;">
        <div style="font-size: 0.72rem; color: #a16207; font-weight: 700; text-transform: uppercase;">Predicted Next-Day</div>
        <div style="font-size: 1.3rem; font-weight: 800; color: #854d0e;">${point.predictedLevel}%</div>
      </div>
      <div style="background-color: #fef2f2; border: 1px solid #fecaca; padding: 10px 12px; border-radius: 8px;">
        <div style="font-size: 0.72rem; color: #b91c1c; font-weight: 700; text-transform: uppercase;">Predicted 48-Hour</div>
        <div style="font-size: 1.3rem; font-weight: 800; color: #991b1b;">${point.predictedLevel2d}%</div>
      </div>
    </div>

    <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
      <div style="font-size: 0.75rem; font-weight: 700; color: #065f46; margin-bottom: 3px;">AI DECISION RECOMMENDATION:</div>
      <div style="font-size: 0.85rem; color: #047857; font-weight: 500;">${point.recommendation}</div>
      <div style="font-size: 0.75rem; color: #065f46; margin-top: 6px;"><strong>Scoring Reason:</strong> ${point.priorityReason}</div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 14px;">
      <div>
        <div style="font-size: 0.75rem; color: #64748b;">Assigned Schedule Slot:</div>
        <div style="font-size: 0.9rem; font-weight: 700; color: #0f172a;">${point.recommendedTime} (${point.assignedVehicle || 'Unassigned'})</div>
      </div>
      <button class="btn-primary" onclick="closeModal(); navigateTo('map');">Locate on Map</button>
    </div>
  `;

  modal.classList.add('active');
}

function openVehicleModal(id) {
  const vehicle = SmartWasteStore.vehicles.find(v => v.id === id);
  if (!vehicle) return;

  const modal = document.getElementById('details-modal');
  const content = document.getElementById('modal-body-content');

  const loadPercent = Math.round((vehicle.currentLoad / vehicle.capacity) * 100);

  content.innerHTML = `
    <div style="margin-bottom: 16px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <h3 style="font-size: 1.3rem; font-weight: 800; color: #0f172a;">Vehicle ${vehicle.id}</h3>
        <span class="badge-status ${vehicle.status.toLowerCase()}">${vehicle.status}</span>
      </div>
      <p style="font-size: 0.84rem; color: #64748b;">${vehicle.type} • Assigned Driver: <strong>${vehicle.driver}</strong></p>
    </div>

    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">
        <span>Current Load Factor</span>
        <span>${vehicle.currentLoad} / ${vehicle.capacity} Tons (${loadPercent}%)</span>
      </div>
      <div class="progress-bar-wrap" style="height: 12px;">
        <div class="progress-bar-fill fill-primary" style="width: ${loadPercent}%;"></div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; font-size: 0.82rem;">
      <div style="background-color: #f1f5f9; padding: 10px; border-radius: 8px;">
        <div style="color: #64748b;">Assigned Route</div>
        <div style="font-size: 1.1rem; font-weight: 800; color: #7c3aed;">${vehicle.assignedRoute || 'Standby'}</div>
      </div>
      <div style="background-color: #f1f5f9; padding: 10px; border-radius: 8px;">
        <div style="color: #64748b;">Current Sector / Location</div>
        <div style="font-size: 1.05rem; font-weight: 700; color: #0f172a;">${vehicle.location}</div>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 14px;">
      <div>
        <div style="font-size: 0.75rem; color: #64748b;">Estimated Return / Completion:</div>
        <div style="font-size: 0.9rem; font-weight: 700; color: #0f172a;">${vehicle.eta}</div>
      </div>
      <button class="btn-primary" onclick="closeModal(); navigateTo('map');">Locate on Map</button>
    </div>
  `;

  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('details-modal');
  if (modal) modal.classList.remove('active');
}

function navigateTo(viewName) {
  SmartWasteStore.activeView = viewName;
  renderCurrentView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleSearch(val) {
  SmartWasteStore.searchQuery = val;
  renderCurrentView();
}

function setPriorityFilter(priority) {
  SmartWasteStore.priorityFilter = priority;
  renderCurrentView();
}

function filterPointsBy(priority) {
  SmartWasteStore.priorityFilter = priority;
  SmartWasteStore.activeView = 'points';
  renderCurrentView();
}

function setOpsFilter(status) {
  SmartWasteStore.opsFilter = status;
  renderCurrentView();
}

function toggleMapLayer(layer) {
  if (layer === 'routes') {
    SmartWasteStore.showRoutesOnMap = !SmartWasteStore.showRoutesOnMap;
  } else if (layer === 'vehicles') {
    SmartWasteStore.showVehiclesOnMap = !SmartWasteStore.showVehiclesOnMap;
  }
  renderCurrentView();
}

// Close modal when clicking backdrop
window.addEventListener('click', (e) => {
  const modal = document.getElementById('details-modal');
  if (e.target === modal) {
    closeModal();
  }
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderCurrentView();
  showToast("SmartWaste AI System Initialized: Ready for municipal dispatch.", "success");
});
