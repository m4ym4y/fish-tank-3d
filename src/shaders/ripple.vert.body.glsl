vec4 worldPosition = modelMatrix * vec4(position, 1.0);
vWorldPosition = worldPosition.xyz;
vUv = uv;
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
