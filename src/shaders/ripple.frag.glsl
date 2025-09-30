uniform sampler2D uRipplesX;
uniform sampler2D uRipplesZ;
uniform vec3 albedo;

uniform vec2 rippleDirectionX;
uniform vec2 rippleDirectionZ;
uniform float timeScale;
uniform float time;

varying vec3 vWorldPosition;
varying vec2 vUv;

void main() {
  vec2 timeX = (time * rippleDirectionX) * timeScale;
  vec2 timeZ = (time * rippleDirectionZ) * timeScale;

  vec3 blend = mix(texture(uRipplesX, fract(vUv + timeX)).rgb, texture(uRipplesZ, fract(vUv + timeZ)).rgb, 0.5);

  if (blend.r > 0.5) {
    gl_FragColor = vec4(albedo, 0.5);
  } else {
    discard;
  }
}
