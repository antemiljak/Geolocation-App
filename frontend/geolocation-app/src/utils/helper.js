export const validateEmail = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

export const validateCarPlate = (carPlate) => {
  const regex = /^[A-Z]{2}-\d{3,4}-[A-Z]{1,2}$/;
  return regex.test(carPlate);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const haversineDistance = (point1, point2) => {
  const R = 6371e3;
  const toRad = (deg) => (deg * Math.PI) / 180;

  const [lat1, lon1] = point1;
  const [lat2, lon2] = point2;

  const lat1Rad = toRad(lat1);
  const lat2Rad = toRad(lat2);
  const deltaLat = toRad(lat2 - lat1);
  const deltaLon = toRad(lon2 - lon1);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return distance;
};

export const calculateDuration = (durationMs) => {
  const seconds = Math.floor((durationMs / 1000) % 60);
  const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
  const hours = Math.floor(durationMs / (1000 * 60 * 60));

  return `${hours}h ${minutes}m ${seconds}s`;
};

export const filterRoutesByMonth = (routes, month) => {
  if (!month) return routes;

  const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
  const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);

  return routes.filter((route) => {
    const routeDate = new Date(route.startTime);
    return routeDate >= monthStart && routeDate <= monthEnd;
  });
};

export const options = {
  scales: {
    x: {
      ticks: {
        color: "white",
        font: {
          family: "Montserrat",
          size: 13,
        },
      },
    },
    y: {
      ticks: {
        color: "white",
        font: {
          family: "Montserrat",
          size: 13,
        },
      },
    },
  },
  plugins: {
    tooltip: {
      titleColor: "white",
      bodyColor: "white",
    },
    legend: {
      labels: {
        color: "white",
        font: {
          family: "Montserrat",
          size: 16,
        },
      },
    },
  },
};
