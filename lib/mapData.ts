export const pilgrimageRoute = {
  type: 'Feature' as const,
  properties: { name: 'Hành trình Minh Tuệ 2023' },
  geometry: {
    type: 'LineString' as const,
    coordinates: [
      [105.0809, 10.0095],  // Kiên Giang
      [106.2431, 10.6956],  // Long An
      [106.3654, 10.3599],  // Tiền Giang
      [106.7009, 10.7769],  // TP. HCM
      [108.0721, 11.0904],  // Bình Thuận
      [109.1967, 12.2388],  // Khánh Hòa
      [109.2234, 13.7757],  // Bình Định
      [108.7924, 15.1194],  // Quảng Ngãi
      [108.2022, 16.0544],  // Đà Nẵng
      [108.1378, 16.1729],  // Đèo Hải Vân
      [107.5909, 16.4637],  // Huế
      [105.6680, 18.6697],  // Nghệ An
      [105.8342, 21.0278],  // Hà Nội
    ],
  },
}

export const routeGeoJSON = {
  type: 'FeatureCollection' as const,
  features: [pilgrimageRoute],
}
