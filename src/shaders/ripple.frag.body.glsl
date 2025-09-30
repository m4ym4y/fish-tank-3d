vec2 timeX = (time * rippleDirectionX) * timeScale;
vec2 timeZ = (time * rippleDirectionZ) * timeScale;

vec3 blend = mix(texture(uRipplesX, fract(vUv + timeX)).rgb, texture(uRipplesZ, fract(vUv + timeZ)).rgb, 0.5);

if (blend.r > threshold) {
  gl_FragColor = vec4(albedo, 0.5);
} else {
  discard;
}
