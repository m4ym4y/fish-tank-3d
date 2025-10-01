vec2 timeX = (time * rippleDirectionX) * timeScale;
vec2 timeZ = (time * rippleDirectionZ) * timeScale;

vec2 posX = fract((vUv + timeX) / textureScale);
vec2 posZ = fract((vUv + timeZ) / textureScale);
vec3 blend = mix(texture(uRipplesX, posX).rgb, texture(uRipplesZ, posZ).rgb, 0.5);

if (blend.r > threshold) {
  gl_FragColor = vec4(albedo, 0.5);
} else {
  discard;
}
