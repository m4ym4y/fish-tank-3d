uniform sampler2D uRipplesX;
uniform sampler2D uRipplesZ;
uniform vec3 albedo;

uniform vec2 rippleDirectionX;
uniform vec2 rippleDirectionZ;
uniform float timeScale;
uniform float time;
uniform float threshold;

varying vec3 vWorldPosition;
varying vec2 vUv;
